angular.module('RalyMedicosApp.controllers')

    .controller('MedicoController', function ($scope, $state, $window, $ionicLoading, ValidationService, UserService) {

        $scope.medico = {};
        $scope.ismsg = false;

        $scope.inputValid = ValidationService.inputValid;
        $scope.inputInvalid = ValidationService.inputInvalid;
        $scope.showError = ValidationService.showError;
        $scope.isPasswdValid = ValidationService.isPasswdValid;
        $scope.isPasswdInvalid = ValidationService.isPasswdInvalid;

        $scope.goBack = function () {
            $window.history.back();
        };
        $scope.submit = function () {
            $scope.show("guardando Info del Medico");
            UserService.setmedico($scope.medico)
                .then(function (data) {
                    $scope.msg = data.text;
                    $scope.ismsg = true;
                    $scope.hide();
                }, function (reason) {
                    $scope.hide();
                    console.log("reason: ", reason);
                });
        };
        $scope.dismiss = function () {
            $scope.ismsg = false;
        };

        $scope.show = function (msg) {

            // Show the loading overlay and text
            $scope.loading = $ionicLoading.show({
                content: msg,
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.show("Cargando Info del Medico");

        UserService.getmedico()
            .then(function (data) {
                console.log(data);
                $scope.hide();
                if (data.success) {
                    $scope.medico = data.medico[0];

                } else {
                    $scope.msg = data.text;
                    $scope.ismsg = true;
                }
                $scope.hide();
            }, function (reason) {
                $scope.hide();
                console.log("reason: ", reason);
                $scope.flashMessage = 'Hmmm, you must be using the wrong credentials';  //TODO:
                $scope.signupLoginError = true;
            });
    });