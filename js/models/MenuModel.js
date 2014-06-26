/**
 * Created with IntelliJ IDEA.
 * User: cristobal
 * Date: 05/12/14
 * Time: 12:15 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('RalyMedicosApp.models')
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
