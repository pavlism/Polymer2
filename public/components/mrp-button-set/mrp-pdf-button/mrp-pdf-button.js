/*
 * V0.1 
 * Creates a pdf file representation of a table and then it opens up a new window to display the pdf.  This uses pdfmake.js.
 */


class MRPPDFButton extends Polymer.Element {
    static get is() {
        return  'mrp-pdf-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''}, //The ID of the element
            dataSelector: {type: String, value: ''}, //The Jquery selector to get the table object
            dataCall: {type: String, value: ''}, //The dataCall this button can use to get the table element, used with <mrp-table> can be used when created custom elements
            fileName: {type: String, value: 'table'}, //The name of the file that will be created and downloaded
            pageOrientation: {type: String, value: 'portrait'}, //Determines if the page will be portrait or landscape
            pageSize: {type: String, value: 'A5'}, //A string value that represents the size of the page. The default is A5
            styles: {type: Object, value: function () {
                    return {header: {fontSize: 14, bold: true, fillColor: '#294152', color: '#FFFFFF'}, even: {fontSize: 12, fillColor: '#f7f3f7'}};
                }}                                                              //A cmplicated object the helps to style the object see http://pdfmake.org for more details 
        };
    }

    handleClick(event) {
        var dataCall = this.get('dataCall');
        var dataSelector = this.get('dataSelector');

        var widths = [];
        var pdfData = [];
        var isRowEven = false;
        var tableData = [];

        //Making sure the element can reach a table, and setting the up the dataSelector
        if (dataCall === '' && dataSelector === '') {
            console.log('MRPPDFButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the PDF button to the data');
        } else if (dataCall !== '') {
            tableData = DataBroker.trigger(dataCall);

            //Loop trough row
            tableData.forEach(function (row, rowIndex) {
                var pdfRow = [];
                //setup headers
                row.forEach(function (cell, colIndex) {

                    if (!Lib.JS.isString(cell)) {
                        cell = '';
                    }

                    if (rowIndex === 0) {
                        widths.push('*');

                        pdfRow.push({text: cell.toString(), style: 'header'});
                    } else {
                        if (isRowEven) {
                            pdfRow.push({text: cell.toString(), style: 'even'});
                        } else {
                            pdfRow.push(cell);
                        }
                        isRowEven = !isRowEven;
                    }
                });
                pdfData.push(pdfRow);
            });
        } else {
            //creating the PDF array from the table element
            $(dataSelector).find('tr').each(function (index, element) {
                var row = [];
                $(element).find('th').each(function (index, element) {
                    widths.push('*');
                    row.push({text: $(element).text(), style: 'header'});
                });
                $(element).find('td').each(function (index, element) {
                    var strCell = Lib.Polymer.elementToString(element, false);
                    if (isRowEven) {
                        row.push({text: strCell, style: 'even'});
                    } else {
                        row.push(strCell);
                    }
                });
                isRowEven = !isRowEven;
                pdfData.push(row);
            });
        }

        //Setting up the styles and other info for the pdf file
        var table = {headerRows: 1, widths: widths, body: pdfData};
        var docDefinition = {content: [{table: table}], styles: this.get('styles'), pageOrientation: this.get('pageOrientation'), pageSize: this.get('pageSize')};

        // open the PDF in a new window
        pdfMake.createPdf(docDefinition).open();
        // download the PDF
        pdfMake.createPdf(docDefinition).download('optionalName.pdf');

    }
}
customElements.define(MRPPDFButton.is, MRPPDFButton);