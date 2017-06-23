class MRPTable extends Polymer.Element {

    static get log() {
        return new Logger('MRPTable.js', CLL.warn);
    }
    static get is() {
        return  'mrp-table';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},
            class: {type: String, value: ''},
            data: {type: Array, observer: 'setMaxLength', value: function () {
                    return [];
                }},
            currentData: {type: Array, reflectToAttribute: true, value: function () {
                    return [];
                }},
            footer: {type: Boolean, value: false},
            select: {type: Boolean, value: false},
            sortable: {type: Boolean, value: false},
            sortcolumn: {type: Number, value: -1},
            sortisasc: {type: Boolean, value: false},
            search: {type: Boolean, value: false},
            searchString: {type: String, value: ''},
            buttons: {type: Boolean, value: false},
            pages: {type: Boolean, value: false},
            pageList: {type: Array, value: [10, 25, 50, 100]},
            pageListValue: {type: Number, value: 10},
            pagingMessage: {type: String, value: ''},
            currentPage: {type: Number, value: 1},
            maxLength: {type: Number, value: -1},
            numFilteredValues: {type: Number, value: 0},
            basic: {type: Boolean, value: false},
            complexData: {type: Boolean, value: false},
            isDblClick: {type: Number, value: 0}    //0 = waiting state, 1 = a click happened within the last 250ms, 2 = a dolbe click happend
        };
    }

    ready() {
        super.ready();
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
        if (name === 'data') {
            this.set('currentData', JSON.parse(value));
        }
    }

    getHeader(data) {
        var headers = data[0];
        return headers;
    }

    setMaxLength(a, b, c) {
        var numFilteredValue = this.get('numFilteredValues');
        if (numFilteredValue === 0) {
            this.set('maxLength', a.length);
        } else {
            this.set('maxLength', numFilteredValue);
        }
    }

    matchCellType(cell, cellType) {
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
        if (Lib.JS.isUndefined(cell.prop)) {
            return [cell];
        }

        var array = $.map(cell.prop, function (value, index, a, b) {
            return [{title: index, val: value}];
        });
        return array;
    }
    keyup(event) {
        var searchString = $(event.target).val();
        this.set('searchString', searchString);
    }
    searchFilter(searchString, data) {

        this.set('currentData.length', 0);


        var headers = data[0];
        var lastRow = data[data.length - 1];
        this.set('numFilteredValues', 0);
        var thisObj = this;
        this.push('currentData', headers);



        if (searchString !== "") {
            return function (record) {
                //If header then return true;
                if (record === headers) {
                    return true;
                }
                for (var cellCounter = 0; cellCounter < record.length; cellCounter++) {
                    var searchTerm = record[cellCounter];
                    if (!Lib.JS.isDefined(searchTerm)) {
                        searchTerm = '';
                    } else if (typeof searchTerm === 'object') {
                        if (Lib.JS.isDefined(searchTerm.link)) {
                            searchTerm = searchTerm.link.text;
                        } else if (Lib.JS.isDefined(searchTerm.title)) {
                            searchTerm = searchTerm.title;
                        } else {
                            searchTerm = '';
                        }
                    } else {
                        searchTerm = searchTerm.toString();
                    }

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
        if (!this.get('pages') && !this.isIndex(index, desiredIndex)) {
            return true;
        }

        //don't show the first row (its the header)
        if (!this.isIndex(index, desiredIndex) && index <= pagingNum * currentPage && index > pagingNum * (currentPage - 1)) {
            return true;
        }
    }
    isIndex(index, desiredIndex) {
        if (index === desiredIndex) {
            return true;
        } else {
            return false;
        }
    }
    getPages(maxLength, pageSize) {
        console.log('getPages maxLength:' + maxLength);
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
        if (this.get('isDblClick') === 1) {
            this.set('isDblClick', 2);
            this.handleDblClick(event);
            return true;
        }

        this.set('isDblClick', 1);
        var checkForDoubleClick = true;

        if ($(event.target).is('th') && this.get('sortable')) {
            this.handleSort(event, this);
            checkForDoubleClick = false;
        } else if ($(event.target).is('mrp-button') || $(event.target).parent().is('mrp-button')) {
            this.handleButtons(event);
            checkForDoubleClick = false;
        } else if ($(event.target).is('td')) {
            this.handleCellClick($(event.target));
        } else if ($(event.target).parent().is('td')) {
            this.handleCellClick($(event.target).parent());
        }

        //if row has an object then expand the row
        var row = $(event.target).parent();
        var rowNum = $(event.target).parent().parent().children('tr').index(row);
        var tableData = this.get('data');
        var cell = $(event.target).text().trim();
        var domRow = $(event.target).parent().find('td');
        var headers = [];
        //get the headers
        $(event.target).parent().parent().parent().find('th').each(function () {
            headers.push($(this).text().trim());
        });

        var row = {};
        for (var rowCounter = 0; rowCounter < domRow.length; rowCounter++) {
            row[headers[rowCounter]] = $(domRow[rowCounter]).text().trim();
        }

        if (checkForDoubleClick) {
            var thisObj = this;

            setTimeout(function () {
                if (thisObj.get('isDblClick') === 1) {
                    var triggerObj = {cell: cell, row: row, table: thisObj, event: event};
                    Lib.Polymer.triggerEventsWithTable(this, triggerObj, 'mrp-table_clicked');
                    thisObj.set('isDblClick', 0);
                }
            }, 250);
        }

    }

    handleDblClick(event) {
        this.set('isDblClick', 0);
        var cell = $(event.target).text().trim();
        var domRow = $(event.target).parent().find('td');
        var headers = [];
        //get the headers
        $(event.target).parent().parent().parent().find('th').each(function () {
            headers.push($(this).text().trim());
        });

        var row = {};
        for (var rowCounter = 0; rowCounter < domRow.length; rowCounter++) {
            row[headers[rowCounter]] = $(domRow[rowCounter]).text().trim();
        }
        EventBroker.trigger(this.id + "_mrp-table_dblclicked", {cell: cell, row: row, table: this, event: event});
    }

    getSortFunction(sortIndex, isAsync) {
        var multipliyer = -1;
        if (isAsync) {
            multipliyer = 1;
        }

        return function (a, b, c) {
            if (a[sortIndex] < b[sortIndex]) {
                return -1 * multipliyer;
            } else if (a[sortIndex] > b[sortIndex]) {
                return 1 * multipliyer;
            }

            return 0;
        };
    }
    handleSort(event, polObject) {
        var data = polObject.get('data');
        var lastSortColum = polObject.get('sortcolumn');
        var sortIndex = event.target.cellIndex;
        var headers = data.shift();

        if (lastSortColum === sortIndex) {
            var isAsc = polObject.get('sortisasc');
            isAsc = !isAsc;
            polObject.set('sortisasc', isAsc);
        } else {
            isAsc = true;
        }

        var sortFunction = this.getSortFunction(sortIndex, isAsc);
        data.sort(sortFunction);
        data.splice(0, 0, headers);
        polObject.data = [];
        polObject.data = data;
        polObject.set('sortcolumn', sortIndex);
        polObject.set('sortisasc', isAsc);

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
        if (!$(event.target).parents('div').first().hasClass('pages')) {
            return false;
        }

        if (!this.get('pages')) {
            return false;
        }

        var maxLength = this.getMaxLength();
        var pageSize = this.get('pageListValue');
        if (maxLength === -1) {
            maxLength = this.get('data').length;
            this.set('maxLength', maxLength);
        }

        var currentPage = this.get('currentPage');
        $('#pageButton_' + currentPage).find('button').css('background-color', '#f2f2f2');
        $('#pageButton_' + currentPage).find('button').css('border-color', 'rgb(231, 234, 236)');

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
        console.log('currentPage:' + currentPage);
    }
    handleCellClick(cell) {
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
        var maxLength = this.get('maxLength');
        if (maxLength === -1) {
            maxLength = this.get('data').length;
            this.set('maxLength', maxLength);
        }
        return maxLength;
    }
    setupFirstPageHighliting(counter) {
        if (counter > 10) {
            return false;
        }
        var thisObj = this;
        setTimeout(function () {

            if ($('#pageButton_1').length > 0) {
                $('#pageButton_1').find('button').css('background-color', '#e6e6e6');
                $('#pageButton_1').find('button').css('border-color', '#1ab394');
            } else {
                thisObj.setupFirstPageHighliting(counter + 1)
            }
        }, 1000);
    }
    isCurrentPage(index) {
        MRPTable.log.trace('isCurrentPage currentPage:' + this.get('currentPage'));
        MRPTable.log.trace('isCurrentPage index+1:' + (index + 1).toString());
        if (index + 1 === this.get('currentPage')) {
            console.log('return true');
            return true;
        } else {
            return false;
        }
    }
}
customElements.define(MRPTable.is, MRPTable);