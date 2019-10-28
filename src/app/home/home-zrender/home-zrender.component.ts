import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-zrender',
  templateUrl: './home-zrender.component.html',
  styleUrls: ['./home-zrender.component.scss']
})
export class HomeZrenderComponent implements OnInit {
  mainZrender: any;
  offset = 2;
  cy = 130;
  cx = 130;
  minR = 85;
  maxR = 95;
  constructor() { }

  ngOnInit() {
    this.mainZrender = zrender.init(document.getElementById('main-zrender'), {
      renderer: 'svg'
    });


    this.mainZrender.add(this.getGroup(315, 45, this.minR, this.maxR, 0));
    this.mainZrender.add(this.getGroup(45, 135, this.minR, this.maxR, 90));

    this.mainZrender.add(this.getGroup(135, 225, this.minR, this.maxR, 180));
    this.mainZrender.add(this.getGroup(225, 315, this.minR, this.maxR, 270));


  }

  getAngle(angule: number, pre: number) {

    return ((angule + (this.offset * pre)) / 360) * 2 * Math.PI;
  }

  getGroup(start: number, end: number, minR: number, maxR: number, offset: number) {
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

    const startX = 140 * Math.cos(this.getAngle(start - 1, 1)) + this.cx;
    const startY = 140 * Math.sin(this.getAngle(start - 1, 1)) + this.cy;
    const rect = new zrender.Line({
      shape: {
        x1: startX,
        y1: startY,
        x2: 48 * Math.cos(this.getAngle(start + 2.5, 1)) + this.cx,
        y2: 48 * Math.sin(this.getAngle(start + 2.5, 1)) + this.cy
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
    tempGroup.add(this.getPath(minR, maxR, offset));
    return tempGroup;
  }

  getPath(minR: number, maxR: number, offset: number) {
    const tempOffset = 10;
    const startPoint = `M${Math.cos(offset / 360 * 2 * Math.PI) * maxR + this.cx} ${Math.sin(offset / 360 * 2 * Math.PI) * maxR + this.cy}`;
    const secondPoint = `L${Math.cos((offset + tempOffset) / 360 * 2 * Math.PI) * minR + this.cx} ${Math.sin((offset +tempOffset) / 360 * Math.PI * 2) * minR + this.cy}`;
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
