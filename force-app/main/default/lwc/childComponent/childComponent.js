import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {

    @api message;
    
    @api
    childComp(name){
        this.message = name;

    }
    handleClick(){
        const event = new CustomEvent('btnclick', {
            detail: {  
                key : '1234509876',
                value : 'Salesforce Id'
            }
        });
        this.dispatchEvent(event);
    }
}