import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { setLoaderData, setToastMessage } from 'src/app/store/commonData/commonData.action';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  totalRequests: number = 0;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,@Inject(DOCUMENT) private document: Document, private router:Router, private store:Store) {}

  public networkRequest(url: string, method: string = 'get', data: any = {}, headers: any = {}): Observable<any> {
    // this.store.dispatch(setLoaderData({loaderData: true}))
    this.totalRequests++;
    if(isPlatformBrowser(this.platformId))
      {
        const token = localStorage.getItem('token');
        if (token) {
          headers['Authorization'] = `${token}`;
        }
      }
    let httpOptions = {
      headers: new HttpHeaders(headers)
    };

    return this.http.request(method, url, {
      body: method.toLocaleLowerCase() === 'get' ? null : data,
      ...httpOptions
    }).pipe(
      map((res:any)=>{
        if(res.status !== 200)
        {
          this.store.dispatch(setToastMessage({toast: {  toastMessage: res.message,type: 'danger', } }));
        }
        return res
      }),
      catchError(error=>this.handleError(error)),
      finalize(()=>this.handleRequestComplete())
    )

  }

  private handleError(error: HttpErrorResponse) {
    if(error.status===401){
        localStorage.removeItem('token');
        this.store.dispatch(setToastMessage({toast:{toastMessage: 'Session expired. Please login again.', type: 'danger'}}));
        this.router.navigateByUrl('/login');
    }
    return throwError(error);
}



private handleRequestComplete() {
    this.totalRequests--;
    if (this.totalRequests == 0) {
      // setTimeout(()=>{
        this.store.dispatch(setLoaderData({loaderData: false}))
      // })
    }
} 
}
