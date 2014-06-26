/**
 * Created by cristobal on 05/09/14.
 */


angular.module('RalyMedicosApp.services')

    .provider('httpService', function () {

        this.$get = function ($http, $q) {

            return {

                _httpHelper: function (url, body) {
                    //body.callback = 'JSON_CALLBACK';
                    var d = $q.defer();
                    $http.get(url, { params: body, method: 'POST'})
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
    });
