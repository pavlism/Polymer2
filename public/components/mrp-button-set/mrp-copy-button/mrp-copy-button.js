/*
 * V0.1
 * 
 * This element uses clipboard.js to assign a function to the button inside this element.  That function creates the tab delimited string representation of the table
 * and then copies that string to the clipboard.
 */


class MRPCopyButton extends Polymer.Element {
    static get is() {
        return  'mrp-copy-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''}, //The ID of the element
            dataSelector: {type: String, value: ''}, //The Jquery selector to get the table object
            dataCall: {type: String, value: ''}, //The dataCall this button can use to get the table element, used with <mrp-table> can be used when created custom elements
            alert: {type: String, value: 'false'}, //Used to toggle the alert button on and off
            alertTitle: {type: String, value: 'Table Copied to Clipboard'}, //The title of the alert the will pop up after the data has been copied to the clipboard
            alertMessage: {type: String, value: ''}                             //The message of the alert the will pop up after the data has been copied to the clipboard
        };
    }

    ready() {
        super.ready();
        var thisObj = this;
        var dataCall = this.get('dataCall');
        var dataSelector = this.get('dataSelector');
        var textObj = {};
        var thisObj = this;

        //Making sure the element can reach a table, and setting the up the dataSelector
        if (dataCall === '' && dataSelector === '') {
            console.log('MRPCopyButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the Copy button to the data');
        } else if (dataCall !== '') {
            textObj.text = function () {
                var tableArray = DataBroker.trigger(dataCall);
                var text = '';
                text = Lib.JS.array2DToString(tableArray, '\t', '\r\n');
                return text;
            };
        } else {
            //Creating the text function that will turn turn the table in a tab delimited format
            textObj.text = function () {
                var text = '';
                var extraText = '';
                var elmText = [];
                //Looping through  each row
                $(dataSelector).find('tr').each(function (index, element) {
                    $(element).find('th').each(function (index, element) {
                        //Grabbing all the headers
                        text = text + $(element).text() + '\t';
                    });
                    $(element).find('td').each(function (index, element) {
                        //Getting the text value of each cell in the table
                        if ($(element).children(":not('dom-if')").length === 0) {
                            //must be simple text
                            text = text + $(element).text().trim() + '\t';
                        } else {
                            var strCell = Lib.Polymer.elementToString(element, true);
                            text = text + strCell + '\t';
                        }
                    });
                    //get rid of last tab
                    text = text.substring(0, text.length - 1);
                    text = text + '\t' + extraText;
                    extraText = '';
                    text = text + '\r\n';
                });
                return text;
            };
        }
        
        //Using clipboard.js to assign the text function to run when the button in this element is clicked
        var buttonObj = $(this)[0].shadowRoot.querySelector('mrp-button');
        var clipboard = new Clipboard(buttonObj, textObj);

        //Creating the function to run if the copy to the clipboard is successful
        clipboard.on('success', function (e) {

            //toggle the alert
            //Must set to false, because if button is clicked again the alert value is still true so it won't update the page, which won't trigger the change in the alert.
            thisObj.set('alert', 'false');
            thisObj.set('alert', 'true');
            console.log("clipboard.on('success'");
        });

        //Creating the function to run if the copy to the clipboard is not successful
        clipboard.on('error', function (e) {
            //setup the alert
            thisObj.set('alertTitle', 'Copy Failed');
            thisObj.set('alertMessage', 'Check the console to see the error');
            //Log the error on the console
            console.log(e);
            //toggle the alert
            //Must set to false, because if button is clicked again the alert value is still true so it won't update the page, which won't trigger the change in the alert.
            thisObj.set('alert', 'false');
            thisObj.set('alert', 'true');
        });
    }
}
customElements.define(MRPCopyButton.is, MRPCopyButton);