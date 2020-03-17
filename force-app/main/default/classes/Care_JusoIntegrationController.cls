/******************************************************************************
* Class handles all logic pertaining to Juso address validation functionality
* @Author: Mukesh 
* @Date: Nov-2019
* @JIRA: CARE-645,655
******************************************************************************/
public class Care_JusoIntegrationController {
    
    /*********************************************************************************
    Method Name    : getAddress
    Description    : Making a call to Juso system from salesforce for address validation.
    Return Type    : String 
    Parameter      : String addressLine1, String addressLine2,String cityOrTown,String stateRegion, String zipCode
    *********************************************************************************/    
    @AuraEnabled(cacheable=true)
    public static String getAddress(String addressLine1, String addressLine2,String cityOrTown,String stateRegion, String zipCode){
        
        //forming search String
        String searchString ='';
        if(String.isNotBlank(addressLine1))
        {
            searchString = addressLine1;
        }
        if(String.isNotBlank(addressLine2))
        {
            searchString = searchString+' '+addressLine2;
        }
        if(String.isNotBlank (cityOrTown))
        {
            searchString = searchString+' '+cityOrTown;
        }
        if(String.isNotBlank(stateRegion))
        {
            searchString = searchString+' '+stateRegion;
        }
        
        //Querying Juso integration credentials from Integration Framework Custom metadata		
        //CSS_IntegrationCredential__mdt jusoIntegCredential = Care_IntegrationUtility.getIntegrationCredtls().get('Care_Juso_Integration_Credential');
        
        //Initializing the HttpRequest object.
        HttpRequest req = new HttpRequest(); 
        
        //Current page number
        String currentPage = '1';
        //Number of result rows to output per page
        String countPerPage = '5';
        //Set search result format (xml, json)
        String resultType = 'json';        
        //Authorization key issued at the time of application
        String confmKey = 'devU01TX0FVVEgyMDE5MTAzMDEwMjMzOTEwOTE1MTU=';
        //Address query
        String keyword = searchString.trim(); 
        system.debug('keyword is '+keyword);
        //Error Message
        String errorMessage = '';
        
        String apiUrl = 'http://www.juso.go.kr/addrlink/addrLinkApi.do?';
        apiUrl+= 'currentPage='+ currentPage;
        apiUrl+= '&countPerPage=' + countPerPage;
        apiUrl+= '&keyword=' + EncodingUtil.urlEncode(keyword,'UTF-8');
        apiUrl+= '&confmKey=' + confmKey;
        apiUrl+= '&resultType=' + resultType;
        
        String responseString = '';
        String addressString = '';
        final String GET_ADDRESS_MTHD = 'getAddress';
        //Utilizing Care Integration Framework to create HTTP Request
        
        req.setEndpoint(apiUrl);
        req.setMethod('GET');      
        List<Care_JusoWrapper.juso> jusoResponseAddresses = new List<Care_JusoWrapper.juso>();
        try {
            
            HttpResponse response = new HttpResponse();            
            Http oHttp = new Http();        
            // Send the request to get the response
            response = oHttp.Send(req);

            if (response.getStatusCode() == 200 ) {
                Care_JusoWrapper jsonApex = Care_JusoWrapper.parse(response.getbody());
                String errorCode =  jsonApex.results.common.errorCode;              
                System.debug('the errorCode'+errorCode);
                System.debug('jsonApex'+jsonApex);
                if ( errorCode == '0' )
                {
                    for(Care_JusoWrapper.juso addressValues : jsonApex.results.juso)
                    {
                        jusoResponseAddresses.add(addressValues);
                    }
                }
                else
                {
                    //used for error logging
                                        
                }                                                
                
            } 
            else {
                
                //Logging an error                                
                
            }
            
            addressString = System.JSON.serialize(jusoResponseAddresses);
            system.debug('here is the return string '+addressString);
            return addressString;
            
        } 
        catch(Exception e) {
            system.debug('Error line '+e.getLineNumber()+'messgae'+e.getMessage());
            //Logging an error with errorMessage                        
            throw new AuraHandledException('Care_ConstantsUtils.SYS_ADMIN_ERROR');
            
        }
    }
    
    /*********************************************************************************
    Method Name    : saveAddress
    Description    : Method to insert a address which customer selected from User Interface.
    Return Type    : void 
    Parameter      : String addressLine1, String addressLine2,String cityOrTown, String stateRegion,String zipCode,String contactId
    ********************************************************************************
    
    @AuraEnabled
    public static void saveAddress(String addressLine1, String addressLine2,String cityOrTown, String stateRegion,String zipCode,String contactId){
        final String SAVE_ADDRESS = 'saveAddress';
        List<CSS_Address__c> addressList = new List<CSS_Address__c>();
        try{
            
            //Instantiating the address object
            CSS_Address__c oAddress = new CSS_Address__c();
            
            if(String.isNotBlank(addressLine1))
            {
                oAddress.CSS_AddressLine1__c = addressLine1.trim();
            }
            if(String.isNotBlank(addressLine2))
            {
                oAddress.CSS_AddressLine2__c = addressLine2.trim();
            }
            if(String.isNotBlank(cityOrTown))
            {
                oAddress.CSS_TownCity__c = cityOrTown.trim();
            }
            if(String.isNotBlank(stateRegion))
            {
                oAddress.CSS_CountyStateRegion__c = stateRegion.trim();
            }
            if(String.isNotBlank(zipCode))
            {
                oAddress.CSS_PostalCode__c = zipCode.trim();
            }
            
            oAddress.CSS_Contact__c = contactId.trim();
            
            //adding object instantiate to the list
            addressList.add(oAddress);
            
            if(!addressList.isEmpty())
            {
                insert addressList;
            }
            
        }
        catch(Exception e){
            //Logging an error
            Care_ExceptionLogController cr = new Care_ExceptionLogController(SAVE_ADDRESS,Care_JusoIntegrationController.class.getName(),'Error Occurd'+e.getLineNumber()+'	Message'+e.getMessage(),
                                                                             System.Today(),UserInfo.getUserId());
            Care_ExceptionLogController.createLog(cr);
            
            throw new AuraHandledException(Care_ConstantsUtils.SYS_ADMIN_ERROR);
            
        }        
    }*/ 
    
}