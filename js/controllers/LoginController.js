angular.module('RalyMedicosApp.controllers')

    .controller('LoginController', function ($scope, $state, $stateParams, $ionicLoading, UserService, ValidationService) {

        $scope.title = "Entrar";
        $scope.usuario = {};


        if (UserService.getFromLocal()) {
            $state.go('inicio.pacientes');
        }

        // Form validation is handled by the ValidationSerice
        $scope.inputValid = ValidationService.inputValid;
        $scope.inputInvalid = ValidationService.inputInvalid;
        $scope.showError = ValidationService.showError;
        $scope.canSubmit = ValidationService.canSubmit;

        // Flash message.  Used to indicate error messages to the usuario
        $scope.signupLoginError = false;
        $scope.flashMessage = "";
        $scope.dismiss = function () {
            $scope.signupLoginError = false;
        };

        // Trigger the loading indicator
        $scope.show = function () {

            // Show the loading overlay and text
            $scope.loading = $ionicLoading.show({
                content: 'Loading...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });
        };

        // Hide the loading indicator
        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.submit = function (form) {
            $scope.show();
            UserService.login($scope.usuario)
                .then(function (data) {
                    $scope.hide();
                    ValidationService.resetForm(form);
                    if(data.success){
                        UserService.save(data);
                        if(UserService.loadCurrentUser())
                            $state.go('inicio.pacientes');
                        else
                            console.log("No se han guardado los datos");
                    }else{
                        $scope.flashMessage = 'Hmmm, you must be using the wrong credentials';  //TODO:
                        $scope.signupLoginError = true;
                    }
                }, function (reason) {
                    ValidationService.resetForm(form);
                    $scope.hide();
                    console.log("reason: ", reason);
                    $scope.flashMessage = 'Hmmm, you must be using the wrong credentials';  //TODO:
                    $scope.signupLoginError = true;
                });
        };
    });