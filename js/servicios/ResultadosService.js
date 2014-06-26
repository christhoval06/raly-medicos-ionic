/**
 * Created by cristobal on 05/09/14.
 */


angular.module('RalyMedicosApp.services')

    .provider('ResultadosService', function () {

        this.$get = function (Resultado, Paciente, httpService, UserService) {

            return {

                get: function (paciente) {
                    var d = {};
                    d.skey = UserService.getUserKey();
                    d.fnt = 'resultados';
                    d.pacienteid = paciente.pacienteid
                    return httpService.get('http://laboratorioraly.com/raly/medicom', d);
                },

                makeGroupedList: function (resultados) {
                    var lista = [], fechas = [];
                    angular.forEach(resultados, function (resultado) {
                        if (!(fechas.indexOf(resultado.fecha) > -1)) {
                            fechas.push(resultado.fecha);
                            lista.push({ divider: true, fecha: resultado.fecha });
                        }
                        lista.push(resultado);
                    });
                    return lista;
                },

                save: function (paciente, resultados) {
                    var lista = this.makeGroupedList(resultados);
                    Resultado.save(paciente, lista);
                    return lista;
                },

                getFromLocal: Resultado.all,

                loadResultados: Resultado.getResultadoWithPacienteAndIndex,

                getPaciente: Paciente.getActivePaciente,

                getActiveResultado: Resultado.getActiveResultado,

                setActiveResultado: Resultado.setActiveResultado,

                getResultadoPDF: function(resultado, tipo){
                    return Resultado.getResultadoPDF(resultado, UserService.getUserKey(), tipo);
                }
            }
        }
    });
