/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/19/14
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('RalyMedicosApp', ['ionic',
        'LocalStorageModule',
        'RalyMedicosApp.controllers',
        'RalyMedicosApp.services' ,
        'RalyMedicosApp.models'
    ]);

angular.module('RalyMedicosApp')

    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('RalyMedicosApp');
    })

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .state('inicio', {
                url: '/inicio',
                abstract: true,
                templateUrl: 'templates/inicio.html',
                controller: 'MainController'
            })
            .state('inicio.pacientes', {
                url: '/pacientes',
                views: {
                    'menuContent': {
                        templateUrl: "templates/pacientes.html",
                        controller: "PacientesController"
                    }
                }
            })
            .state('inicio.resultados', {
                url: '/resultados',
                views: {
                    'menuContent': {
                        templateUrl: "templates/resultados.html",
                        controller: "ResultadosController"
                    }
                }
            })
            .state('inicio.medico', {
                url: '/medico',
                views: {
                    'menuContent': {
                        templateUrl: "templates/medico.html",
                        controller: "MedicoController"
                    }
                }
            });

        $urlRouterProvider.otherwise('/login');
    });

angular.module('RalyMedicosApp.services', []);
angular.module('RalyMedicosApp.controllers', []);
angular.module('RalyMedicosApp.models', []);



