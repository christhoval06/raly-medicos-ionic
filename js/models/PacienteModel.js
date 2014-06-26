/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/12/14
 * Time: 12:15 PM
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
    });