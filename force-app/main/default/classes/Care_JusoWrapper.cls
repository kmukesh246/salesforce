/******************************************************************************
* wrapper class to wrap the juso response to Json format
* @Author: Mukesh 
* @Date: Nov-2019
* @JIRA: CARE-645,655
******************************************************************************/

public class Care_JusoWrapper {
    
    public results results;
    
    public class results {
        
        @AuraEnabled public common common;
        @AuraEnabled public List<juso> juso;
    
    }
    public class common {
        
        @AuraEnabled public String errorMessage{get;set;}
        @AuraEnabled public String countPerPage{get;set;}
        @AuraEnabled public String totalCount{get;set;}
        @AuraEnabled public String errorCode{get;set;}
        @AuraEnabled public String currentPage{get;set;}
        
    }            
    public class juso {
        
        @AuraEnabled public String detBdNmList{get;set;}
        @AuraEnabled public String engAddr{get;set;}
        @AuraEnabled public String rn{get;set;}        
        @AuraEnabled public String emdNm{get;set;}
        @AuraEnabled public String zipNo{get;set;}
        @AuraEnabled public String roadAddrPart2{get;set;}        
        @AuraEnabled public String emdNo{get;set;}
        @AuraEnabled public String sggNm{get;set;}
        @AuraEnabled public String jibunAddr{get;set;}        
        @AuraEnabled public String siNm{get;set;}
        @AuraEnabled public String roadAddrPart1{get;set;}
        @AuraEnabled public String bdNm{get;set;}        
        @AuraEnabled public String admCd{get;set;}
        @AuraEnabled public String udrtYn{get;set;}
        @AuraEnabled public String lnbrMnnm{get;set;}        
        @AuraEnabled public String roadAddr{get;set;}
        @AuraEnabled public String lnbrSlno{get;set;}
        @AuraEnabled public String buldMnnm{get;set;}        
        @AuraEnabled public String bdKdcd{get;set;}
        @AuraEnabled public String liNm{get;set;}
        @AuraEnabled public String rnMgtSn{get;set;}
        @AuraEnabled public String mtYn{get;set;}
        @AuraEnabled public String bdMgtSn{get;set;}
        @AuraEnabled public String buldSlno{get;set;}

    }
    
    public static Care_JusoWrapper parse(String json) {
        return (Care_JusoWrapper) System.JSON.deserialize(json, Care_JusoWrapper.class);
    }

}