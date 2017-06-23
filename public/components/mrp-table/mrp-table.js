/* V0.1
 * 
 * 
 */

class MRPTable extends Polymer.Element {

    static get log() {
        return new Logger('MRPTable.js', CLL.warn);
    }
    static get is() {
        return  'mrp-table';
    }
    static get properties() {
        return {
            id: {type: String, value: ''}, //The ID of the element
            class: {type: String, value: ''}, //The class of the element
            data: {type: Array, observer: 'setMaxLength', value: function () {
                    return [];
                }}, //A 2D array that will hold all the data passed into the element to create the table. The first row of the element will become the headers
            currentData: {type: Array, value: function () {
                    return [];
                }}, //A 2D array that will hold the filtered data when using the search option
            footer: {type: Boolean, value: false}, //If true this will create a second header row at the bottom of the page
            select: {type: Boolean, value: false}, //If true this will add a column the left of the table, with check boxes. If ticked the row's background color will change
            sort: {type: Boolean, value: false}, //If true this will allow the user to double click on the table headers to sort the table by that column
            sortcolumn: {type: Number, value: -1}, //Keeps track of the currently sorted column
            sortisasc: {type: Boolean, value: false}, //Keeps track of the whether the currently sorted column is sorted ascending or descending 
            search: {type: Boolean, value: false}, //If true a search bar will be added to above the table. The test entered will search through ever cell in the table. Any row with a matching value will stay visible while the other rows will disappear
            searchString: {type: String, value: ''}, //Keeps track of the text in the search text box
            buttons: {type: Boolean, value: false}, //If true a set of buttons will appear above the table. Each button reacts with the filtered data if also using the search bar.
            pages: {type: Boolean, value: false}, //If true this will setup paging for the table.
            //pageList: {type: Array, value: [10, 25, 50, 100]},                //Not currently used, was used as a drop down so the user could change the paging size
            pageListValue: {type: Number, value: 10}, //If pages is true this number will how how many row each page contains
            //pagingMessage: {type: String, value: ''},                         //This was the text displayed in the drop down
            currentPage: {type: Number, value: 1}, //This keep track of which page the user is one, when the pages property is true
            maxLength: {type: Number, value: -1}, //This keeps track of the maximum number or rows, after a the search has been filtered
            numFilteredValues: {type: Number, value: -1}, //This is used to calculated the number of filtered results, it's used to set the maxLength, changing the maxlength
            //Causes the paging to reset, which should happen once the final maxLength is calculated.
            isDblClick: {type: Number, value: 0}                                //0 = waiting state, 1 = a click happened within the last 250ms, 2 = a dolbe click happend
        };
    }

    ready() {
        super.ready();
        //Setup the listeners to give global access to the <table> inside the component, access to the currently filtered data
        //and listen for <mrp-check-box> changes the come from inside the component so it change the row background color
        DataBroker.listen(this.get('id') + '_CurrentData', this, function (listenerArgs, triggerArgs) {
            return listenerArgs.get('currentData');
        });
        DataBroker.listen(this.get('id') + '_CurrentTableElement', this, function (listenerArgs, triggerArgs) {
            return listenerArgs.shadowRoot.querySelector('table');
        });
        EventBroker.listen(this.get('id') + '_checkBox__mrp-check-box_changed', this, function (listenerArgs, triggerArgs) {
            //hihlight the row
            var rowNum = triggerArgs.tableRow;
            var row = $(listenerArgs)[0].shadowRoot.querySelectorAll('tr')[rowNum];

            if (triggerArgs.isChecked) {
                $(row).addClass('selected');
            } else {
                $(row).removeClass('selected');
            }
        });
    }

    attributeChangedCallback(name, old, value) {
        super.attributeChangedCallback(name, old, value);
        //If the data is set or changed update the currentData array
        if (name === 'data') {
            this.set('currentData', JSON.parse(value));
        }
    }

    getHeader(data) {
        //Returns the first row of data form the data array
        var headers = data[0];
        return headers;
    }

    setMaxLength(data) {
        //Used to the set the maxLength to the length of the data array if their isn't any filter, and to the number of ifltered results
        var numFilteredValue = this.get('numFilteredValues');
        if (numFilteredValue === -1) {
            //If the numFilteredValue has never been set
            this.set('maxLength', data.length);
        } else {
            this.set('maxLength', numFilteredValue);
        }
    }

    matchCellType(cell, cellType) {
        //Checks the data of each array element in the data array to see what type of data it is.
        if (typeof cell === "object" && cell !== null) {
            if (Lib.JS.isDefined(cell.button)) {
                if (cellType === 'button') {
                    return true;
                }
                return false;
            } else if (Lib.JS.isDefined(cell.buttons)) {
                if (cellType === 'buttons') {
                    return true;
                }
                return false;
            } else if (Lib.JS.isDefined(cell.link)) {
                if (cellType === 'link') {
                    if (cell.link.href.substr(0, 4) !== 'http') {
                        MRPTable.log.warn('The link href:' + cell.link.href + ' might need to start with http:// or https://');
                    }
                    return true;
                }
                return false;
            } else if (Lib.JS.isDefined(cell.textArea)) {
                if (cellType === 'textArea') {
                    return true;
                }
            } else if (cellType === 'object') {
                return true;
            }
        } else {
            if (cellType === 'cell') {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    getProps(cell) {
        //This is used when complex text is entered as an element in the data array.  The props of the object are turned into extra rows
        //of hidden text and can be displayed when the user clicks on the icon in the cell.  This way one cell can hold lots of data without 
        //distorting the look of the table.
        //Example object: {title'Mark', prop{Company'MRP inc', phone'519-768-4521'}}
        if (Lib.JS.isUndefined(cell.prop)) {
            return [cell];
        }

        var array = $.map(cell.prop, function (value, index, a, b) {
            return [{title: index, val: value}];
        });
        return array;
    }
    keyup(event) {
        //When the key-up event is trigger on the search box this will updated the search string that filters the table.
        //This way the table starts filtering itself as the user is typing instead of waiting until they are complete and trigger a changed event.
        var searchString = $(event.target).val();
        this.set('searchString', searchString);
    }
    searchFilter(searchString, data) {
        //The filtering  function used to filter the table       
        var headers = data[0];
        var lastRow = data[data.length - 1];
        this.set('numFilteredValues', 0);
        var thisObj = this;

        if (searchString !== "") {
            this.set('currentData.length', 0);
            this.push('currentData', headers);

            return function (record) {
                //If header then return true;
                if (record === headers) {
                    return true;
                }
                for (var cellCounter = 0; cellCounter < record.length; cellCounter++) {

                    //Determine what the text should be used for each cell
                    var searchTerm = record[cellCounter];
                    if (!Lib.JS.isDefined(searchTerm)) {
                        //If nothing  is there then the search string should be empty
                        searchTerm = '';
                    } else if (typeof searchTerm === 'object') {
                        //The the cell has an object instead  on simple text
                        if (Lib.JS.isDefined(searchTerm.link)) {
                            //if a link then use the text in the link not the href
                            searchTerm = searchTerm.link.text;
                        } else if (Lib.JS.isDefined(searchTerm.title)) {
                            //if a complex data object then use the title only
                            searchTerm = searchTerm.title;
                        } else {
                            searchTerm = '';
                        }
                    } else {
                        //If anything else make sure the searchTerm is at least a string
                        searchTerm = searchTerm.toString();
                    }

                    //Take the search term and look through all the cells of the row, it it matches anything in that row then it passes.
                    if (searchTerm.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                        var numFilteredValue = thisObj.get('numFilteredValues');
                        thisObj.set('numFilteredValues', numFilteredValue + 1);
                        if (record === lastRow) {
                            thisObj.setMaxLength();
                        }

                        thisObj.push('currentData', record);
                        return true;
                    }
                }
                if (record === lastRow) {
                    thisObj.setMaxLength(data);
                }
                return false;
            };
        } else {
            this.set('numFilteredValues', data.length);
            this.setMaxLength(data);
        }
        return null;
    }
    showRow(index, desiredIndex, pagingNum, currentPage) {
        //Used to hide the first row of data from the table because it's the header
        //Also this hides all rows that are not on the current pages when using paging
        if (!this.get('pages') && index !== desiredIndex) {
            return true;
        }

        if (index !== desiredIndex && index <= pagingNum * currentPage && index > pagingNum * (currentPage - 1)) {
            return true;
        }
    }
    getPages(maxLength, pageSize) {
        //This create an array of numbers, each element corresponds to 1 page, when using the paging
        //This array is used to create the page number button
        var pages = [];
        if (maxLength <= 0) {
            return pages;
        }

        for (var pageCounter = 1; pageCounter <= Math.ceil((maxLength - 1) / pageSize); pageCounter++) {
            pages.push(pageCounter);
        }

        //check current page
        if (this.get('currentPage') > pages.length) {
            this.set('currentPage', pages.length);
        }

        return pages;
    }
    handleClick(event) {
        //There are several possible reason what the table could be clicked and each needs to be handled differently
        //Checking for possible double click
        if (this.get('isDblClick') === 1) {
            this.set('isDblClick', 2);
            this.handleDblClick(event);
            return true;
        }

        //Get the data from the row that was click, or undefined if a row was not clicked
        var rowData = this.getRowData(event);

        if ($(event.target).is('th') && this.get('sort')) {
            //If the header was clicked and sorting is on then sort the column
            this.handleSort(event);
        } else if ($(event.target).is('mrp-button') || $(event.target).parent().is('mrp-button')) {
            //If a button was clicked then check it it's a page button and then change the page
            this.handleButtons(event);
        } else if ($(event.target).is('td')) {
            //If a cell was clicked then check if it's a complex data cell and then hide/reveal the extra data
            this.handleCellClick($(event.target));
        } else if ($(event.target).parent().is('td')) {
            //If an object  in a cell was clicked then check if it's a complex data cell and then hide/reveal the extra data
            this.handleCellClick($(event.target).parent());
        }

        if (Lib.JS.isUndefined(rowData)) {
            //Row not clicked (paging buttons were clicked instead so don't check for double clicks or trigger the click event
            return false;
        }

        var thisObj = this;
        var triggerObj = this.buildTriggerObject(event, rowData, this);
        this.set('isDblClick', 1);

        //Set a timeout to see if a double click has happened, if by the time the timer function runs, if the user hasn't clicked the table again then it's a single click 
        //and the clicked event is triggered
        setTimeout(function () {
            if (thisObj.get('isDblClick') === 1) {
                Lib.Polymer.triggerEventsWithTable(thisObj, triggerObj, 'mrp-table_clicked');
                thisObj.set('isDblClick', 0);
            }
        }, 250);
    }
    getRowData(event) {
        //Grabs the data from the row the user click, if they clicked inside the table
        var row = $(event.target).parent('tr');
        if (row.length === 1) {
            //If the user did click inside the table
            var rowNum = $(row).parent().children('tr:visible').index($(row));
            var currentData = this.get('currentData');
            var rowData = currentData[rowNum + 1];

            if (this.get('pages')) {
                var currentPage = this.get('currentPage');
                var pageListValue = this.get('pageListValue');
                var realRowNum = (currentPage - 1) * pageListValue + rowNum + 1;
                rowData = currentData[realRowNum];
            }

            if ($(event.target).is('th') && this.get('sort')) {
                rowData = currentData[0];
            }
        }

        return rowData;
    }
    buildHeaders(event) {
        //returns the headers of the table
        var headers = [];
        //get the headers
        $(event.target).parent().parent().parent().find('th').each(function () {
            headers.push($(this).text().trim());
        });
        return headers;
    }
    buildRowObject(event, rowData) {
        //This uses the row data and headers and building an object where the properties of the headers and values are the values from the row clicked by the user
        var headers = this.buildHeaders(event);
        var row = {};
        for (var rowCounter = 0; rowCounter < rowData.length; rowCounter++) {
            row[headers[rowCounter]] = rowData[rowCounter];
        }
        return row;
    }
    buildTriggerObject(event, rowData, mrpTable) {
        //return the object to be passed to the click event triggers
        var cell = $(event.target).text().trim();
        //Build a row object
        var row = this.buildRowObject(event, rowData);

        var triggerObj = {cell: cell, row: row, table: mrpTable, event: event};
        return triggerObj;
    }

    handleDblClick(event) {
        //If a double click is detected then collect the required data and trigger the double clicked event
        this.set('isDblClick', 0);
        
        //Get the data from the row that was click, or undefined if a row was not clicked
        var rowData = this.getRowData(event);       

        if (Lib.JS.isUndefined(rowData)) {
            //Row not clicked (paging buttons were clicked instead so don't check for double clicks or trigger the click event
            return false;
        }
        
        var triggerObj = this.buildTriggerObject(event, rowData, this);
        EventBroker.trigger(this.id + "_mrp-table_dblclicked", triggerObj);
    }

    getsortFunction(sortIndex, isAsync) {
        //The sort function  used to sort the columns
        var multipliyer = -1;
        if (isAsync) {
            multipliyer = 1;
        }

        return function (a, b) {
            if (a[sortIndex] < b[sortIndex]) {
                return -1 * multipliyer;
            } else if (a[sortIndex] > b[sortIndex]) {
                return 1 * multipliyer;
            }

            return 0;
        };
    }
    handleSort(event) {
        //If a header was clicked and the sort property is true then sort the table by the column header clicked
        var data = this.get('data');
        var lastsortColum = this.get('sortcolumn');
        var sortIndex = event.target.cellIndex;

        //Need to account for the potential select row
        if (this.get('select')) {
            sortIndex = sortIndex - 1;
            if (sortIndex < 0) {
                return false;
            }
        }

        var headers = data.shift();

        //If the table has already been sorted by this column then flip the sorting (assessing to descending)
        if (lastsortColum === sortIndex) {
            var isAsc = this.get('sortisasc');
            isAsc = !isAsc;
            this.set('sortisasc', isAsc);
        } else {
            isAsc = true;
        }



        var sortFunction = this.getsortFunction(sortIndex, isAsc);
        data.sort(sortFunction);
        data.splice(0, 0, headers);
        this.data = [];
        this.data = data;
        if (this.get('searchString') === '') {
            this.set('currentData', data.slice());
        }

        //sortIndex = sortIndex + 1;
        this.set('sortcolumn', sortIndex);
        this.set('sortisasc', isAsc);

        //setup the arrows
        if (isAsc) {
            $(event.target).parent().children().find('i').removeClass('sortAsc');
            $(event.target).parent().children().find('i').removeClass('sortDesc');
            $(event.target).find('i').addClass('sortAsc');
        } else {
            $(event.target).parent().children().find('i').removeClass('sortAsc');
            $(event.target).parent().children().find('i').removeClass('sortDesc');
            $(event.target).find('i').addClass('sortDesc');
        }
    }
    handleButtons(event) {
        //If a button was pressed, check to see if it's a paging button otherwise do nothing
        if (!$(event.target).parents('div').first().hasClass('pages')) {
            return false;
        }

        if (!this.get('pages')) {
            return false;
        }

        //If the button click was a paging button and the pages property is true then change the page displayed to the user is necessary
        var maxLength = this.getMaxLength();
        var pageSize = this.get('pageListValue');
        if (maxLength === -1) {
            maxLength = this.get('data').length;
            this.set('maxLength', maxLength);
        }


        var currentPage = this.get('currentPage');
        $('#pageButton_' + currentPage).find('button').css('background-color', '#f2f2f2');
        $('#pageButton_' + currentPage).find('button').css('border-color', 'rgb(231, 234, 236)');

        //Check to see if the button was a numbered one of a next/previous one and change the page accordingly
        var buttonText = $(event.target).text().trim();
        if (buttonText === "Next") {
            currentPage = currentPage + 1;
            if (currentPage * pageSize > maxLength) {
                currentPage = Math.ceil((maxLength - 1) / pageSize);
            }
        } else if (buttonText === "Previous") {
            currentPage = currentPage - 1;
            if (currentPage < 1) {
                currentPage = 1;
            }
        } else {
            currentPage = parseInt(buttonText);
        }
        $('#pageButton_' + currentPage).find('button').css('background-color', '#e6e6e6');
        $('#pageButton_' + currentPage).find('button').css('border-color', '#1ab394');
        this.set('currentPage', currentPage);
    }
    handleCellClick(cell) {
        //If a cell was clicked and the cell has a complex object it, then either hide/show the extra data
        if (cell.children('div').is(':visible')) {
            //cell.children('div').hide();
            cell.find('.properties').hide();
            cell.find('span').addClass('object-toggle');
            cell.find('span').removeClass('object-toggle-show');
        } else {
            cell.find('.properties').css('display', 'table');
            cell.find('span').removeClass('object-toggle');
            cell.find('span').addClass('object-toggle-show');
        }
    }
    getMaxLength() {
        //A safer way to get the max length, if the maxlength is not set it will set it
        var maxLength = this.get('maxLength');
        if (maxLength === -1) {
            maxLength = this.get('data').length;
            this.set('maxLength', maxLength);
        }
        return maxLength;
    }
    isCurrentPage(index) {
        //This check the current index when creating the page button, if the index matches the current page property then it's class is changed to highlight it.
        MRPTable.log.trace('isCurrentPage currentPage:' + this.get('currentPage'));
        MRPTable.log.trace('isCurrentPage index+1:' + (index + 1).toString());
        if (index + 1 === this.get('currentPage')) {
            return true;
        } else {
            return false;
        }
    }
}
customElements.define(MRPTable.is, MRPTable);