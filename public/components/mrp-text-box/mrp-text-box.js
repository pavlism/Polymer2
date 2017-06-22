class MRPTextBox extends Polymer.Element {
    static get is() {
        return  'mrp-text-box';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},
            maxlength: {type: Number, value: -1},
            value: {type: String, value: '', observer: 'changed'},
            regex: {type: String, value: ''},
            placeholder: {type: String, value: ''},
            validation: {type: Number, value: -1, reflectToAttribute: true, observer: 'validationReset'},
            errorMsg: {type: String, value: ''},
            required: {type:Boolean, value:false}
        };
    }
    isInvalid(validation) {
        if (validation === 0) {
            return true;
        } else {
            return false;
        }
    }
    changed(event, a, b, c) {
        if (event.type === "blur") {
            this.checkValidation(this.get('validation'), true);
            var triggerObj = {textBox: this, event: event, text:this.get('value')};
            Lib.Polymer.triggerEventsWithoutTable(this,triggerObj, 'mrp-text-box_changed');
        }
    }
    validationReset(validation){
        if(validation ===2){
            this.checkValidation(validation, true);
        }
    }
    checkValidation(validation, isNotStart = false) {
        if (isNotStart || validation !== -1) {
            if (this.get('regex') !== '') {
                var text = $(this).val();
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
        if(!this.get('required') && $(this).val()===''){
            this.set('validation', 1);
        }
    }
}
customElements.define(MRPTextBox.is, MRPTextBox);