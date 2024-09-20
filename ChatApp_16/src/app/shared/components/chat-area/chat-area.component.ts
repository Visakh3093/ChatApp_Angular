import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from 'src/app/core/services/socketService/socket.service';
import { SelectedDataModel, UsersModel } from 'src/app/model/chat.model';
import { UserDataModel } from 'src/app/model/user.model';
import { setSelectedChat } from 'src/app/store/chatData/chatData.action';
import { selectSelectedChat } from 'src/app/store/chatData/chatData.selector';
import { setChatBox, setSelectedUserModal } from 'src/app/store/commonData/commonData.action';
import { selectUserData } from 'src/app/store/userData/userData.selector';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {
  
  chatMessage:string = ""
  selectedChat:SelectedDataModel = new Object() as SelectedDataModel
  loggedUser:UserDataModel= new Object() as UserDataModel
  constructor(private socketService:SocketService, private store:Store) {}

  ngOnInit(): void {
      this.store.select(selectSelectedChat).subscribe((res)=>{
        this.selectedChat = res
        console.log('this.selectedChat: ', this.selectedChat);
      })

      this.store.select(selectUserData).subscribe((res)=>{
        this.loggedUser = res
      })
  }

  handleSubmit = ()=>{
    if(this.chatMessage && this.chatMessage.trim() !== "")
    {
      this.socketService.sendMessage(this.chatMessage);
      this.chatMessage = "";
    }
  }

  getSender(users:UsersModel[])
  {
    if(users && users.length>0)
    {
      return users[0]._id == this.loggedUser._id ? users[1].name : users[0].name
    }
    // return users && users[0]._id == this.loggedUser._id ? users[1].name : users[0].name;
    return '';
  }



  goBack():void{
    this.store.dispatch(setSelectedChat({selectedChat: new Object() as SelectedDataModel}))
    this.store.dispatch(setChatBox({chatBox:false}))
  }

  getUserProfile(){
      this.store.dispatch(setSelectedUserModal({selectedUserModal:true}))
      
  }

}
