class MRPCopyButton extends Polymer.Element {
    //This will take a pointer/dataCall to a table or <mrp-table> element and make a tab delimited string out of it's contents.
    //The tab delimited string will then be copyied to the slipboard and a <marp-alert> will be pop up notify the user.
    
    static get is() {
        return  'mrp-copy-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},
            dataSelector: {type: String, value: ''},
            dataCall: {type: String, value: ''},
            alert: {type: Boolean, value: false},
            alertTitle: {type: String, value: 'Success'},
            alertMessage: {type: String, value: 'Table Copied to Clipboard'}
        };
    }

    ready() {
        super.ready();
        var thisObj = this;
        var dataCall = this.get('dataCall');
        var dataSelector = this.get('dataSelector');
        var textObj = {};
        var thisObj = this;

        if (dataCall === '' && dataSelector === '') {
            console.log('MRPCopyButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the Copy button to the data');
        } else if (dataCall !== '') {
            dataSelector = DataBroker.trigger(dataCall);
        }
        
        textObj.text = function () {
            var text = '';
            var extraText = '';
            var elmText = [];
            $(dataSelector).find('tr').each(function (index, element) {
                $(element).find('th').each(function (index, element) {
                    text = text + $(element).text() + '\t';
                });
                $(element).find('td').each(function (index, element) {
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
        }
        // }

        var buttonObj = $(this)[0].shadowRoot.querySelector('mrp-button');
        var clipboard = new Clipboard(buttonObj, textObj);


        clipboard.on('success', function (e) {

            //set the alert
            //Must set to false, becasue if button is clicked again the alert value is still true so it won't update the page, which won't trigger the change in the alert.
            thisObj.set('alert', false);
            thisObj.set('alert', true);
            console.log("clipboard.on('success'");
        });

        clipboard.on('error', function (e) {
            thisObj.set('alertTitle', 'Copy Failed');
            thisObj.set('alertMessage', 'Check the console to see the error');
            console.log(e);
            thisObj.set('alert', false);
            thisObj.set('alert', true);
        });
    }

    handleClick(event) {

    }
}
customElements.define(MRPCopyButton.is, MRPCopyButton);