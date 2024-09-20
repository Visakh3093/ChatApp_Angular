import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { ListService } from 'src/app/core/services/listServices/list.service';
import { setToastMessage } from 'src/app/store/commonData/commonData.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorObj: { [key: string]: string } = {}
  emailRegex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  constructor(private router: Router, private listService: ListService, @Inject(PLATFORM_ID) private platformId: Object,private store:Store) { }

  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl('', [Validators.required])
  })

  handleValidate() {
    this.errorObj = {}
    Object.keys(this.formData.value).map((item) => {
      if (this.formData.get(item)?.errors?.['required']) {
        this.errorObj[item] = item + " is required"
      }
      if (this.formData.get(item)?.errors?.['pattern']) {
        this.errorObj[item] = "invalid " + item
      }
    })

    return this.errorObj
  }

  handleLogin() {
    this.handleValidate()
    if(isEmpty(this.errorObj))
    {
        this.listService.userLogin(this.formData.value).subscribe((res:any)=>{
          if (res.status == 200) {
            isPlatformBrowser(this.platformId) ? localStorage.setItem('token', res.token) : '';
            this.store.dispatch(setToastMessage({toast:{toastMessage:'Login Successful'}}))
            this.router.navigate(['/'])
          }
        })
    }
  }
}
