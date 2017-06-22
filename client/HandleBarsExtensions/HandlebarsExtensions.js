/* Holds several functions that can be caled from a balze template */
var log = new Logger('HandlebarsExtensions.js', CLL.error);

////TESTED

/**
 * A for loop that will simply repeat HMTL code n number of times
 * 
 * @param ContentBloack, the HTML insiide the forLoop block become the input
 * @return {array} Returns a new array that triggers the forLoop tampate to print the content n times using the #each
 * Example: {{#forLoop 5}}test{{/forLoop}} -> will print out test 5 times
 */
Template.registerHelper('forLoop', function () {
    log.trace("forLoop");
    
    
    var forLoop = [];
    var reps = this.valueOf();
    for (var i = 0; i < reps; i++) {
        forLoop[i] = {_id: i};
    }
    return forLoop;
});


/**
 * This will take a 2D array as inpute and return an HTML table based on the data.  The table created
 * will on diplay the information from the array.
 * 
 * @param (2d array)tableData, the 2d array of data to become the cells of data
 * @return {HTML} Returns an HTML table
 * Example: {{printTable tableData}}
 */
Template.registerHelper('printTable', function (tableData) {
    log.trace("printTable");
    if (typeof tableData === 'undefined') {
        log.error("tableData is undefined");
        return "";
    }

    if (tableData.length < 1) {
        log.debug("printTable: Input Data Error");
        log.debug("tableData: " + tableData);
        return "";
    }

    var HTMLTable = "";
    var rowCounter = 0;

    HTMLTable = HTMLTable + "<table>";
    HTMLTable = HTMLTable + "<tr>";

    //setup the the headers of the table
    for (var key in tableData[0]) {
        HTMLTable = HTMLTable + "<td>" + key + "</td>";
    }
    HTMLTable = HTMLTable + "</tr>";

    //setup all the rows
    for (rowCounter = 0; rowCounter < tableData.length; rowCounter++) {
        HTMLTable = HTMLTable + "<tr>";
        for (var key in tableData[rowCounter]) {
            HTMLTable = HTMLTable + "<td>" + tableData[rowCounter][key] + "</td>";
        }
        HTMLTable = HTMLTable + "</tr>";
    }
    HTMLTable = HTMLTable + "</table>";

    log.debug("HTMLTable: " + HTMLTable);
    return Spacebars.SafeString(HTMLTable);
});

var collectRecordData = function (tableData, tableSettings) {
    var recordData = [];
    var numData = 0;

    $.each(tableData[0], function (index, value) {
        recordData.push({index: index, value: value});
        numData++;
    });

    $.each(tableSettings.files, function (index, value) {
        recordData.push({index: this.title, value: ""});
        numData = numData + 2;
    });

    $.each(tableSettings.lists, function (index, value) {
        numData = numData + 2;
    });
    return {recordData: recordData, numData: numData};
};

/**
 * This will concatinate 2 string values together
 * 
 * @param (string )string1, the first string to combine
 * @param (string )string2, the first string to combine
 * @return {string} Returns a new concatinated string
 * Example: {{concat 'test' 'test2'}} -> testtest2
 */
Template.registerHelper('concat', function (string1, string2) {
    return string1.toString() + string2.toString();
});

/**
 * This will act as a move complexe if statment
 * 
 * @param (object) v1, the left object
 * @param (string) operator, the method in which to compare the 2 objects
 * @param (object )v2, the right object
 * @return {boolean} Returns true or false
 * Example: {{#if ifCond var1 '==' 'var2'}}
 */
Handlebars.registerHelper('ifCond', function (v1, operator, v2) {
    switch (operator) {
        case '==':
            return (v1 == v2);
        case '===':
            return (v1 === v2);
        case '<':
            return (v1 < v2);
        case '<=':
            return (v1 <= v2);
        case '>':
            return (v1 > v2);
        case '>=':
            return (v1 >= v2);
        case '&&':
            return (v1 && v2);
        case '&&!':
            return (v1 && !v2);
        case '||':
            return (v1 || v2);
        default:
            return false;
    }
});

/**
 * This expands what is a truthy value.  It will check the input and determine if it is a truthy object.
 * This inclues true, 'true', 1 and '1'
 * 
 * @param (object) v1
 * @return {boolean} Returns true is the object is truthy
 * Example: {{#if ifTrue checked}}
 */
Handlebars.registerHelper('ifTrue', function (v1) {
    //this check the different way a value can be true, 'true', true, 1
    if (v1 === true || v1 === 'true' || v1 === '1' || v1 === 1) {
        return true;
    } else {
        return false;
    }
});

/**
 * JSON.stringify of the object
 * 
 * @param (object)
 * @return {string} Returns JSON.stringify(object)
 * Example: {{#if ifTrue checked}}
 */
Template.registerHelper('printObject', function (object) {
    return JSON.stringify(object);
});

/**
 * JSON.stringify of the object
 * 
 * @param (object)
 * @return {string} Returns JSON.stringify(object)
 * Example: {{#if ifTrue checked}}
 */
Template.registerHelper('print', function (object) {
    return JSON.stringify(object);
});

/**
 * JSON.stringify of the object with the color red
 * 
 * @param (object)
 * @return {string} Returns JSON.stringify(object)
 * Example: {{#if ifTrue checked}}
 */
Template.registerHelper('logObject', function (object) {
    console.log('%c' + JSON.stringify(object), 'color: #red');
    return "";
});


//NOT TESTED - not used
Template.registerHelper('toFixedDecimal', function (context, num) {
    if (context % 1 === 0) {
        return context = parseInt(context, 10);
    } else {
        return  context.toFixed(num);
    }
});
Template.registerHelper('checkedRadioButton', function (x, y) {
    if (x === y) {
        return 'checked';
    }
    return ''
});
Template.registerHelper('formatTime', function (context, format) {
    if (context) {
        return moment(context.toISOString()).format(format);
    }
});
Template.registerHelper('currentDateTime', function (context, options) {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
});
Template.registerHelper('getTimeMessage', function (context, options) {
    var now = moment();
    var hour = moment().hour();

    if (hour < 12)
        return mf('goodMorning', 'Good Morning');
    else if (hour > 17)
        return mf('goodEvening', 'Good Evening');
    else
        return mf('goodAfternoon', 'Good Afternoon');
});