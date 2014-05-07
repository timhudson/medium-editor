/*global console, meditor*/

(function (window, document) {
    'use strict';

    meditor.selection = {

        init: function init() {
            this.object = window.getSelection();
        },

        setup: function setUp(newSelection) {
            this.object = newSelection;
            this.selectionRange = this.object.getRangeAt(0);
        },

        // http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
        // by Tim Down
        save: function save() {
            var i,
                len,
                ranges,
                sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                ranges = [];
                for (i = 0, len = sel.rangeCount; i < len; i += 1) {
                    ranges.push(sel.getRangeAt(i));
                }
                return ranges;
            }
            return null;
        },

        restore: function restore(savedSel) {
            var i,
                len,
                sel = window.getSelection();
            if (savedSel) {
                sel.removeAllRanges();
                for (i = 0, len = savedSel.length; i < len; i += 1) {
                    sel.addRange(savedSel[i]);
                }
            }
        },

        // http://stackoverflow.com/questions/1197401/how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contentedi
        // by You
        getStart: function getStart() {
            var node = document.getSelection().anchorNode,
                startNode = (node && node.nodeType === 3 ? node.parentNode : node);
            return startNode;

        },

        // http://stackoverflow.com/questions/4176923/html-of-selected-text
        // by Tim Down
        getHTML: function getHTML() {
            var i,
                html = '',
                sel,
                len,
                container;
            if (window.getSelection !== undefined) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    container = document.createElement('div');
                    for (i = 0, len = sel.rangeCount; i < len; i += 1) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    html = container.innerHTML;
                }
            } else if (document.selection !== undefined) {
                if (document.selection.type === 'Text') {
                    html = document.selection.createRange().htmlText;
                }
            }
            return html;
        },

        serialize: function serialize() {
            var tagName,
                el = this.object.anchorNode;

            if (el && el.tagName) {
                tagName = el.tagName.toLowerCase();
            }

            while (el && meditor.common.parentElements.indexOf(tagName) === -1) {
                el = el.parentNode;
                if (el && el.tagName) {
                    tagName = el.tagName.toLowerCase();
                }
            }

            return {
                el: el,
                tagName: tagName
            };
        },



        getElement: function getElement() {
            var selection = window.getSelection(),
                range, current, parent,
                result,
                getMediumElement = function (e) {
                    var localParent = e;
                    try {
                        while (!localParent.getAttribute('data-medium-element')) {
                            localParent = localParent.parentNode;
                        }
                    } catch (errb) {
                        return false;
                    }
                    return localParent;
                };
            // First try on current node
            try {
                range = selection.getRangeAt(0);
                current = range.commonAncestorContainer;
                parent = current.parentNode;

                if (current.getAttribute('data-medium-element')) {
                    result = current;
                } else {
                    result = getMediumElement(parent);
                }
                // If not search in the parent nodes.
            } catch (err) {
                result = getMediumElement(parent);
            }
            return result;
        },

        // http://stackoverflow.com/questions/15867542/range-object-get-selection-parent-node-chrome-vs-firefox
        isSingleNode: function rangeSingleNode() {
            var startNode = this.selectionRange.startContainer;
            return startNode === this.selectionRange.endContainer &&
                startNode.hasChildNodes() &&
                this.selectionRange.endOffset === this.selectionRange.startOffset + 1;
        },

        getParentElement: function () {
            var selectedParentElement = null;
            if (this.isSingleNode()) {
                selectedParentElement = this.selectionRange.startContainer.childNodes[this.selectionRange.startOffset];
            } else if (this.selectionRange.startContainer.nodeType === 3) {
                selectedParentElement = this.selectionRange.startContainer.parentNode;
            } else {
                selectedParentElement = this.selectionRange.startContainer;
            }
            return selectedParentElement;
        }
    };
}(window, document));
