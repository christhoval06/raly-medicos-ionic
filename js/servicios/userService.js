/**
 * Created by cristobal on 05/09/14.
 */


angular.module('RalyMedicosApp.services')

    .provider('UserService', function () {

        this.$get = function (httpService, localStorageService) {

            var getUserKey =  function () {
                var user = localStorageService.get('currentUser');
                if(!angular.isUndefined(user)){
                    return user.skey;
                }
                return ""
            };

            return {


                login: function (user) {
                    return httpService.get('http://laboratorioraly.com/raly/hacerloginmed', user);
                },

                getmedico: function (){
                    return httpService.get("http://laboratorioraly.com/raly/medicom", {fnt: 'registromedico', skey: this.getUserKey()});
                },

                setmedico: function (d){
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
                    if(u){
                        return angular.fromJson(u);
                    }
                    return undefined;
                },
                getUserKey: getUserKey
            };
        };
    });
