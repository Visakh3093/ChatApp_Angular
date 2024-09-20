import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { NgToastService } from "ng-angular-popup";

@Injectable({ providedIn: 'root' })

export class commonClass {

    constructor(private store:Store,private toast:NgToastService){}

    public toastFunction = (message:string,type:string = '')=>{
        if(message){         
            switch(type){
                case 'danger':
                    this.toast.error({detail:"ERROR",summary:message,duration:3000});
                    break;

                case 'warning':
                    this.toast.warning({detail:"WARNING",summary:message,duration:3000});
                    break;

                case 'info':
                    this.toast.info({detail:"INFO",summary:message,duration:3000});
                    break;

                default:
                    this.toast.success({detail:"SUCCESS",summary:message,duration:3000});
                    break;
            }
            
        }
    }

}

