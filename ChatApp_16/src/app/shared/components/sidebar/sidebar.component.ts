import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounce, isEmpty } from 'lodash';
import { ListService } from 'src/app/core/services/listServices/list.service';
import { SelectedDataModel, UsersModel } from 'src/app/model/chat.model';
import { UserDataModel } from 'src/app/model/user.model';
import { setChats, setSelectedChat } from 'src/app/store/chatData/chatData.action';
import { selectChats, selectSelectedChat } from 'src/app/store/chatData/chatData.selector';
import { setGroupModal, setModal } from 'src/app/store/commonData/commonData.action';
import { selectUserData } from 'src/app/store/userData/userData.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  chats: SelectedDataModel[] = [];
  originalChats: SelectedDataModel[] = [];
  selectedChat: SelectedDataModel = new Object() as SelectedDataModel;
  loggedUser: UserDataModel = new Object() as UserDataModel;

  constructor(private store: Store, private listService: ListService, private cdr: ChangeDetectorRef) {
    this.debouncedHandleSubmit = debounce(this.handleSearch.bind(this), 300);
  }

  ngOnInit(): void {
    this.listService.fetchChat().subscribe((res) => {
      this.store.dispatch(setChats({ chats: res.data }));
      this.originalChats = res.data;
    });

    this.store.select(selectChats).subscribe((res) => {
      this.chats = res;
    });

    this.store.select(selectUserData).subscribe((res) => {
      this.loggedUser = res;
    });

    if (isEmpty(this.selectedChat)) {
      this.store.select(selectSelectedChat).subscribe((res) => {
        setTimeout(() => {
          if (!isEmpty(res)) {
            this.selectedChat = res;
          }
        }, 0);
      });
    }
  }

  debouncedHandleSubmit: (value: string) => void;

  inputChange(e: any) {
    this.debouncedHandleSubmit(e.target.value);
  }

  handleSearch(value: string) {
    const searchTerm = value.trim().toLowerCase();

    if (!searchTerm) {
      this.chats = this.originalChats;
      this.errorMessage = '';
      return;
    }

    const filteredChats = this.originalChats.filter(chat => {
      if (chat.isGroupChat) {
        return chat.chatName.toLowerCase().includes(searchTerm);
      } else {
        return chat.users.some(user => user.name.toLowerCase().includes(searchTerm));
      }
    });
    this.chats = filteredChats;
    

    if (filteredChats.length == 0) {
      this.errorMessage = 'No results found';
    }
    else {
    
      this.errorMessage = '';
    }

  }

  selectChat(chat: any) {
    this.store.dispatch(setSelectedChat({ selectedChat: chat }));
  }

  handleNewMessage = () => {
    this.store.dispatch(setModal({ modal: true }));
  }

  handleNewGroup = () => {
    this.store.dispatch(setGroupModal({ groupModal: true }));
  }

  getSender(users: UsersModel[]) {
    return users[0]._id == this.loggedUser._id ? users[1].name : users[0].name;
  }

  ngOnDestroy(): void {
  }
}
