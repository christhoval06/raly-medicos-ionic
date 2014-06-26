/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/19/14
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('RalyMedicosApp.services')

    .provider('httpService', function () {

        this.$get = function ($http, $q) {

            return {

                _httpHelper: function (url, body) {
                    body.callback = 'JSON_CALLBACK';
                    var d = $q.defer();
                    $http.jsonp(url, { params: body, method: 'POST'})
                        .success(function (data, status, headers, config) {
                            d.resolve(data);
                        })
                        .error(function (data, status, headers, config) {
                            alert(status);
                            console.log(status);
                            d.reject(data, status);
                        });
                    return d.promise;
                },

                get: function (url, d) {
                    return this._httpHelper(url, d);
                }
            }
        }
    })

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

                makeGroupedList: function (pacientes) {
                    var lista = [], letras = [];
                    angular.forEach(pacientes, function (paciente) {
                        if (!(letras.indexOf(((paciente.nombre).substring(0, 1)).toLocaleUpperCase()) > -1)) {
                            letras.push((paciente.nombre.substring(0, 1)).toLocaleUpperCase());
                            lista.push({ divider: true, letra: (paciente.nombre.substring(0, 1)).toLocaleUpperCase() });
                        }
                        lista.push(paciente);
                    });
                    return lista;
                },

                save: function (pacientes) {
                    var lista = this.makeGroupedList(pacientes);
                    Paciente.save(lista);
                    return lista;
                },

                getFromLocal: Paciente.all,

                loadPaciente: Paciente.getPacienteWithIndex,

                getActivePaciente: Paciente.getActivePaciente,

                setActivePaciente: Paciente.setActivePaciente,

                getFotoPaciente: function (paciente) {
                    return Paciente.getFoto(paciente, UserService.getUserKey());
                }
            }
        }
    })

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

                getResultadoPDF: function (resultado, tipo) {
                    return Resultado.getResultadoPDF(resultado, UserService.getUserKey(), tipo);
                }
            }
        }
    })

    .provider('UserService', function () {

        this.$get = function (httpService, localStorageService) {

            var getUserKey = function () {
                var user = localStorageService.get('currentUser');
                if (!angular.isUndefined(user)) {
                    return user.skey;
                }
                return ""
            };

            return {


                login: function (user) {
                    return httpService.get('http://laboratorioraly.com/raly/hacerloginmed', user);
                },

                getmedico: function () {
                    return httpService.get("http://laboratorioraly.com/raly/medicom", {fnt: 'registromedico', skey: this.getUserKey()});
                },

                setmedico: function (d) {
                    d.fnt = 'registromedico';
                    d.skey = this.getUserKey();
                    d.origenid = 'guardar';
                    return httpService.get("http://laboratorioraly.com/raly/medicom", d);
                },

                logout: function () {
                    localStorageService.clearAll();
                    window.location.assign("#/login");
                },

                save: function (userData) {
                    localStorageService.add('currentUser', userData);
                },

                getFromLocal: function () {
                    return localStorageService.get('currentUser');
                },

                loadCurrentUser: function () {
                    var u = this.getFromLocal();
                    if (u) {
                        return angular.fromJson(u);
                    }
                    return undefined;
                },
                getUserKey: getUserKey
            };
        };
    })

    .factory('ValidationService', function () {

        return {
            resetForm: function (form) {
                form.$setPristine();
            },

            inputValid: function (form) {
                return form.$valid && form.$dirty;
            },

            inputInvalid: function (form) {
                return form.$invalid && form.$dirty;
            },

            showError: function (form, error) {
                return form.$error[error];
            },

            isPasswdValid: function (pass0, pass1) {
                return angular.equals(pass0.$modelValue, pass1.$modelValue) && pass1.$valid && pass1.$dirty;
            },

            isPasswdInvalid: function (pass0, pass1) {
                return !angular.equals(pass0.$modelValue, pass1.$modelValue) && pass1.$dirty;
            }
        }
    })