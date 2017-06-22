class MRPSubmitButton extends Polymer.Element {
    static get is() {
        return  'mrp-submit-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},
            primary: {type: Boolean, value: false},
            success: {type: Boolean, value: false},
            info: {type: Boolean, value: false},
            warning: {type: Boolean, value: false},
            danger: {type: Boolean, value: false},
            large: {type: Boolean, value: false},
            small: {type: Boolean, value: false},
            mini: {type: Boolean, value: false}
        };
    }
    handleClick(event) {
        var isPass = true;
        

        $('mrp-text-box').each(function () {
            var validation = $(this).prop('validation');
            if(validation ===-1){
                $(this).prop('validation', 2);
                validation = $(this).prop('validation');
            }
            
            if(validation===2){
                console.error('the validation should never be 2, the 2 is a flag to make is re-validate itself, if this error starts appearnig a timmer is going to be needed');
            }
            
            if(validation===1){
                isPass = isPass && true;
            }else{
                isPass = false;
            }
        })
        
        if(!isPass){
            console.log('validation failed');
            return false;
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
        
        var triggerObj = {button: this, event: event};
        
        if(tableRow !==''){
            triggerObj.tableRow = tableRow;
        }

        if (id === '' && strClass === '') {
            EventBroker.trigger("mrp-submit-button_passed", triggerObj);
        } else {
            if (id !== '') {
                EventBroker.trigger(id + "_mrp-submit-button_passed", triggerObj);
            }
            if (strClass !== '') {
                EventBroker.trigger(strClass + "_mrp-submit-button_passed", triggerObj);
            }
        }
        
        
    }

}
customElements.define(MRPSubmitButton.is, MRPSubmitButton);