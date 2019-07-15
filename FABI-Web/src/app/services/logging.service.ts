import { HttpService } from '../services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

export class logging{

    constructor(private service: HttpService){}

    accessLog(type:String, statusCode:String, details:String, user:String, moreInfo: String){
        if(moreInfo == null){ moreInfo = ""; }
        this.service.LogAccess(type, statusCode, details, user, moreInfo).subscribe((response:any) => {
            if(response.success == true && response.code == 200) {
                // log successfully stored 
            } else if (response.success == false) {
                // log unsuccessful
            }    
            }, (err: HttpErrorResponse) => {  
                // error occured
                console.log("ERROR:" + err.message);
            });
    }

    errorLog(type:String, statusCode:String, details:String, user:String, moreInfo: String){
        if(moreInfo == null){ moreInfo = ""; }
        this.service.LogError(type, statusCode, details, user, moreInfo).subscribe((response:any) => {
            if(response.success == true && response.code == 200) {
                // log successfully stored 
            } else if (response.success == false) {
                // log unsuccessful
            }    
            }, (err: HttpErrorResponse) => {  
                // error occured
                console.log("ERROR:" + err.message);
            });
    }

    diagnosticClinicLog(type:String, user:String){
        this.service.LogDiagnosticClinic(type, user).subscribe((response:any) => {
            if(response.success == true && response.code == 200) {
                // log successfully stored 
            } else if (response.success == false) {
                // log unsuccessful
            }    
            }, (err: HttpErrorResponse) => {  
                // error occured
                console.log("ERROR:" + err.message);
            });
    }

    UserLog(type:String, statusCode:String, details:String, user:String, moreInfo: String){
        if(moreInfo == null){ moreInfo = ""; }
        this.service.LogUserCRUD(type, statusCode, details, user, moreInfo).subscribe((response:any) => {
            if(response.success == true && response.code == 200) {
                // log successfully stored 
            } else if (response.success == false) {
                // log unsuccessful
            }    
            }, (err: HttpErrorResponse) => {  
                // error occured
                console.log("ERROR:" + err.message);
            });
    }

    DatabaseLog(type:String, statusCode:String, details:String, user:String, moreInfo: String){
        if(moreInfo == null){ moreInfo = ""; }
        this.service.LogDatabaseCRUD(type, statusCode, details, user, moreInfo).subscribe((response:any) => {
            if(response.success == true && response.code == 200) {
                // log successfully stored 
            } else if (response.success == false) {
                // log unsuccessful
            }    
            }, (err: HttpErrorResponse) => {  
                // error occured
                console.log("ERROR:" + err.message);
            });
    }

}