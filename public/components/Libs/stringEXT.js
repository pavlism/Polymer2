//Version 1.4

//adds some needed straing function to the string prototype

if (Lib.JS.isUndefined(stringExt)) {
    var stringExt = {};

    var creation = function () {
        //A string extension file it simply has several function the extend the String object
        var log = new Logger('StringEXT.js', CLL.error);

        /**
         * This will return the part of the string before the delimter
         * Example: "test123456".beofre('123') => "test"
         * 
         * @param delimiter {string} The pattern to look for in the string
         * @return {string} Returns the left portion of the string before the delimiter
         */
        String.prototype.before = function (delimiter) {
            log.trace("before");
            if (Lib.JS.checkParameter(delimiter, "numChars Missing", log)) {
                return "";
            }

            var returnVal = "";
            var DELPOS = -1;
            DELPOS = this.indexOf(delimiter);
            returnVal = this.left(DELPOS);
            return returnVal;
        };

        /**
         * This will return the part of the string after the delimter
         * Example: "test123456".beofre('123') => "456"
         * 
         * @param delimiter {string} The pattern to look for in the string
         * @return {string} Returns the rigth portion of the string after the delimiter
         */
        String.prototype.after = function (delimiter) {
            log.trace("before");
            if (Lib.JS.checkParameter(delimiter, "numChars Missing", log)) {
                return "";
            }

            var returnVal = "";
            var DELPOS = -1;
            DELPOS = this.indexOf(delimiter);
            returnVal = this.right(this.length - DELPOS - 1);
            return returnVal;
        };

        /**
         * This will return everything in the string to the left of the @stringVal, but t he char at @position
         * Example: Lib.JS.Left("0123456", 4) = "0123"
         * 
         * @param this {String} the string you want to look at.
         * @param position {Number} the poistion.
         * @return {String} Returns This will return everything in the string to the left of the @position
         */
        String.prototype.left = function (position) {
            log.trace("Left");
            Lib.JS.setDefaultParameter(position, 0);
            if (position > this.length || position < 0) {
                return this;
            }

            return this.substring(0, position);
        };
        /**
         * This will return everything in the string to the Rigth of the @stringVal, but NOT the char at @position
         * Example: Lib.JS.Left("0123456", 4) = "0123"
         * 
         * @param this {String} the string you want to look at.
         * @param position {Number} the poistion.
         * @return {String} Returns This will return everything in the string to the Rigth of the @position
         */
        String.prototype.right = function (position) {
            log.trace("Left");
            Lib.JS.setDefaultParameter(position + 1, 0);
            if (position + 1 > this.length || position + 1 < 0) {
                return this;
            }

            return this.substring(position + 1, this.length);
        };
        /**
         * This will remove extra white space an dempty lines of a string
         * Example: Lib.JS.Left("0123456   \n\n\n   sdf ") = "0123456\nsdf"
         * 
         * @param text {String} the string you want cleaned.
         * @return {String} Returns the cleaned string
         */
        String.prototype.cleanText = function () {
            log.trace("cleanText");
            var cleanText = '';
            var lines = this.split('\n');
            for (var lineConter = 0; lineConter < lines.length; lineConter++) {
                if (lines[lineConter].trim() !== '') {
                    cleanText = cleanText + lines[lineConter].trim() + '\n';
                }
            }

            return cleanText;
        };

    };
    creation.call(stringExt);
}