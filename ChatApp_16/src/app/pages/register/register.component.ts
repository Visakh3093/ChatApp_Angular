import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { ListService } from 'src/app/core/services/listServices/list.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailRegex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  errorObj: { [key: string]: string } = {}

  constructor(private listService:ListService,private router:Router) { }

  ngOnInit(): void {
    
  }

  formData = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    mobile:new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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

  handleSignUp()
  {
    this.handleValidate()
    if(isEmpty(this.errorObj))
      {
        this.listService.userRegister(this.formData.value).subscribe((res)=>{
          if(res.status == 200)
            {
              this.router.navigate(['/login'])
            }
        })
      }
  }
}
