/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/19/14
 * Time: 12:23 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module('RalyMedicosApp.controllers')
    .controller('LoginController', function ($scope, $state, $stateParams, $ionicLoading, UserService, ValidationService) {
        $scope.title = "Entrar";
        $scope.usuario = {};
        if (UserService.getFromLocal()) {$state.go('inicio.pacientes');}
        $scope.inputValid = ValidationService.inputValid;
        $scope.inputInvalid = ValidationService.inputInvalid;
        $scope.showError = ValidationService.showError;
        $scope.canSubmit = ValidationService.canSubmit;
        $scope.signupLoginError = false;
        $scope.flashMessage = "";
        $scope.dismiss = function () {
            $scope.signupLoginError = false;
        };
        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Loading...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });
        };
        $scope.hide = function () { $ionicLoading.hide();};
        $scope.submit = function (form) {
            $scope.show();
            UserService.login($scope.usuario)
                .then(function (data) {
                    $scope.hide();
                    ValidationService.resetForm(form);
                    if (data.success) {
                        UserService.save(data);
                        if (UserService.loadCurrentUser())
                            $state.go('inicio.pacientes');
                        else
                            console.log("No se han guardado los datos");
                    } else {
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
    })
    .controller('MainController', function ($scope, $state, Menu, UserService, $ionicSideMenuDelegate) {
        Menu.save([
            {titulo: "Mis Pacientes", state: "inicio.pacientes"},
            {titulo: "Info General", state: "inicio.info"},
            {titulo: "Info Médico", state: "inicio.medico"},
            {titulo: "Salir"}
        ]);
        $scope.menuLista = Menu.all();
        $scope.activeMenu = $scope.menuLista[Menu.getLastActiveIndex()];

        $scope.toggleMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.selectMenu = function (menu, index) {
            $scope.activeMenu = menu;
            switch (menu.titulo.toLocaleLowerCase()) {
                case "salir":
                    UserService.logout(UserService.loadCurrentUser());
                    break;
                default:
                    $state.go(menu.state);
                    $ionicSideMenuDelegate.toggleLeft(false);
                    break;
            }
        };

    })

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
    })

    .controller('PacientesController', function ($scope, $state, PacientesService, $ionicLoading) {

        $scope.ActivePaciente = PacientesService.getActivePaciente();
        $scope.pacientes = [];
        $scope.pacientesServer = [];
        $scope.busqueda = false;

        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Cargando Pacientes...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });
        };

        $scope.getFotoPaciente = PacientesService.getFotoPaciente;

        $scope.fotoPacienteClick = function (paciente) {
            console.log('fotoPacienteClick');
        };

        $scope.clearSearch = function () {
            console.log('clearSearch');
            $scope.busqueda = false;
            $scope.search = '';
        };

        $scope.pacienteClick = function (paciente) {
            console.log('pacienteClick');
            PacientesService.setActivePaciente(paciente)
            $scope.ActibePaciente = paciente;
            $state.go('inicio.resultados');
        };


        $scope.show();

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        var pacientes = PacientesService.getFromLocal();
        if (pacientes.length > 0) {
            $scope.pacientes = pacientes;
            $scope.hide();
        } else {
            PacientesService.get()
                .then(function (data) {
                    if (data.success) {
                        $scope.pacientes = PacientesService.save(data.pacientes);
                    }
                    $scope.hide();
                }, function (reason) {
                    $scope.hide();
                    console.log("reason: ", reason);
                    alert(reason);
                    $scope.emptyMessage = 'No tiene Pacientes Recientes';
                    $scope.noPacientesList = true;
                });
        }

        $scope.buscarPacientes = function () {
            $scope.show();
            $scope.busqueda = true;
            $scope.pacientesServer = [];
            PacientesService.get($scope.search)
                .then(function (data) {
                    if (data.success) {
                        $scope.pacientesServer = PacientesService.makeGroupedList(data.pacientes);
                    }
                    $scope.hide();
                }, function (reason) {
                    $scope.hide();
                    console.log("reason: ", reason);
                    alert(reason);
                    $scope.emptyMessage = 'No tiene Pacientes Recientes';
                    $scope.noPacientesList = true;
                });
        };


        var letterHasMatch = {};
        $scope.getPacientes = function () {
            letterHasMatch = {};
            var pacientes = $scope.busqueda ? $scope.pacientesServer : $scope.pacientes;
            return pacientes.filter(function (item) {
                var itemDoesMatch = !$scope.search || item.divider ||
                    item.nombre.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                    item.codigo.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                    item.cedula.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                if (!item.divider && itemDoesMatch) {
                    var letter = item.nombre.charAt(0).toUpperCase();
                    letterHasMatch[letter] = true;
                }

                return itemDoesMatch;
            }).filter(function (item) {
                    if (item.divider && !letterHasMatch[item.letter]) {
                        return false;
                    }
                    return true;
                });
        };

    })

    .controller('ResultadosController', function ($scope, $state, $window, ResultadosService, $ionicLoading, $ionicActionSheet) {

        $scope.paciente = ResultadosService.getPaciente();

        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Cargando Resultados...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });
        };

        $scope.showOps = function (resultado) {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Ver Resultado</b>', index: 0 },
                    { text: '<b>Antecedentes</b>', index: 1 }
                ],
                cancelText: 'Cancelar',
                buttonClicked: function (index) {
                    var win = $window.open(ResultadosService.getResultadoPDF(resultado, index), '_blank');
                    win.focus();
                    return true;
                },
                cancel: function () {
                    return false;
                }
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

        $scope.goToPaciente = function () {
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
                        $scope.resultados = ResultadosService.save($scope.paciente, data.resultados);
                    }
                }, function (reason) {
                    $scope.hide();
                    console.log("reason: ", reason);
                    $scope.emptyMessage = 'No tiene Resultados Recientes';
                    $scope.noResultadoList = true;
                });
        }

    });
