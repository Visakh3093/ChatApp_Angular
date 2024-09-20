import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../apiService/api.service';
import { UrlConfig } from '../../config/urlConfig';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private apiService: ApiService, private urlConfig:UrlConfig) { }
  
  userLogin(data:any):Observable<any>{
    const url = `${environment.baseUrl}${this.urlConfig.urlEndPoints.login}`
    return this.apiService.networkRequest(url, 'post', data)
  }

  userRegister(data:any):Observable<any>{
    const url = `${environment.baseUrl}${this.urlConfig.urlEndPoints.register}`
    return this.apiService.networkRequest(url, 'post', data)
  }

  getClientDetails():Observable<any>{
    const url = `${environment.baseUrl}${this.urlConfig.urlEndPoints.clientProfile}`
    return this.apiService.networkRequest(url)
  }

  searchUser(data:string):Observable<any>{
    const url = `${environment.baseUrl}${this.urlConfig.urlEndPoints.searchProfile(data)}`
    return this.apiService.networkRequest(url)
  }

  accessChat(data:any):Observable<any>{
    const url = `${environment.baseUrl}${this.urlConfig.urlEndPoints.accessChat}`
    return this.apiService.networkRequest(url, 'post',data)
  }

  fetchChat():Observable<any>{
    const url = `${environment.baseUrl}${this.urlConfig.urlEndPoints.fetchChat}`
    return this.apiService.networkRequest(url)
  }

  createGroup(data:any):Observable<any>{
    const url = `${environment.baseUrl}${this.urlConfig.urlEndPoints.createGroup}`
    return this.apiService.networkRequest(url, 'post',data)
  }

}
