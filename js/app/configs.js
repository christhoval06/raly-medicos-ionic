/**
 * Created by cristobal on 05/09/14.
 */


angular.module('RalyMedicosApp')

.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('RalyMedicosApp');
})

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
