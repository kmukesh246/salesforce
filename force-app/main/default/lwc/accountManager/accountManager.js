import { LightningElement,track } from 'lwc';
import { createRecord } from "lightning/uiRecordApi";
export default class AccountManager extends LightningElement {

    @track accountName;
    @track accountPhone;
    @track accountWebsite;

    
    accountNameChangeHandle(event){
        this.accountName = event.target.value;
    }
    accountPhoneChangeHandle(event){
        this.accountPhone = event.target.value;
    }
    accountWebsiteChangeHandle(event){
        this.accountWebsite = event.target.value;
    }

    insertAccount(){
        const fields = {'Name':this.accountName,'Phone':this.accountPhone,'Website':this.accountWebsite};
        const recordInput = {apiName : 'Account',fields};

        createRecord(recordInput).then(response => {
                
                // eslint-disable-next-line no-console
                console.log('Account has been created',response.id);
        }).catch(error =>{
                // eslint-disable-next-line no-console
                console.log('Error occured',error.body.message);
        });
        
    }
}