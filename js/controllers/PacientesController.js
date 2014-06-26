angular.module('RalyMedicosApp.controllers')

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

        $scope.clearSearch = function() {
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

        $scope.buscarPacientes = function(){
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
        $scope.getPacientes = function() {
            letterHasMatch = {};
            var pacientes = $scope.busqueda ? $scope.pacientesServer : $scope.pacientes;
            //Filter contacts by $scope.search.
            //Additionally, filter letters so that they only show if there
            //is one or more matching contact
            return pacientes.filter(function(item) {
                var itemDoesMatch = !$scope.search || item.divider ||
                    item.nombre.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                    item.codigo.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                    item.cedula.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                //Mark this person's last name letter as 'has a match'
                if (!item.divider && itemDoesMatch) {
                    var letter = item.nombre.charAt(0).toUpperCase();
                    letterHasMatch[letter] = true;
                }

                return itemDoesMatch;
            }).filter(function(item) {
                    //Finally, re-filter all of the letters and take out ones that don't
                    //have a match
                    if (item.divider && !letterHasMatch[item.letter]) {
                        return false;
                    }
                    return true;
                });
        };

    });