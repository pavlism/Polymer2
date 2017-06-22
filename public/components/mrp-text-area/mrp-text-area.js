class MRPTextArea extends Polymer.Element {
    static get is() {
        return  'mrp-text-area';
    }
    static get properties() {        
        return {
            id: {type: String, value: ''},
            class: {type: String, value: ''},
            rows: {type: String, value: ''},
            cols: {type: String, value: ''},
            text: {type: String, value: ''},
            value: {type: String, value: '', observer: 'changed'},
            regex: {type: String, value: ''},
            placeholder: {type: String, value: ''},
            validation: {type: Number, value: -1, reflectToAttribute: true, observer: 'validationReset'},
            errorMsg: {type: String, value: ''},
            tableRow: {type: String, value: ''}, //used if inside a table
            required: {type: Boolean, value: false},
            propertiesObj: {type: Object, value: function () {
                    return {}}
                }
        };
    }
    
    static get propertiesObj(){
        return {id:'', class:'', rows:'', text:'', value:'', regex:'', placeholder:'', validation:-1, errorMsg:'', tableRow:'', required:false};
    }
    
    isInvalid(validation) {
        if (validation === 0) {
            return true;
        } else {
            return false;
        }
    }
    val(){
        return $(this.shadowRoot.querySelector('textarea')).val();
    }
    ready() {
        super.ready();
        var propertiesObj = this.get('propertiesObj');
        if($.isEmptyObject(propertiesObj )){
            return false;
        }
        
        if(Lib.JS.isDefined(propertiesObj.rows)){
            this.set('rows', propertiesObj.rows);
        }
        if(Lib.JS.isDefined(propertiesObj.cols)){
            this.set('cols', propertiesObj.cols);
        }
        if(Lib.JS.isDefined(propertiesObj.text)){
            this.set('text', propertiesObj.text);
        }
        if(Lib.JS.isDefined(propertiesObj.value)){
            this.set('value', propertiesObj.value);
        }
        if(Lib.JS.isDefined(propertiesObj.regex)){
            this.set('regex', propertiesObj.regex);
        }
        if(Lib.JS.isDefined(propertiesObj.placeholder)){
            this.set('placeholder', propertiesObj.placeholder);
        }
        if(Lib.JS.isDefined(propertiesObj.errorMsg)){
            this.set('errorMsg', propertiesObj.errorMsg);
        }
        if(Lib.JS.isDefined(propertiesObj.required)){
            this.set('required', propertiesObj.required);
        }
        if(Lib.JS.isDefined(propertiesObj.id)){
            this.set('id', propertiesObj.id);
        }
        if(Lib.JS.isDefined(propertiesObj.class)){
            this.set('class', propertiesObj.class);
        }
    }

    handleClick(event) {
        var id = this.id;
        if (!Lib.JS.isDefined(id)) {
            id = '';
        }
        EventBroker.trigger(id + "_mrp-text-area_clicked", {textArea: this, event: event});
    }
    changed(event, a, b, c) {
        if (event === '') {
            return false;
        }

        if (event.type === "blur") {
            var text = $(event.target).val();
            this.set('text', text);
            var validation = this.checkValidation(this.get('validation'), true, text);
        }
        var id = this.id;
        if (!Lib.JS.isDefined(id)) {
            id = '';
        }

        var strClass = this.class;
        if (!Lib.JS.isDefined(strClass)) {
            strClass = '';
        }

        var tableRow = this.get('tableRow');

        var textArea = $(this)[0].shadowRoot.querySelector('textarea');

        if (id === '' && strClass === '') {
            EventBroker.trigger(id + "_mrp-text-area_changed", {UITextArea: this, textArea: textArea, validation: validation, event: event, tableRow: tableRow});
        } else {
            if (id !== '') {
                EventBroker.trigger(id + "_mrp-text-area_changed", {UITextArea: this, textArea: textArea, validation: validation, event: event, tableRow: tableRow});
            }
            if (strClass !== '') {
                EventBroker.trigger(strClass + "_mrp-text-area_changed", {UITextArea: this, textArea: textArea, validation: validation, event: event, tableRow: tableRow});
            }
        }
    }
    validationReset(validation) {
        if (validation === 2) {
            this.checkValidation(validation, true);
        }
    }
    checkValidation(validation, isNotStart = false, text) {
        if (isNotStart || validation !== -1) {
            if (this.get('regex') !== '') {
                var res = text.match(this.get('regex'));
                if (res === null) {
                    //validation failed
                    //display error message
                    this.set('validation', 0);
                } else {
                    this.set('validation', 1);
                }
            } else {
                this.set('validation', 1);
            }
        }
        if (!this.get('required') && text === '') {
            this.set('validation', 1);
        }
        return this.get('validation');
    }
}
customElements.define(MRPTextArea.is, MRPTextArea);