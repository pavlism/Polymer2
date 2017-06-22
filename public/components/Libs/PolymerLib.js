//V1.2

//A library used to make Polyer coding easier

if (typeof PolymerLib === 'undefined') {
    var PolymerLib = {};

    if (typeof Lib === 'undefined') {
        Lib = {};
    }

    var creation = function (Lib) {
        var log = new Logger('Lib.Polymer.js', CLL.error);


        Lib.Polymer = {};
        /**
         * This will trigger eventbroker events for a polymer object.  It will check for ID and Class.  If an ID exists then
         * it will fire the {{ID}}eventName.  If a calss is found it will fire {{class}}eventName.  If niether is found then it 
         * will fire eventName.  The will also check for a tableRow number and include it in the triggerObj if found.
         * 
         * @param element {PolymerElement} The element triggering the event,
         * @param triggerObj {Object} The object to pass the trigger event.
         * @param eventName {String} The name of the event to fire.
         */
        Lib.Polymer.triggerEventsWithTable = function (element, triggerObj, eventName) {
            log.trace("triggerEvent");
            var id = element.id;
            if (!Lib.JS.isDefined(id)) {
                id = '';
            }

            var strClass = element.class;
            if (!Lib.JS.isDefined(strClass)) {
                strClass = '';
            }

            var tableRow = element.get('tableRow');

            if (tableRow !== '') {
                triggerObj.tableRow = tableRow;
            }

            Lib.Polymer.triggerEvents(id, strClass, triggerObj, eventName);
        };
        /**
         * This will trigger eventbroker events for a polymer object.  It will check for ID and Class.  If an ID exists then
         * it will fire the {{ID}}eventName.  If a calss is found it will fire {{class}}eventName.  If niether is found then it 
         * will fire eventName.
         * 
         * @param element {PolymerElement} The element triggering the event,
         * @param triggerObj {Object} The object to pass the trigger event.
         * @param eventName {String} The name of the event to fire.
         */
        Lib.Polymer.triggerEventsWithoutTable = function (element, triggerObj, eventName) {
            log.trace("triggerEvent");
            var id = element.id;
            if (!Lib.JS.isDefined(id)) {
                id = '';
            }

            var strClass = element.class;
            if (!Lib.JS.isDefined(strClass)) {
                strClass = '';
            }

            Lib.Polymer.triggerEvents(id, strClass, triggerObj, eventName);
        };
        /**
         * This will trigger eventbroker events for a polymer object.  It will check for ID and Class.  If an ID exists then
         * it will fire the {{ID}}eventName.  If a calss is found it will fire {{class}}eventName.  If niether is found then it 
         * will fire eventName.
         * 
         * @param id {string} The ID of the element
         * @param strClass {string} The Class of the element
         * @param triggerObj {Object} The object to pass the trigger event.
         * @param eventName {String} The name of the event to fire.
         */
        Lib.Polymer.triggerEvents = function (id, strClass, triggerObj, eventName) {
            log.trace("triggerEvent");

            if (id === '' && strClass === '') {
                EventBroker.trigger(eventName, triggerObj);
            } else {
                if (id !== '') {
                    EventBroker.trigger(id + "_" + eventName, triggerObj);
                }
                if (strClass !== '') {
                    EventBroker.trigger(strClass + "_" + eventName, triggerObj);
                }
            }
        };
        /**
         * This will take an Polymer element and return a string value that represent that object.  IT's designed to work with MRP elements.
         * 
         * @param element {PolymerElement} The element triggering the event,
         * @param useJSON {Boolean} It true a complicated object will create a JSON string
         * @return {Boolean} Returns true if the callback is a function and exists
         */
        Lib.Polymer.elementToString = function (element, useJSON) {
            log.trace("triggerEvent");
            var strCell = '';
            if ($(element).children(":not('dom-if')").length === 0) {
                //must be simple text
                strCell = $(element).text().trim();
            } else if ($(element).children("span.object-toggle").length) {
                var strCell = $(element).text().trim().cleanText();
                if (useJSON) {
                    var obj = {};
                    var lines = strCell.split('\n');
                    obj[lines[0]] = {};
                    for (var lineConter = 0; lineConter < lines.length; lineConter++) {
                        var parts = lines[lineConter].split(':');
                        obj[lines[0]][parts[0]] = parts[1];
                    }
                    strCell = JSON.stringify(obj);
                    strCell = Lib.JS.replace(strCell, ",", " ");
                }
            } else {
                $(element).children(":not('dom-if')").each(function (index, element) {
                    if (Lib.JS.isDefined(element.val)) {
                        strCell = strCell + element.val().trim();
                    } else if ($(element).is('a')) {
                        strCell = strCell + $(element).attr('href');
                    } else {
                        strCell = strCell + $(element).val().trim();
                    }

                });
            }
            return strCell;
        };
    };

    creation.call(PolymerLib, Lib);
}