/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/12/14
 * Time: 12:15 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('RalyMedicosApp.models')
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

