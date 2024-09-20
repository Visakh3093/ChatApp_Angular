import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectChatBox } from 'src/app/store/commonData/commonData.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isChatbox:boolean = false
  constructor(private store:Store){}

  ngOnInit(): void {
    this.store.select(selectChatBox).subscribe((res)=>{
      this.isChatbox = res
    }) 
  }

}
