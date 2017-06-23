/*
 * V0.1 
 * Creates a array representation of a table and turns it into an Excel file using ExcelPlus.js.  The file is then downloaded.
 */


class MRPExcelButton extends Polymer.Element {
    static get is() {
        return  'mrp-excel-button';
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
        var excelArray = [];

        //Making sure the element can reach a table, and setting the up the dataSelector
        if (dataCall === '' && dataSelector === '') {
            console.log('MRPExcelButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the CVS button to the data');
        } else if (dataCall !== '') {
            var tableData = DataBroker.trigger(dataCall);
            tableData.forEach(function (row, rowIndex) {
                var excelRow = [];
                //setup headers
                row.forEach(function (cell, colIndex) {
                    excelRow.push(cell.toString());
                });
                excelArray.push(excelRow);
            });
        } else {
            //Creating  the Excel array from the table
            $(dataSelector).find('tr').each(function (index, element) {
                var row = [];
                $(element).find('th').each(function (index, element) {
                    row.push($(element).text());
                });
                $(element).find('td').each(function (index, element) {
                    var strCell = Lib.Polymer.elementToString(element, true);
                    row.push(strCell);
                });
                excelArray.push(row);
            });
        }



        //Building the Excel file from the array and having it downloaded
        var ep = new ExcelPlus();
        ep.createFile("Book1").write({"content": excelArray}).saveAs(this.get('fileName') + ".xlsx");
    }
}
customElements.define(MRPExcelButton.is, MRPExcelButton);