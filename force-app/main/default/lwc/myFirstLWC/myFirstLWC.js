import { LightningElement, api, track } from 'lwc';
import Id from '@salesforce/user/Id';
export default class MyFirstLWC extends LightningElement {

    @api name = 'Mukesh';
    @track email = 'Kmukesh246@gmail.com';
    phone = '8754396115';
    userId = Id;
    handleClick(){

        /*eslint-disable no-console */
        console.log('I am inside the javascript file');
        this.name = 'Mukesh kandasamy';
        this.email = 'mukesh.kandasamy@mindtree.com';

    }

}