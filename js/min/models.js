/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/19/14
 * Time: 12:26 PM
 * To change this template use File | Settings | File Templates.
 */



angular.module('RalyMedicosApp.models')
    .factory('Paciente', function (localStorageService) {
        return {

            all: function () {
                var pacienteString = localStorageService.get('pacientes');
                if (pacienteString)
                    return angular.fromJson(pacienteString);
                return [];
            },
            save: function (pacientes) {
                localStorageService.add('pacientes', angular.toJson(pacientes));
            },

            getPacienteWithIndex: function (index) {
                return  this.all()[index];
            },

            getActivePaciente: function(){
                var pacienteString = localStorageService.get('ActivePaciente');
                if (!angular.isUndefined(pacienteString))
                    return angular.fromJson(pacienteString);
                return {};
            },

            setActivePaciente: function (paciente) {
                localStorageService.add('ActivePaciente', angular.toJson(paciente));
            },

            getFoto: function (paciente, skey) {
                if (paciente.foto == "../images/fotonula.jpg")
                    return 'img/noimage.png';
                return paciente.foto + "&skey=" + skey;
            }
        }
    })

    .factory('Menu', function(localStorageService) {
        return {

            all: function() {
                var menuString = localStorageService.get('menus');
                if(menuString)
                    return angular.fromJson(menuString);
                return [];
            },
            save: function(menus) {
                localStorageService.add('menus',angular.toJson(menus));
            },

            getLastActiveIndex: function() {
                return parseInt(localStorageService.get('lastActiveMenu')) || 0;
            },

            setLastActiveIndex: function(index) {
                localStorageService.add('lastActiveMenu', index);
            }
        }
    })

    .factory('Resultado', function(localStorageService) {
        return {

            all: function(paciente) {
                var resultadosString = localStorageService.get(paciente.pacienteid);
                if(resultadosString)
                    return angular.fromJson(resultadosString);
                return [];
            },
            save: function(paciente, resultados) {
                localStorageService.add(paciente.pacienteid, angular.toJson(resultados));
            },

            getResultadoWithPacienteAndIndex: function(paciente, index) {
                return this.all()[paciente.pacienteid][index];
            },

            getActiveResultado: function(){
                var string = localStorageService.get('ActiveResultado');
                if (!angular.isUndefined(string))
                    return angular.fromJson(string);
                return {};
            },

            setActiveResultado: function (resultado) {
                localStorageService.add('ActiveResultado', angular.toJson(resultado));
            },

            getResultadoPDF: function (resultado, skey, tipo) {
                return 'http://laboratorioraly.com' + resultado.pdf + "&skey=" + skey + (tipo ==1 ?"&bloque=2" : "") + "&d=4";
            }
        }
    });