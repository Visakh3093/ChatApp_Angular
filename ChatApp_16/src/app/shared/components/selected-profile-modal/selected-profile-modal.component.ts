import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounce } from 'lodash';
import { commonClass } from 'src/app/common/common';
import { ListService } from 'src/app/core/services/listServices/list.service';
import { SelectedDataModel } from 'src/app/model/chat.model';
import { SearchObjectModel } from 'src/app/model/common.model';
import { UserDataModel } from 'src/app/model/user.model';
import { selectSelectedChat } from 'src/app/store/chatData/chatData.selector';
import { setSelectedUserModal } from 'src/app/store/commonData/commonData.action';
import { selectUserData } from 'src/app/store/userData/userData.selector';

@Component({
  selector: 'app-selected-profile-modal',
  templateUrl: './selected-profile-modal.component.html',
  styleUrls: ['./selected-profile-modal.component.css']
})
export class SelectedProfileModalComponent implements OnInit {
  
  errorObj:{[key:string]:string} = {}
  groupName:string = ''
  searchUser:string = ''
  users:SearchObjectModel[] = []
  userList: SearchObjectModel[] = []
  isLoading:boolean = false

  constructor(private store:Store, private listService:ListService, private commonClass:commonClass){
    this.debouncedHandleSubmit = debounce(this.handleSubmit.bind(this), 300);
  }

  selectedUser:SelectedDataModel = new Object() as SelectedDataModel
  currentUser:UserDataModel = new Object() as UserDataModel

  ngOnInit(): void {
    this.store.select(selectSelectedChat).subscribe((res:SelectedDataModel)=>{
        this.selectedUser = res
        this.groupName = res.isGroupChat ? res.chatName : ''
        res.users.forEach((user)=>{
          this.userList.push(user)
        })
    })  
    
    this.store.select(selectUserData).subscribe((res)=>{
      this.currentUser = res
    })
  }

  modalClose(){
    this.store.dispatch(setSelectedUserModal({selectedUserModal:false}))
  }

  debouncedHandleSubmit: (value: string) => void;

  onInputChange(event: any) {
    this.isLoading = true
    this.debouncedHandleSubmit(event.target.value); ``
  }

  manageUsers(user: SearchObjectModel) {

    const userExists = this.userList.some((u) => u._id === user._id);
    
    if (!userExists) {
      this.userList.push(user);
      // add user to group api call here
      
    } else {
      this.commonClass.toastFunction("User already In the group","info")
    }
    this.users = [];
    this.searchUser = "";
  }

  handleGroupNameChange(e:any){
    e.preventDefault()
    this.errorObj = {}
    if(this.groupName.trim() == "")
    {
      this.errorObj["groupName"] = "Please Enter Group Name" 
       
    }
    // return this.errorObj
  }

  handleSubmit(value: string) {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      this.listService.searchUser(value).subscribe((res) => {
        this.users = res;
        this.isLoading = false
      });
    }
    if (value == "") this.users = []
  }

  leaveGroup(){

  }

  removeUser(){
    
  }

}
