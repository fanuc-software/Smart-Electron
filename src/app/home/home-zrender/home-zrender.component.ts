import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-zrender',
  templateUrl: './home-zrender.component.html',
  styleUrls: ['./home-zrender.component.scss']
})
export class HomeZrenderComponent implements OnInit {
  mainZrender: any;
  offset = 2;
  cy = 300;
  cx = 300;
  constructor() { }

  ngOnInit() {
    this.mainZrender = zrender.init(document.getElementById('main-zrender'), {
      renderer: 'svg'
    });


    this.mainZrender.add(this.getGroup(315, 45));
    this.mainZrender.add(this.getGroup(45, 135));

    this.mainZrender.add(this.getGroup(135, 225));
    this.mainZrender.add(this.getGroup(225, 315));


  }

  getAngle(angule: number, pre: number) {

    return ((angule + (this.offset * pre)) / 360) * 2 * Math.PI;
  }

  getGroup(start: number, end: number) {
    const tempGroup = new zrender.Group();
    const rightSector = new zrender.Sector({
      shape: {
        cx: this.cx,
        cy: this.cy,
        r: 130,
        r0: 120,
        startAngle: this.getAngle(start, 1),
        endAngle: this.getAngle(end, -1),
      },
      style: {
        fill: 'black',

      }
    });
    const rightMinSector = new zrender.Sector({
      shape: {
        cx: this.cx,
        cy: this.cy,
        r: 120,
        r0: 50,
        startAngle: this.getAngle(start, 1),
        endAngle: this.getAngle(end, -1),
      },
      style: {
        fill: 'rgba(155,155,155)',
      }
    });

    const startX = 140 * Math.cos(this.getAngle(start-1, 1)) + this.cx;
    const startY = 140 * Math.sin(this.getAngle(start-1, 1)) + this.cy;
    const rect = new zrender.Line({
      shape: {
        x1: startX,
        y1: startY,
        x2: 48 * Math.cos(this.getAngle(start + 2, 1)) + this.cx,
        y2: 48 * Math.sin(this.getAngle(start + 2, 1)) + this.cy
      },
      style: {
        fill: 'white',
        stroke: 'white',
        lineWidth: 10
      }
    });

    tempGroup.add(rightSector);
    tempGroup.add(rightMinSector);
    tempGroup.add(rect);
    return tempGroup;
  }


}
