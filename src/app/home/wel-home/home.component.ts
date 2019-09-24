import { Component, OnInit } from '@angular/core';
import { CncEventData, CncEventEnum, ReadPmcModel, ReadPmcTypeModel, DecompReadPmcItemModel, DataTypeEnum } from '../../shared/services/CncEventData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  x: string = '0.001';
  y = '0.001';
  z = '0.001';
  cncNodes: CncEventData[] = [];
  constructor() {
    const model = new CncEventData(CncEventEnum.ReadPmc);
    const readPmc = new ReadPmcModel();
    readPmc.Readers.push(new ReadPmcTypeModel(5, 0, 10));
    readPmc.Decompilers.push(new DecompReadPmcItemModel('h1_x', 5, DataTypeEnum.Int32, 0, null));
    readPmc.Decompilers.push(new DecompReadPmcItemModel('h1_y', 5, DataTypeEnum.Int32, 4, null));
    readPmc.Decompilers.push(new DecompReadPmcItemModel('h1_z', 5, DataTypeEnum.Int32, 8, null));

    model.Para = JSON.stringify(readPmc);
    this.cncNodes.push(model);
  }

  ngOnInit() {
    abp.event.on('connectSuccesss', (s) => {
      abp.event.trigger('cncRefreshEvent', this.cncNodes);

    });

  }

}
