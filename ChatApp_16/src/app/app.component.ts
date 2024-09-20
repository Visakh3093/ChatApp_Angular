import { Component, OnInit } from '@angular/core';
import { SocketService } from './core/services/socketService/socket.service';
import { Store } from '@ngrx/store';
import { setChatBox, setLoaderData } from './store/commonData/commonData.action';
import { selectGroupModal, selectLoaderData, selectModal, selectProfileModal, selectSelectedUserModal, selectToastMessage } from './store/commonData/commonData.selector';
import { NgToastService } from 'ng-angular-popup';
import { commonClass } from './common/common';
import { selectSelectedChat } from './store/chatData/chatData.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChatApp_16';
  loader:boolean = false
  modal:boolean = false
  profileModal:boolean = false
  groupModal:boolean = false
  selectedUserModal:boolean = false
  constructor(private store:Store,private toast: NgToastService, private commonClass: commonClass) {}

  ngOnInit(): void {
    this.store.select(selectLoaderData).subscribe((res)=>{
      this.loader = res
    })

    this.store.select(selectModal).subscribe((res)=>{
      this.modal = res
    })

    this.store.select(selectToastMessage).subscribe((res)=>{
      if(res.toastMessage != '') this.commonClass.toastFunction(res.toastMessage,res.type)
    })

    this.store.select(selectProfileModal).subscribe((res)=>{
        this.profileModal = res
    })

    this.store.select(selectGroupModal).subscribe((res)=>{
      this.groupModal = res
    })

    this.store.select(selectSelectedChat).subscribe((res)=>{
      if(res) this.store.dispatch(setChatBox({chatBox:true}))
    })

    this.store.select(selectSelectedUserModal).subscribe((res)=>{
        this.selectedUserModal = res
    })


  }
  
  // ToasterPosition = ToasterPosition;

  
}
