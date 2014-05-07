/*global console, meditor*/

(function (window, document) {
    'use strict';

    meditor.util = {

        extend: function extend(b, a) {
            var prop;
            if (b === undefined) {
                return a;
            }
            for (prop in a) {
                if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop) === false) {
                    b[prop] = a[prop];
                }
            }
            return b;
        },

        // https://github.com/jashkenas/underscore
        isElement: function isElement(obj) {
            return !!(obj && obj.nodeType === 1);
        }

    };

}(window, document));
