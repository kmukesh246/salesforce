import { LightningElement,wire,track,api} from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';
import getContacts from '@salesforce/apex/AccountController.getContacts';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CON_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CON_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CON_LAST_NAME from '@salesforce/schema/Contact.LastName';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountViewer extends LightningElement {

    /*
    ! The Below Piece of code is for Account data table
    */

    @api columns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'Name', fieldName: 'Name' },
        { label: 'Active', fieldName: 'Active__c' },       
    ];
    
    @track error;
    @track data ;
    @wire(findAccounts)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.data = data;
            /*eslint-disable no-console */
            console.log(data);
            console.log(JSON.stringify(data, null, '\t'));
        } else if (error) {
            this.error = error;
        }
    }

    /*
    ! The Below Piece of code is for Contact data table
    */
    /*eslint-disable no-console */
    @api ContactColumns = [
        { label: 'Id', fieldName: 'Id' },
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' }       
    ];
    @track contactData;
    @wire(getContacts)
    wiredContact({error,data}) {
        if(data)
        {
            this.contactData = data;
            this.error = undefined;
            console.log('contactData@@@ '+data);            
        }
        else if(error)
        {
            this.error = error;
            this.contactData = undefined;
            console.log('error occured'+error);
        }
    }

    /*
    ! The Below Piece of code is for Contact Create form
    */
   
   contactObject = CONTACT_OBJECT;
   contactFields = [CON_NAME_FIELD,CON_PHONE_FIELD,CON_LAST_NAME];
   
   handleContactCreated(){
       console.log('The Contact is created successfully');
   }

    accountObject = ACCOUNT_OBJECT;
    myFields = [NAME_FIELD, WEBSITE_FIELD,];

    handleAccountCreated(){
        // Run code when account is created.
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success!!',
            message: 'Account Created Successfully!!',
            variant: 'success'
        }),);
    }
    
}