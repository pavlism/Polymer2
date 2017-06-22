class MRPExcelButton extends Polymer.Element {
    static get is() {
        return  'mrp-excel-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},
            dataSelector: {type: String, value: ''},
            dataCall: {type: String, value: ''},
            fileName: {type: String, value: 'table'}
        };
    }

    handleClick(event) {
        var dataCall = this.get('dataCall');
        var dataSelector = this.get('dataSelector');
        var tableData = [];

        if (dataCall === '' && dataSelector === '') {
            console.log('MRPExcelButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the CVS button to the data');
        } else if (dataCall !== '') {
            dataSelector = DataBroker.trigger(dataCall);
        }

        $(dataSelector).find('tr').each(function (index, element) {
            var row = [];
            $(element).find('th').each(function (index, element) {
                row.push($(element).text());
            });
            $(element).find('td').each(function (index, element) {
                var strCell = Lib.Polymer.elementToString(element, true);
                row.push(strCell);
            });
            tableData.push(row);
        });

        var ep = new ExcelPlus();
        ep.createFile("Book1").write({"content": tableData}).saveAs(this.get('fileName') + ".xlsx");
    }
}
customElements.define(MRPExcelButton.is, MRPExcelButton);