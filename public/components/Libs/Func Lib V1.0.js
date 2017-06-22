//Creator: Mark Pavlis
//Creation Date: Wednsday, Janurary ‎25, ‎2017

//Dependencies: JQuery

var F = new (function () {

    /**
     Filters are used to reduce an array to a smaller array based on some kind of condiciton.  All the elments that pass the condiditon 
     are added to completly new array
     */
    this.filters = new (function () {
        /**
         * This will return the first X elements from the array
         * @end {int} The number elements to return
         * @return {array}
         */
        this.firstX = function (end) {
            return function (element, index, arr) {
                return index < end;
            };
        };
        /**
         * This will return the X elements from the middle.
         * @start {int} The index of the first elements to return
         * @end {int} The index of the last elements to return
         * @return {array}
         */
        this.midX = function (start, end) {
            return function (element, index, arr) {
                return index <= end && index >= start;
            };
        };
    })();


    /**
     reducers are used combine an array of information into 1 value.  They return a single value.  The initial vlue varibles should also be set.
     */
    this.reducers = new (function () {
        this.combine = function (total, currentValue, index, arr) {
            return total = total + currentValue;
        };
        this.count = function (total, currentValue, index, arr) {
            return total = total + 1;
        };
    })();

    /**
     maps are used to run a funciton on each element of an array.  They return a new array.
     */
    this.maps = new (function () {
        this.property = function (property) {
            return function (element, index, arr) {
                return element[property];
            };
        };
        this.addOne = function (currentValue, index, array) {
            return currentValue + 1;
        };
        this.undefinedToString = function (currentValue, index, array) {
            if (typeof currentValue !== 'undefined') {
                return currentValue;
            }
            return '';
        };
        this.index = function (currentValue, index, array) {
            return currentValue;
        };
    })();

    /**
     everies check whether all elements in an array pass a condition.  They Return a boolean value;
     */
    this.everies = new (function () {
        this.greatThan = function (lowerlimit) {
            return function (element, index, arr) {
                if (element > lowerlimit) {
                    return true;
                } else {
                    return false;
                }
            };
        };
    })();






})();

Array.prototype.every = function (everyFunc) {
    var index = 0;
    var isTrue = true;
    for (var item in this) {
        isTrue = isTrue && everyFunc(this[item], index, this);
        index++;
    }
    return isTrue;
};
Array.prototype.filter = function (filterFunc) {
    var newArray = [];
    var index = 0;

    for (var item in this) {
        if (item !== 'index') {
            if (filterFunc(this[item], index, this)) {
                newArray.push(this[item]);
            }
        }

        index++;
    }
    return newArray;
};
Array.prototype.map = function (mapFunc, useIndex) {
    var newArray = [];
    var index = 0;
    for (var item in this) {
        if(useIndex){
            newArray.push(mapFunc(this[item], index, this));
        }else{
            newArray[item] = mapFunc(this[item], index, this);
        }
        index++;
    }
    return newArray;
};
Array.prototype.reduce = function (reduceFunc, initialValue) {
    var accumulator = initialValue;
    var index = 0;
    for (var item in this) {
        if (typeof accumulator === 'undefined' && index === 0) {
            accumulator = this[item];
        } else {
            accumulator = reduceFunc(accumulator, this[item], index, this);
        }

    }
    return accumulator;
};