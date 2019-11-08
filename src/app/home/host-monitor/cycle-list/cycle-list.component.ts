import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrls: ['./cycle-list.component.scss']
})
export class CycleListComponent implements OnInit {
  cycleNodes: GroupNode[] = [];
  cycleDataNodes = [];
  constructor() { }

  ngOnInit() {
    this.cycleNodes = [];
    this.cycleDataNodes = [];
  }
  public setData(data: any) {

    data.forEach(item => {
      if (item.groupName.length > 1) {
        let name = item.groupName;
        if (item.groupName.indexOf('.') > -1) {
          const arr = item.groupName.split('.');
          name = arr[arr.length - 1];
          name = name.split('_')[0];
        }
        const index = this.cycleNodes.findIndex(d => d.groupName == name);

        if (item.operation == 'Add' && index == -1) {
          this.cycleNodes.push(new GroupNode(name, item.operation, item.data));

        } else if(item.operation == 'Remove' ) {
          if (this.cycleNodes[index].isActive) {
            this.cycleDataNodes = [];
          }
          this.cycleNodes.splice(index, 1);
        }

      }
    });
    if (this.cycleNodes.length > 0 && this.cycleDataNodes.length == 0) {
      this.groupClick(this.cycleNodes[0]);
    }
  }
  groupClick(groupNode: GroupNode) {
    this.cycleNodes.forEach(d => d.isActive = false);
    groupNode.isActive = true;
    this.cycleDataNodes = groupNode.nodes;
    return false;
  }
  getReaders(item: any) {
    const para = JSON.parse(item.para);
    return para.Readers;
  }
  getString(obj: any) {
    return JSON.stringify(obj).replace('\r\n', '');
  }
  getWriter(item: any) {
    const para = JSON.parse(item.para);
    return para.Decompilers;
  }
}



class GroupNode {
  public isActive = false;
  constructor(public groupName: string, public operation: string, public nodes: any[]) {

  }
}

