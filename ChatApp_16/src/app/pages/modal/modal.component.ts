import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounce } from 'lodash';
import { commonClass } from 'src/app/common/common';
import { ListService } from 'src/app/core/services/listServices/list.service';
import {  SearchObjectModel } from 'src/app/model/common.model';
import { setChats, setSelectedChat } from 'src/app/store/chatData/chatData.action';
import { selectChats, selectSelectedChat } from 'src/app/store/chatData/chatData.selector';
import { setChatBox, setModal } from 'src/app/store/commonData/commonData.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  users:SearchObjectModel[] = []
  chats:any[] = []
  constructor(private store:Store, private listService:ListService,private commonClass:commonClass) {
    this.debouncedHandleSubmit = debounce(this.handleSubmit.bind(this), 300);
  }

  ngOnInit(): void {
      this.store.select(selectChats).subscribe((res)=>{
          this.chats = res
      })
  }

  handleModalClose = ()=>{
    this.store.dispatch(setModal({modal:false}))
  }



  handleSubmit(value: string) {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      this.listService.searchUser(value).subscribe((res) => {
        this.users = res;
      });
    } 
    if(value =="") this.users = []
  }

  debouncedHandleSubmit: (value: string) => void;

  onInputChange(event: any) {
    this.debouncedHandleSubmit(event.target.value);``
  }

  accessChat = (id:string)=>{
    this.listService.accessChat({userId:id}).subscribe((res)=>{

      if(res.status == 200)
      {

        if(!this.chats.find((c)=>c._id == res.data._id))
        {          
          this.store.dispatch(setChats({chats:[res.data,...this.chats]}))
        }
        this.store.dispatch(setSelectedChat({selectedChat:res.data}))
        this.store.dispatch(setChatBox({chatBox:true}))
        this.store.dispatch(setModal({modal:false}))
        this.commonClass.toastFunction(res.message)
      }
      else
      {
        this.commonClass.toastFunction(res.message,'danger')
      }
      
    })
  }

}
