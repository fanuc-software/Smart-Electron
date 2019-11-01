import { Component, OnInit } from '@angular/core';
import { MainData } from './home-data';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-zrender',
  templateUrl: './home-zrender.component.html',
  styleUrls: ['./home-zrender.component.scss']
})
export class HomeZrenderComponent implements OnInit {
  mainZrender: any;
  constructor(private titleSet: Title, private routeInfo: ActivatedRoute) {
    const title = this.routeInfo.snapshot.params['name'];
    this.titleSet.setTitle(title);
  }

  ngOnInit() {
    this.mainZrender = zrender.init(document.getElementById('main-zrender'), {
      renderer: 'canvas',
      style: {
        fill: 'red'
      }
    });

    this.start();

  }
  clear() {
    this.mainZrender.clear();

  }
  start() {
    console.log('start');
    this.mainZrender.add(this.getPolyline());

  }

  getPolyline() {
    const arr = [];
    MainData.forEach(d => {
      arr.push([parseInt(d.X), parseInt(d.Y)]);
    });



    const temp = new zrender.Polyline({
      draggable: true,
      shape: {
        points: arr
      }
    });
    temp.on('mousewheel', (ev) => {
      var e = (ev || event).wheelDelta / 5;
      temp.attr({
        scale: [temp.scale[0] += e, temp.scale[1] += e],
        origin: [ev.offsetX, ev.offsetY]
      });
      //  console.log(ev);
      // // //设置缩放大小
      // temp.attr('scale', [temp.scale[0] += e, temp.scale[1] += e]);
      // //设置缩放中心
      // temp.attr('origin', [temp.style.x + temp.style.width / 2, temp.style.y + temp.style.height / 2]);
    });
    return temp;
  }


}
