import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { RouterOutlet } from '@angular/router';
// import { NgToastModule } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ModalComponent } from './pages/modal/modal.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChatAreaComponent } from './shared/components/chat-area/chat-area.component';
import { StoreModule } from '@ngrx/store';
import { userDataReducer } from './store/userData/userData.reducer';
import { commonReducer } from './store/commonData/commonData.reducer';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { chatReducer } from './store/chatData/chatData.reducer';
import { GroupModalComponent } from './pages/group-modal/group-modal.component';
import { SelectedProfileModalComponent } from './shared/components/selected-profile-modal/selected-profile-modal.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const config: SocketIoConfig = {
  url: 'http://localhost:5000', options: {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientProfileComponent,
    SidebarComponent,
    ModalComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    ChatAreaComponent,
    LoginComponent,
    RegisterComponent,
    GroupModalComponent,
    SelectedProfileModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    CommonModule,
    RouterOutlet,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      userData: userDataReducer,
      common: commonReducer,
      chatData: chatReducer
    }),
    HttpClientModule
  ],
  providers: [ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
