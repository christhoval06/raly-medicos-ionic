/**
 * Created by cristobal on 05/09/14.
 */

angular.module('RalyMedicosApp')

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