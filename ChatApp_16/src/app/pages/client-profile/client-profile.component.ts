import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserDataModel } from 'src/app/model/user.model';
import { setProfileModal } from 'src/app/store/commonData/commonData.action';
import { selectUserData } from 'src/app/store/userData/userData.selector';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  profileData:UserDataModel = new Object() as UserDataModel

  constructor(private store: Store, private router:Router,@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId))
    {
      if(!localStorage.getItem('token'))
      {
        this.router.navigate(['/login'])
      }
    }

    this.store.select(selectUserData).subscribe((res)=>{
      this.profileData = res
    })
  }

  modalClose = () => {
    this.store.dispatch(setProfileModal({ profileModal: false }));
  }

}
