import { Component, OnInit } from '@angular/core';
import { MainZrenderFactory } from './zrenders/home.zrender';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mainZrender: MainZrenderFactory;
  constructor() {
  }

  ngOnInit() {
    this.mainZrender = new MainZrenderFactory(document.getElementById('main'));

    this.mainZrender.build();
  }

}
