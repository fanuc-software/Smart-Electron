import { Component, OnInit } from '@angular/core';
import { MainZrenderFactory } from './zrenders/home.zrender';
import { BaseAssetsNode } from './zrenders/zrender-Factory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseAssetsNode implements OnInit {
  mainZrender: MainZrenderFactory;
  imagePath = ['green', 'gray', 'red'];
  index = 0;
  loadPath = '';
  constructor() {
    super();
  }

  ngOnInit() {
    this.mainZrender = new MainZrenderFactory(document.getElementById('main'));

    this.mainZrender.build();
    this.loadPath = this.getImageSrc();
    setInterval(() => this.loadPath = this.getImageSrc(), 1500);
  }
  getImageSrc() {
    const name = this.imagePath[this.index];
    this.index++;
    this.index = this.index % 3;
    return `${this.basePath}/images/${name}.gif`;
  }
}
