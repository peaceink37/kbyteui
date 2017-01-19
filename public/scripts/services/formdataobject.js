/**
 * Created by kellysmith on 10/11/16.
 *
 * 2016 pokingBears.com
 */
'use strict';

/* @ngInject */
function FormDataObject(){

    return function(data) {
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
            fd.append(key, value);
        });
        return fd;
    };
}

angular.module('kbyteApp')
    .factory('FormDataObject',FormDataObject);

module.exports.FormDataObject = FormDataObject;