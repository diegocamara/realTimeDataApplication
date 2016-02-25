function moveFab($scope, $timeout, fabId){

  $scope.fab = document.getElementById(fabId);

  $scope.moveFab = function(dir) {
      $scope.fab.style.display = 'none';
      $scope.fab.className = $scope.fab.className.replace('button-fab-top-left', '');
      $scope.fab.className = $scope.fab.className.replace('button-fab-top-right', '');
      $scope.fab.className = $scope.fab.className.replace('button-fab-bottom-left', '');
      $scope.fab.className = $scope.fab.className.replace('button-fab-bottom-right', '');
      $scope.fab.className += ' button-fab-' + dir;
      $timeout(function() {
          $scope.fab.style.display = 'block';
      }, 100);
  };
}

function motionFab($scope, $timeout, type){

  $scope.motionFab = function(type) {
      var shouldAnimate = false;
      var classes = type instanceof Array ? type : [type];

      function toggleMotionClass (theClass) {
          $timeout(function() {
              $scope.fab.classList.toggle(theClass);
          }, 300);
      }

      for (var i = 0; i < classes.length; i++) {
          $scope.fab.classList.toggle(classes[i]);

          shouldAnimate = $scope.fab.classList.contains(classes[i]);
          if (shouldAnimate) {
              (toggleMotionClass)(classes[i]);
          }
      }
  };

}

function showTogglePlace($scope){
  $scope.togglePlace = function(place){

    if($scope.isShowPlace(place)){
      $scope.selectedPlace = null;
    }else{
      $scope.selectedPlace = place;
    }

  }

  $scope.isShowPlace = function(place){
    return $scope.selectedPlace === place;
  }
}

function moreDataCanBeLoad($scope){

  $scope.moreDataCanBeLoad = function () {
    var moreDataCanBeLoad = false;
    if(!$scope.isInSearch){
        moreDataCanBeLoad = $scope.places.length == 0 ? $scope.places.length <= $scope.numeroDeRegistros : $scope.places.length < $scope.numeroDeRegistros;
    }
    return moreDataCanBeLoad;
  }

}

function inputFocus($scope, $timeout){
  $scope.inputFocus = function(searchBarShow){
    if(!searchBarShow){
      $scope.isInSearch = true;
      $timeout(function () {
        var input = document.getElementById('inputId');
        input.focus();
      }, 100);
    }else{
      $scope.scrollTop();
      $scope.isInSearch = false;
      $scope.page = 0;
      $scope.pageSize = 20;
      $scope.numeroDeRegistros = 0;
      $scope.places = [];
      $scope.loadMore();
    }
  }
}


function inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, effect, dataModel){

  var timeOutDelay;

  $scope.inputChange = function(filter){
    dataModel.filter = filter;
    $scope.isExibirMensagemNenhumResultadoEncontrado = false;
    $scope.scrollTop();
    if(dataModel.filter !== ''){

        if(timeOutDelay){
          $timeout.cancel(timeOutDelay);
        }

        executarLoadingIndicator($scope, $ionicLoading);

        timeOutDelay = $timeout(function () {

          if(dataModel !== 'undefined' && dataModel !== null){

            var data = dataModel.consulta();

            data.then(function(places){

              $scope.places = places;

              if(typeof $scope.places !== 'undefined' && $scope.places !== null){

                if($scope.places.length > 0){
                  $scope.numeroDeRegistros = $scope.places.length + 1;
                  $timeout(function () {
                    executarMotionEffect(ionicMaterialMotion, effect);
                    ionicMaterialInk.displayEffect();
                    $scope.loadingIndicator = $ionicLoading.hide();
                  }, 50);

                }else{
                  $scope.numeroDeRegistros = 0;
                  $scope.isExibirMensagemNenhumResultadoEncontrado = true;
                  $scope.mansagemNenhumResultadoEncontrado += filter;
                  $scope.loadingIndicator = $ionicLoading.hide();

                }

              }

            });

          }

        }, 1000);

    }else{
      $scope.loadingIndicator = $ionicLoading.hide();
    }

  }


}



function executarLoadingIndicator($scope, $ionicLoading) {
    $scope.loadingIndicator = $ionicLoading.show({
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>',
        animation: 'fade-in',
        showBackdrop: false,
        showDelay: 0
    });
}


function executarMotionEffect(ionicMaterialMotion, effect){

  switch(effect){
    case 'animate-blinds':
      ionicMaterialMotion.blinds();
      break;
    case 'animate-ripple':
      ionicMaterialMotion.ripple();
      break;
    case 'animate-fade-slide-in':
      ionicMaterialMotion.fadeSlideIn();
      break;
    case 'animate-fade-slide-in-right':
      ionicMaterialMotion.fadeSlideInRight();
    break;
  }

}

function carregarCategorias($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading) {
    $scope.categorias = restService.obterCategorias();
    $scope.loadingIndicator = $ionicLoading.hide();
    aplicarEfeitoBlinds($timeout, ionicMaterialInk, ionicMaterialMotion, 200);
}

function carregarBarERes($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    var barERelDataModel = restService.obterBareRes($scope, $scope.page, $scope.pageSize);

    barERelDataModel.then(function (response) {
        carregarLugaresComVelocidade($scope, $timeout, response, 0, ionicMaterialInk, ionicMaterialMotion);
    });
}

function carregarLugaresComVelocidade($scope, $timeout, response, velocidade, ionicMaterialInk, ionicMaterialMotion) {
    var place = 0;
    carregarLugares($scope, $timeout, response, place, velocidade, ionicMaterialInk, ionicMaterialMotion);

}

function carregarLugares($scope, $timeout, response, place, velocidade, ionicMaterialInk, ionicMaterialMotion) {

    $timeout(function () {
        if(response != undefined){
          response[place].isExisteSite = isExisteSite(response[place].site);
          $scope.places.push(response[place]);
          place++;
          if (place < response.length) {
              carregarLugares($scope, $timeout, response, place, velocidade,ionicMaterialInk, ionicMaterialMotion);
          } else {
              $scope.page += 1;
              $scope.$broadcast('scroll.infiniteScrollComplete');

              ionicMaterialMotion.fadeSlideIn();
              ionicMaterialInk.displayEffect();
          }
        }
    }, velocidade);


}

function carregarHoteis($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion){

  var hoteisDataModel = restService.obterHoteis($scope, $scope.page, $scope.pageSize);

  hoteisDataModel.then(function(response){

    if(response != null || response != undefined){
      for (place = 0; place < response.length; place++){
          response[place].isExisteSite = isExisteSite(response[place].site);
          $scope.places.push(response[place]);
      }

      $scope.page += 1;
      $scope.$broadcast('scroll.infiniteScrollComplete');

      $timeout(function(){
          ionicMaterialMotion.ripple();
          ionicMaterialInk.displayEffect();
      }, 200);

    }

  });

}

function carregarCentroDeCompras($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){

  restService.obterCentrosDeCompras($scope).then(function(centrosDeCompras){
    if(centrosDeCompras != undefined){

      for (var place = 0; place < centrosDeCompras.length; place++){
        centrosDeCompras[place].isExisteSite = isExisteSite(centrosDeCompras[place].site);
        $scope.places.push(centrosDeCompras[place]);
      }

      $scope.loadingIndicator = $ionicLoading.hide();

      $timeout(function () {
        executarMotionEffect(ionicMaterialMotion, 'animate-fade-slide-in-right');
        ionicMaterialInk.displayEffect();
        $scope.loadingIndicator = $ionicLoading.hide();

      }, 50);

   }

  });

}

function carregarFeirasLivres($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){

  restService.obterFeirasLivres($scope).then(function(feirasLivres){

    if(feirasLivres != undefined){

      for (var place = 0; place < feirasLivres.length; place++){
        feirasLivres[place].isExisteSite = isExisteSite(feirasLivres[place].site);
        $scope.places.push(feirasLivres[place]);
      }

      $scope.loadingIndicator = $ionicLoading.hide();

      $timeout(function () {
        executarMotionEffect(ionicMaterialMotion, 'animate-blinds');
        ionicMaterialInk.displayEffect();
        $scope.loadingIndicator = $ionicLoading.hide();
      }, 50);


    }

  });

}

function carregarMuseus($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){

  restService.obterMuseus($scope).then(function(museus){

    if(museus != undefined){

      for (var place = 0; place < museus.length; place++){
        museus[place].isExisteSite = isExisteSite(museus[place].site);
        $scope.places.push(museus[place]);
      }

      $scope.loadingIndicator = $ionicLoading.hide();

      $timeout(function () {
        executarMotionEffect(ionicMaterialMotion, 'animate-fade-slide-in-right');
        ionicMaterialInk.displayEffect();
        $scope.loadingIndicator = $ionicLoading.hide();

      }, 50);

  }

  });

}

function carregarMercadosPublicos($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){
    restService.obterMercadosPublicos($scope).then(function(mercadosPublicos){

      if(mercadosPublicos != undefined){

        for (var place = 0; place < mercadosPublicos.length; place++){
          $scope.places.push(mercadosPublicos[place]);
        }

        $scope.loadingIndicator = $ionicLoading.hide();

        $timeout(function () {
          executarMotionEffect(ionicMaterialMotion, 'animate-fade-slide-in-right');
          ionicMaterialInk.displayEffect();
          $scope.loadingIndicator = $ionicLoading.hide();

        }, 50);

      }

    });
}

function carregarPontes($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){
  restService.obterPontes($scope).then(function(pontes){

    if(pontes != null){

      for (var place = 0; place < pontes.length; place++){
        $scope.places.push(pontes[place]);
      }

      $scope.loadingIndicator = $ionicLoading.hide();

      $timeout(function () {
        executarMotionEffect(ionicMaterialMotion, 'animate-fade-slide-in-right');
        ionicMaterialInk.displayEffect();
        $scope.loadingIndicator = $ionicLoading.hide();

      }, 50);

    }

  });
}

function carregarTeatros($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){

  restService.obterTeatros($scope).then(function(teatros){

    if(teatros != undefined){

      for (var place = 0; place < teatros.length; place++){
        $scope.places.push(teatros[place]);
      }

      $scope.loadingIndicator = $ionicLoading.hide();

      $timeout(function () {
        executarMotionEffect(ionicMaterialMotion, 'animate-fade-slide-in-right');
        ionicMaterialInk.displayEffect();
        $scope.loadingIndicator = $ionicLoading.hide();

      }, 50);

    }

  });

}

function obterFeirasLivresValidas(categoria, markers){

    var feiraslivres = [];

    for (var place = 0; place < markers.length; place++) {
      feiraslivres.push({nome: markers[place].Nome, latitude: markers[place].Latitude, longitude: markers[place].Longitude});
    }

    return feiraslivres;

}

function aplicarEfeitoBlinds($timeout, ionicMaterialInk, ionicMaterialMotion, tempoDeEspera) {
    $timeout(function () {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.blinds();
    }, tempoDeEspera);
}

function isExisteSite(str){
  return str !== undefined && str.match(/[a-z]/i);
}

function redirecionar(path) {
    $location.path(path);
};



function getIconColor(categoria){

  var icon = 'icon ';
  var color;

  switch (categoria) {
    case 'hoteis':{
      icon += 'ion-android-star-outline';
      color = 'blue'
      break;
    }
    case 'centrosdecompras':{
      icon += 'ion-bag';
      color = 'purple'
      break;
    }
    case 'feiraslivres':{
      icon += 'ion-bag';
      color = 'orange'
      break;
    }
    case 'museus':{
      icon += 'ion-ios-navigate'
      color = 'red'
      break;
    }
    case 'mercadospublicos':{
      icon += 'ion-bag';
      color = 'orange'
      break;
    }
    case 'pontes':{
      icon += 'ion-ios-navigate';
      color = 'orange'
      break;
    }
    case 'teatros':{
      icon += 'ion-ios-navigate';
      color = 'cadetblue'
      break;
    }
  }

  return {icon: icon, color: color};

}
