import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cycle-result',
  templateUrl: './cycle-result.component.html',
  styleUrls: ['./cycle-result.component.scss']
})
export class CycleResultComponent implements OnInit {

  dataNodes: CNCDataNode[] = [];
  constructor() { }

  ngOnInit() {
  }
  public setData(node: any) {
    var res = this.dataNodes.filter(d => d.id == node.data.fullNamespace);
    let model: CNCDataNode = null;
    if (res && res.length > 0) {
      model = res[0];
      model.time = node.time;
      model.nodes = node.data.value;
    } else {
      this.dataNodes.unshift(new CNCDataNode(node.time, node.data.fullNamespace, node.data.value));
    }
    var resActive = this.dataNodes.filter(d => d.isActive);
    if (resActive.length == 0 && this.dataNodes.length > 0) {
      this.nodeClick(this.dataNodes[0]);
    }

  }
  private nodeClick(node: CNCDataNode) {
    node.isActive = !node.isActive;
  }
  getString(obj: any) {
    return JSON.stringify(obj).replace('\r\n', '');
  }
}

class CNCDataNode {
  public fullNameSpace: string;
  public isActive = false;
  constructor(public time: string, public id: string, public nodes: any[]) {
    const arr = id.split('.');
    this.fullNameSpace = arr[arr.length - 1];
  }
}