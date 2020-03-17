import { LightningElement,api} from 'lwc';

export default class ParentComponent extends LightningElement {

    @api message;
    //message = 'before change';
    handleClick(){
        this.message = 'This value has been changed';
        this.template.querySelector('c-child-component').childComp('This is Mukesh from Parent');
    }

    handleEvent(event)
    {
        let key = event.detail.key;
        let value = event.detail.value;
        this.message = key + ' '+value;
        window.console.log(' '+this.message);
    }
}