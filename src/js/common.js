/*global console, meditor*/

(function (window, document) {
    'use strict';

    meditor.common = {

        parentElements: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre'],

        defaults: {
            allowMultiParagraphSelection: true,
            anchorInputPlaceholder: 'Paste or type a link',
            anchorPreviewHideDelay: 500,
            buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote'],
            buttonLabels: false,
            checkLinkFormat: false,
            cleanPastedHTML: false,
            delay: 0,
            diffLeft: 0,
            diffTop: -10,
            disableReturn: false,
            disableDoubleReturn: false,
            disableToolbar: false,
            disableEditing: false,
            elementsContainer: false,
            firstHeader: 'h3',
            forcePlainText: true,
            placeholder: 'Type your text',
            secondHeader: 'h4',
            targetBlank: false,
            extensions: {}
        },

        // http://stackoverflow.com/questions/17907445/how-to-detect-ie11#comment30165888_17907562
        // by rg89
        isIE: ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) !== null)))

    };

}(window, document));
