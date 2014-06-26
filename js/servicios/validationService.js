angular.module('RalyMedicosApp.services')

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
    });
