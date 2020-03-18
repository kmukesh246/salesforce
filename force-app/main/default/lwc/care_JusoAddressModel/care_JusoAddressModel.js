/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
import { LightningElement,track,api,wire } from 'lwc';
// import server side apex class method 
import getAddress from '@salesforce/apex/Care_JusoIntegrationController.getAddress';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

const fields = [EMAIL_FIELD];

export default class Care_JusoAddressModel extends LightningElement {
    
    @api recordId;
    @track showSpinner = false;
    @track addressLine1;
    @track addressLine2;
    @track cityOrTown;
    @track stateRegion;
    @track zipCode;
    @track showResults;

    @wire(getRecord, { recordId: '$recordId', fields })
    contact;
    get country() {
        return getFieldValue(this.contact.data, EMAIL_FIELD);
    }
    handleFormInputChange(event){
        
        if( event.target.name === 'addressLine1Input' ){
            this.addressLine1 = event.target.value;
        }
        else if( event.target.name === 'addressLine2Input' ){
            this.addressLine2 = event.target.value;
        }
        else if( event.target.name === 'cityOrTownInput' ){
            this.cityOrTown= event.target.value;
        }
        else if( event.target.name === 'stateRegionInput' ){
            this.stateRegion = event.target.value;
        }
        else if( event.target.name === 'zipCodeInput' ){
            this.zipCode = event.target.value;
        }

    }

    handleValidateAddress(){

        this.showSpinner = true;
        /*eslint-disable no-console */
        console.log('im inside the handlevalidateaddress');
        getAddress({addressLine1 : this.addressLine1,
                            addressLine2 : this.addressLine2,
                            cityOrTown : this.cityOrTown,
                            stateRegion:this.stateRegion, 
                            zipCode:this.zipCode
        })
        .then(result => {
                                 
            var output = JSON.parse(result);

            console.log('this is responseObj'+output);            

            if(output.length >0 && output != null && output !== 'undefined')
                {                    
                    var addressList = [];
                    for(var i=0;i<output.length;i++)
                    {
                        var roadAddress = ( output[i].roadAddr.replace(output[i].sggNm,'')).replace(output[i].siNm,'');
                        addressList.push({label: output[i].roadAddr.toString()+' '+output[i].zipNo.toString(), 
                                          value: roadAddress+'@@@'+output[i].sggNm+'@@@'+output[i].siNm+'@@@'+output[i].zipNo+'@@@'+output[i].jibunAddr});
                    }                                        
                    console.log('this is roadAddress'+roadAddress);                                      
                   
                   this.showSpinner = false;
                   this.showResults = true;
                   this.options = addressList;

                }
                else{
                    this.showSpinner = false;
                    this.showErrorMessage = true;
                    this.errorMessage = 'Someting went wrong please contact system adminstrator';
                }
                

        })
        .catch(error => {
            console.log('In error block'+error);
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
                
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
            this.resultsResponse = null;
            
        });
    
    }
    closeModel(){
        console.log('Im in close model');
        window.reload();
    }   
}