import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-resovle',
  templateUrl: './program-resovle.component.html',
  styleUrls: ['./program-resovle.component.scss']
})
export class ProgramResovleComponent implements OnInit {

  dataNodes = [];
  constructor() { }

  ngOnInit() {
  }
  public setData(node: any) {
    if (this.dataNodes.length > 20) {
      this.dataNodes = [];
    }
    this.dataNodes.unshift({ time: this.getCurrentTime(), text: JSON.stringify(node) });

  }
  getCurrentTime() {
    return new Date().toTimeString();
  }

}
