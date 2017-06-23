/* V0.1
 * 
 * This is a simple drop-down menu that uses a list as it's options.  IT also keep the value and index properties equal to the currently selected option.
 * 
 */

class MRPDropDown extends Polymer.Element {
    static get is() {
        return  'mrp-drop-down';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},                                      //The ID of the element
            class: {type: String, value: ''},                                   //The class of the element
            list: {type: Array, observer: 'listChange', value: function () {
                    return [];
                }},                                                             //The array that holds all the list options
            value: {type: String, reflectToAttribute: true, value: ''},         //The current value, can be set to a value (case sensitive) to change the default selected option
            index: {type: Number, reflectToAttribute: true, value: -1}          //The current index, can be set to an index (starts at 0) to change the default selected option
        };
    }
    listChange(currentList, pastList) {        
        if (Lib.JS.isDefined(pastList)) {
            //If the list changed, reset the value and index properties
            
            var value = this.get('value');
            var index = this.get('index');
            var list = this.get('list');
            var newIndex = -1;
            
            if(value !== ''){
                newIndex = list.indexOf(value);
            }else if(index !== -1){
                newIndex = index;
            }else{
                newIndex = 0;
            }

            this.set('value', list[newIndex]);
            this.set('index', newIndex);
        }
    }
    handleChange(event) {
        //If the selected option changed then update the index and value properties and trigger the changed event.
        var currentValue = $(event.target).val();
        var pastValue = this.get('value');
        var pastIndex = this.get('index');
        var list = this.get('list');
        var currentIndex = list.indexOf(currentValue);

        if (currentValue !== pastValue || currentIndex !== pastIndex) {
            this.set('value', currentValue);
            this.set('index', currentIndex);
            var triggerObj = {textBox: this, event: event, value: currentValue, index: currentIndex};
            Lib.Polymer.triggerEvents(this, triggerObj, 'mrp-drop-down_changed');
        }
    }
    isSelected(itemValue, currentIndex) {
        //This function is used to determine which option in the <select> list will be selected.
        var value = this.get('value');
        var index = this.get('index');

        if (index === -1 && value === '' && currentIndex === 0) {
            //if a default value/index has not been selected then the first first value is selected.
            return true;
        } else if (value !== '' && value === itemValue) {
            //If the value is set then the correct value is the selected value
            return true;
        } else if (index !== -1 && index === currentIndex) {
            //If the index is set and the current index matches this index then this item is selected
            return true;
        } else {
            return false;
        }
    }
}
customElements.define(MRPDropDown.is, MRPDropDown);