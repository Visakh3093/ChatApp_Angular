import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounce } from 'lodash';
import { commonClass } from 'src/app/common/common';
import { ListService } from 'src/app/core/services/listServices/list.service';
import { SearchObjectModel } from 'src/app/model/common.model';
import { setChats, setSelectedChat } from 'src/app/store/chatData/chatData.action';
import { selectChats } from 'src/app/store/chatData/chatData.selector';
import { setGroupModal, setToastMessage } from 'src/app/store/commonData/commonData.action';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css']
})
export class GroupModalComponent implements OnInit {

  users: SearchObjectModel[] = []
  userList: SearchObjectModel[] = []
  userName:string = ""
  groupName:string = ""
  constructor(private store: Store, private listService: ListService, private commonClass: commonClass) {
    this.debouncedHandleSubmit = debounce(this.handleSubmit.bind(this), 300);
  }

  ngOnInit(): void {

  }

  handleModalClose = () => {
    this.store.dispatch(setGroupModal({ groupModal: false }))
  }

  debouncedHandleSubmit: (value: string) => void;

  onInputChange(event: any) {
    this.debouncedHandleSubmit(event.target.value); ``
  }

  handleSubmit(value: string) {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      this.listService.searchUser(value).subscribe((res) => {
        this.users = res;
      });
    }
    if (value == "") this.users = []
  }

  manageUsers(user: SearchObjectModel) {

    const userExists = this.userList.some((u) => u._id === user._id);
    
    if (!userExists) {
      this.userList.push(user);
      
    } else {
      this.commonClass.toastFunction("User already selected","info")
    }
    this.users = [];
    this.userName = "";
  }
  removeUserList(user: SearchObjectModel) {
    if(this.userList.find((u)=>u._id === user._id))
    {
      this.userList = this.userList.filter((u)=>u._id !== user._id)
    }
  }  

  handleCreateGroup =()=>{
    let chats:any;
    this.store.select(selectChats).subscribe((res)=>{
      chats = res
    })

  

    this.listService.createGroup(
      {
        name: this.groupName,
        users: JSON.stringify(this.userList.map((u)=>u._id))
      }
    ).subscribe((res)=>{
      this.store.dispatch(setToastMessage({toast:{toastMessage:res.message,type:"success"}}))
      this.store.dispatch(setChats({chats:[res.data,...chats]}))
      this.store.dispatch(setSelectedChat({selectedChat:res.data}))
      
      this.store.dispatch(setGroupModal({groupModal:false}))
    })
  }

}
