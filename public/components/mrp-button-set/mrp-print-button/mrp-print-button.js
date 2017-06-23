/*
 * V0.1 
 * Passes the table element to print-hmtl-element.js.
 */

class MRPPrintButton extends Polymer.Element {
    static get is() {
        return  'mrp-print-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''}, //The ID of the element
            dataSelector: {type: String, value: ''}, //The Jquery selector to get the table object
            dataCall: {type: String, value: ''}                                //The dataCall this button can use to get the table element, used with <mrp-table> can be used when created custom elements
        };
    }

    handleClick(event) {
        var dataCall = this.get('dataCall');
        var dataSelector = this.get('dataSelector');
        var PHE = PrintHtmlElement();

        //Making sure the element can reach a table and then passing the <table> to print-hmtl-element.js.
        if (dataCall === '' && dataSelector === '') {
            console.log('MRPPrintButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the Print button to the data');
        } else if (dataCall !== '') {
            var id = Date.now().toString();
            var tableData = DataBroker.trigger(dataCall);
            var MRPTable = document.createElement("mrp-table");
            MRPTable.setAttribute('id', id);
            MRPTable.setAttribute('data', JSON.stringify(tableData));
            MRPTable.setAttribute('class', 'hiddenTable');

            $('body').append(MRPTable);

            var waitForDomLoad = function () {
                setTimeout(function (){
                    var finaltable = DataBroker.trigger(id + '_CurrentTableElement');
                    if($(finaltable).find('td').length===0){
                        waitForDomLoad();
                    }else{
                        PHE.printElement($(finaltable)[0]);
                        $('#' + id).remove();
                    }            
                }, 100);
            };
            waitForDomLoad();
        } else {
            PHE.printElement($(dataSelector)[0]);
        }
    }
}

customElements.define(MRPPrintButton.is, MRPPrintButton);