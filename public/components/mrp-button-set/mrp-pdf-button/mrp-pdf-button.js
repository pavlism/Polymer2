class MRPPDFButton extends Polymer.Element {
    static get is() {
        return  'mrp-pdf-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},
            dataSelector: {type: String, value: ''},
            dataCall: {type: String, value: ''},
            fileName: {type: String, value: 'table'},
            pageOrientation: {type: String, value: 'portrait'},
            pageSize: {type: String, value: 'A5'},
            styles: {type: Object, value: function () {
                    return {header: {fontSize: 14, bold: true, fillColor: '#294152', color: '#FFFFFF'}, even: {fontSize: 12, fillColor: '#f7f3f7'}};
                }}
        };
    }

    handleClick(event) {
        var dataCall = this.get('dataCall');
        var dataSelector = this.get('dataSelector');

        var widths = [];
        var data = [];
        var isRowEven = false;
        var extraText = '';
        var elmText = [];

        if (dataCall === '' && dataSelector === '') {
            console.log('MRPPDFButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the PDF button to the data');
        } else if (dataCall !== '') {
            var dataSelector = DataBroker.trigger(dataCall);
        }

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
            data.push(row);
        });
        var table = {headerRows: 1, widths: widths, body: data};
        var docDefinition = {content: [{table: table}], styles: this.get('styles'), pageOrientation: this.get('pageOrientation'), pageSize: this.get('pageSize')};

        // open the PDF in a new window
        pdfMake.createPdf(docDefinition).open();
        // download the PDF
        pdfMake.createPdf(docDefinition).download('optionalName.pdf');

    }
}
customElements.define(MRPPDFButton.is, MRPPDFButton);