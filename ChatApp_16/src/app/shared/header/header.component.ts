import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ListService } from 'src/app/core/services/listServices/list.service';
import { UserDataModel } from 'src/app/model/user.model';
import { setProfileModal } from 'src/app/store/commonData/commonData.action';
import { setUserData } from 'src/app/store/userData/userData.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit {

  userData: UserDataModel = {} as UserDataModel
  constructor(private listService: ListService, @Inject(PLATFORM_ID) private platformId: Object, private store: Store, private router:Router,private cdr: ChangeDetectorRef,) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isLoggedIn()) {
        setTimeout(() => {
          this.listService.getClientDetails().subscribe((res) => {
            if (res.status === 200) {              
              this.userData = res.data
              this.store.dispatch(setUserData({ userData: res.data }));
            } else {
              localStorage.removeItem('token');
              this.router.navigate(['/login']);
            }
            this.cdr.detectChanges(); 
          });
        },500);
      }
    }

    
  }

  handleLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.store.dispatch(setUserData({ userData: {} as UserDataModel }));
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn = () => {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') ? true : false
    }
    return false
  }


  ngAfterViewInit(): void {
    // this.isLoggedIn()
  }

  gotoProfile() {
    if (isPlatformBrowser(this.platformId)) {
      if(localStorage.getItem('token'))
      {
        this.store.dispatch(setProfileModal({profileModal:true}))
      }
      else
      {
        this.router.navigate(['/login'])
      }
    }
  }

}
