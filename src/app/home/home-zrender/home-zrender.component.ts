import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-zrender',
  templateUrl: './home-zrender.component.html',
  styleUrls: ['./home-zrender.component.scss']
})
export class HomeZrenderComponent implements OnInit {
  mainZrender: any;
  offset = 0;
  cy = 130;
  cx = 130;
  minR = 80;
  maxR = 90;
  constructor() { }

  ngOnInit() {
    this.mainZrender = zrender.init(document.getElementById('main-zrender'), {
      renderer: 'svg',
      style: {
        fill: 'red'
      }
    });


    this.mainZrender.add(this.getGroup(315, 45, this.minR, this.maxR, 0, [5, 0]));
    this.mainZrender.add(this.getGroup(45, 135, this.minR, this.maxR, 90, [0, 5]));

    this.mainZrender.add(this.getGroup(135, 225, this.minR, this.maxR, 180, [-5, 0]));
    this.mainZrender.add(this.getGroup(225, 315, this.minR, this.maxR, 270, [0, -5]));


  }

  getAngle(angule: number, pre: number, offset: number) {

    return ((angule + (offset * pre)) / 360) * 2 * Math.PI;
  }

  getGroup(start: number, end: number, minR: number, maxR: number, offset: number, positon: number[]) {
    const tempGroup = new zrender.Group();
    // tempGroup.positon[0] = positon[0];
    // this.cx = 140 + positon[0];
    // this.cy = 140 + positon[1];
    // tempGroup.positon[1] = positon[1];
    const rightSector = new zrender.Sector({
      shape: {
        cx: this.cx,
        cy: this.cy,
        r: 130,
        r0: 120,
        startAngle: this.getAngle(start, 1, this.offset),
        endAngle: this.getAngle(end, -1, this.offset),
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
        startAngle: this.getAngle(start, 1, this.offset),
        endAngle: this.getAngle(end, -1, this.offset),
      },
      style: {
        fill: 'rgba(155,155,155)',
        lineWidth: 20
      }
    });

    const startX = 132 * Math.cos(this.getAngle(start, 1, this.offset)) + this.cx;
    const startY = 132 * Math.sin(this.getAngle(start, 1, this.offset)) + this.cy;
    const rect = new zrender.Line({
      shape: {
        x1: startX,
        y1: startY,
        x2: this.cx,
        y2: this.cy
      }
      ,
      style: {
        fill: 'white',
        stroke: 'white',
        lineWidth: 8
      }, z: 2
    });

    tempGroup.add(rightSector);
    tempGroup.add(rightMinSector);
    tempGroup.add(rect);

    tempGroup.add(this.getPath(minR, maxR, offset));
    rightMinSector.on('mouseover', () => {
      rightMinSector.attr('style', {
        fill: 'red'
      })
    });
    rightMinSector.on('mouseout', () => {
      rightMinSector.attr('style', {
        fill: 'rgba(155,155,155)'
      })
    });
    return tempGroup;
  }

  getPath(minR: number, maxR: number, offset: number) {
    const tempOffset = 10;
    const startPoint = `M${Math.cos(offset / 360 * 2 * Math.PI) * maxR + this.cx} ${Math.sin(offset / 360 * 2 * Math.PI) * maxR + this.cy}`;
    const secondPoint = `L${Math.cos((offset + tempOffset) / 360 * 2 * Math.PI) * minR + this.cx} ${Math.sin((offset + tempOffset) / 360 * Math.PI * 2) * minR + this.cy}`;
    const lastPoint = `L${Math.cos((offset - tempOffset) / 360 * 2 * Math.PI) * minR + this.cx} ${Math.sin((offset - tempOffset) / 360 * Math.PI * 2) * minR + this.cy}`;

    const path = `${startPoint} ${secondPoint} ${lastPoint} Z`;
    console.log(path);
    return new zrender.Path(zrender.path.createFromString(`${startPoint} ${secondPoint} ${lastPoint} Z`, {
      style: {
        fill: 'black'
      }
    }));
  }

}
