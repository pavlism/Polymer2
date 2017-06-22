class MRPCSVButton extends Polymer.Element {
    static get is() {
        return  'mrp-csv-button';
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
        var csvContent = "data:text/csv;charset=utf-8,";

        if (dataCall === '' && dataSelector === '') {
            console.log('MRPCSVButton Error: both the data-call and data-selector atrributes are empty, one needs to be used to point the CVS button to the data');
        } else if (dataCall !== '') {
            dataSelector = DataBroker.trigger(dataCall);
        }

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


        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", this.get('fileName') + '.csv');
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
        $(link).remove();
    }
}
customElements.define(MRPCSVButton.is, MRPCSVButton);