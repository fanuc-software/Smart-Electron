import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-writer',
  templateUrl: './read-writer.component.html',
  styleUrls: ['./read-writer.component.scss']
})
export class ReadWriterComponent implements OnInit {
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
