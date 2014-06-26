/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/12/14
 * Time: 12:06 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('RalyMedicosApp.controllers')

    .controller('MainController', function($scope, $state, Menu, UserService, $ionicSideMenuDelegate) {
        Menu.save([{titulo: "Mis Pacientes", state: "inicio.pacientes"}, {titulo: "Info General", state: "inicio.info"}, {titulo: "Info Médico", state: "inicio.medico"}, {titulo: "Salir"}]);
        $scope.menuLista = Menu.all();
        $scope.activeMenu = $scope.menuLista[Menu.getLastActiveIndex()];

        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.selectMenu = function(menu, index) {
            $scope.activeMenu = menu;
            switch (menu.titulo.toLocaleLowerCase()){
                case "salir":
                    UserService.logout(UserService.loadCurrentUser());
                    break;
                default:
                    $state.go(menu.state);
                    $ionicSideMenuDelegate.toggleLeft(false);
                    break;
            }
        };

    });