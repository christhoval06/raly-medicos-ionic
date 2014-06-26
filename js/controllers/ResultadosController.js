angular.module('RalyMedicosApp.controllers')

    .controller('ResultadosController', function ( $scope, $state, $window, ResultadosService, $ionicLoading, $ionicActionSheet) {

        $scope.paciente  = ResultadosService.getPaciente();

        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Cargando Resultados...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });
        };

        $scope.showOps = function(resultado) {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Ver Resultado</b>', index: 0 },
                    { text: '<b>Antecedentes</b>', index: 1 }
                ],
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    var win = $window.open(ResultadosService.getResultadoPDF(resultado, index),'_blank');
                    win.focus();
                    return true;
                },
                cancel: function(){return false;}
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.resultadoClick = function (paciente, resultado) {
            console.log('resultadoClick');
            ResultadosService.setActiveResultado(resultado);
            $state.go('inicio.pdf');
        };

        $scope.goToPaciente= function () {
            $window.history.back();
        };

        $scope.show();

        resultados = ResultadosService.getFromLocal($scope.paciente);
        if (resultados.length > 0) {
            $scope.resultados = resultados;
            $scope.hide();
        } else {
            ResultadosService.get($scope.paciente)
                .then(function (data) {
                    $scope.hide();
                    if (data.success) {
                        $scope.resultados =  ResultadosService.save($scope.paciente, data.resultados);
                    }
                }, function (reason) {
                    $scope.hide();
                    console.log("reason: ", reason);
                    $scope.emptyMessage = 'No tiene Resultados Recientes';
                    $scope.noResultadoList = true;
                });
        }

    });