/**
 * Created by cristobal on 05/09/14.
 */


angular.module('RalyMedicosApp.services')

    .provider('PacientesService', function () {

        this.$get = function (Paciente, httpService, UserService) {

            return {

                get: function (q) {
                    var d = {};
                    d.skey = UserService.getUserKey();
                    if (q) {
                        d.fnt = 'buscarpaciente';
                        d.buscar = q
                    } else {
                        d.fnt = 'listamispacientes';
                    }
                    return httpService.get('http://laboratorioraly.com/raly/medicom', d);
                },

                makeGroupedList:  function(pacientes){
                    var lista = [], letras = [];
                    angular.forEach(pacientes, function(paciente){
                        if(!(letras.indexOf(((paciente.nombre).substring(0, 1)).toLocaleUpperCase()) > -1)){
                            letras.push((paciente.nombre.substring(0, 1)).toLocaleUpperCase());
                            lista.push({ divider: true, letra: (paciente.nombre.substring(0, 1)).toLocaleUpperCase() });
                        }
                        lista.push(paciente);
                    });
                    return lista;
                },

                save: function(pacientes){
                    var lista = this.makeGroupedList(pacientes);
                    Paciente.save(lista);
                    return lista;
                },

                getFromLocal: Paciente.all,

                loadPaciente: Paciente.getPacienteWithIndex,

                getActivePaciente: Paciente.getActivePaciente,

                setActivePaciente: Paciente.setActivePaciente,

                getFotoPaciente: function(paciente){
                    return Paciente.getFoto(paciente, UserService.getUserKey());
                }
            }
        }
    });
