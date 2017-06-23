/*
 * V0.1 
 * Creates a csv string representation of a table, then adds a link to that file to the page and then clicks it for the user so it downloads automatically.
 */

class MRPCSVButton extends Polymer.Element {
    static get is() {
        return  'mrp-csv-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''}, //The ID of the element
            dataSelector: {type: String, value: ''}, //The Jquery selector to get the table object
            dataCall: {type: String, value: ''}, //The dataCall this button can use to get the table element, used with <mrp-table> can be used when created custom elements
            fileName: {type: String, value: 'table'}                            //The name of the file that will be created and downloaded
        };
    }

    handleClick(event) {
        var dataCall = this.get('dataCall');
        var dataSelector = this.get('dataSelector');
        var csvContent = "data:text/csv;charset=utf-8,";

        //Making sure the element can reach a table, and setting the up the dataSelector
        if (dataCall === '' && dataSelector === '') {
            console.log('MRPCSVButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the CVS button to the data');
        } else if (dataCall !== '') {
            var tableArray = DataBroker.trigger(dataCall);
            csvContent = csvContent + Lib.JS.array2DToString(tableArray, ',', '\r\n');
        }else{
            //creating the csv string from the table element
            $(dataSelector).find('tr').each(function (index, element) {
                $(element).find('th').each(function (index, element) {
                    csvContent = csvContent + $(element).text() + ',';
                });
                $(element).find('td').each(function (index, element) {
                    var strCell = Lib.Polymer.elementToString(element, true);
                    csvContent = csvContent + strCell + ',';
                });
                //get rid of last comma and add LFCR
                csvContent = csvContent.substring(0, csvContent.length - 1);
                csvContent = csvContent + '\r\n';
            });
        }

        //Turning the csv string into a csv file and downloading it the user machine with the file-name property
        var encodedUri = encodeURI(csvContent);

        //Create a <a> and point it to the file
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", this.get('fileName') + '.csv');

        //Adding the link to the page, clicking it and then removing it
        document.body.appendChild(link);
        link.click();
        $(link).remove();
    }
}
customElements.define(MRPCSVButton.is, MRPCSVButton);