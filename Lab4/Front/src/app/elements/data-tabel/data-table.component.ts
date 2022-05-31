import {Component, OnInit} from '@angular/core';
import {Point} from '../../models/Point';
import {PointService} from '../../services/point.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})


export class DataTableComponent implements OnInit {

  data: Array<Point> = [];

  //здесь отслеживание пришедшего массива точек
  constructor(private service: PointService) {
    this.service.data.subscribe(value => {
      this.data = value;
    });
  }

  //инициализация точек
  ngOnInit(): void {
    this.initData();
  }

  //тут берется Array точек из сервера
  public initData() {
    this.service.doGet().then((value: Array<Point>) => {
      this.data = value;
      this.service.data.next(value)
    });
  }

}
