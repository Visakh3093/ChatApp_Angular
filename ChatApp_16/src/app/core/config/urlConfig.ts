import { Injectable } from "@angular/core"


@Injectable({
    providedIn: 'root'
})

export class UrlConfig {
    
    constructor(){}

    urlEndPoints ={
        login:'/api/auth/loginUser',
        register:'/api/auth/createUser',
        clientProfile:'/api/user/clientProfile',
        searchProfile: (text:string)=>`/api/user?search=${text}`,
        accessChat:'/api/chat',
        fetchChat:'/api/chat',
        createGroup:'/api/chat/group'
    }
}