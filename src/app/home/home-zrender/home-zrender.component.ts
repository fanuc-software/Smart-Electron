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
  lineAnimate: any;
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
    const point = new zrender.Circle({
      shape: {
        cx: 10,
        cy: 10,
        r: 4
      }, style: {
        fill: 'red'
      }
    });
    this.lineAnimate = point.animate('shape', false);
    this.mainZrender.add(this.getPolyline());

    this.mainZrender.add(point);
    // this.lineAnimate = this.lineAnimate.when(2000, { cx: 100, cy: 100 });
    // this.lineAnimate.when(3000, { cx: 30, cy: 30 });
    this.lineAnimate.start();
  }

  getPolyline() {
    const arr = [];
    let start = 10;
    MainData.forEach(d => {
      arr.push([parseInt(d.X), parseInt(d.Y)]);
      this.lineAnimate = this.lineAnimate.when(start += 10, { cx: parseInt(d.X), cy: parseInt(d.Y) });
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
