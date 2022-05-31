import {Component, HostListener, OnInit} from '@angular/core';
import {SvgService} from '../../services/svg.service';
import * as $ from 'jquery';
import ClickEvent = JQuery.ClickEvent;
import {FormControl, FormGroup} from '@angular/forms';
import {PointService} from '../../services/point.service';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})

export class SvgComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem('isLogged') == 'true') {
      this.forDrawPoints();
    }
  }

  rRadius: number;
  svgPoint: FormGroup;
  message: Message[] = [];

  //Слежка за изменением радиусом и отрисовка точек при его изменении
  constructor(private service: SvgService, private sendService: PointService) {
    this.service.r.subscribe(value => {
        this.rRadius = value;
        this.SvgBuilder(value);
        this.forDrawPoints();
      }
    );
  }


  //Отправка точки
  @HostListener('click', ['$event'])
  async getCoords(e: ClickEvent) {
    let radiusValue = this.rRadius;
    if (radiusValue == null) {

      //отправка ошибки в main
      this.sendService.message.next([{severity: 'error', summary: 'error', detail: 'Radius is undefined'}]);

    } else {
      //Взятие координат
      let offset = $('.block__svg').offset();
      let relativeX = (e.pageX - offset.left) - 150;
      let relativeY = ((e.pageY - offset.top) - 150);
      let x_val = ((radiusValue * relativeX) / 120).toFixed(3);
      let y_val = ((-1) * (radiusValue * relativeY) / 120).toFixed(3);

      //Форма для отправки
      this.svgPoint = new FormGroup({
        x: new FormControl(x_val, null),
        y: new FormControl(y_val, null),
        r: new FormControl(radiusValue, null),
        owner: new FormControl(localStorage.getItem('userName'), null)
      });

      //Отправка формы
      await this.sendService.doPost(this.svgPoint.value);
      await this.forDrawPoints();
    }
    //после отправки - перерисовка
  }


  //Перерисовка SVG
  SvgBuilder(radiusValue) {
    if (radiusValue !== null) {
      let half_value = String(Number(radiusValue) / 2);
      document.querySelector('#radius-text-right').innerHTML = radiusValue;
      document.querySelector('#radius-text-left').innerHTML = '-' + radiusValue;
      document.querySelector('#radius-text-top').innerHTML = radiusValue;
      document.querySelector('#radius-text-bottom').innerHTML = '-' + radiusValue;
      document.querySelector('#radius-text-right-half').innerHTML = half_value;
      document.querySelector('#radius-text-left-half').innerHTML = '-' + half_value;
      document.querySelector('#radius-text-top-half').innerHTML = half_value;
      document.querySelector('#radius-text-bottom-half').innerHTML = '-' + half_value;
    } else {
      document.querySelector('#radius-text-right').innerHTML = 'R';
      document.querySelector('#radius-text-left').innerHTML = '-' + 'R';
      document.querySelector('#radius-text-top').innerHTML = 'R';
      document.querySelector('#radius-text-bottom').innerHTML = '-' + 'R';
      document.querySelector('#radius-text-right-half').innerHTML = 'R/2';
      document.querySelector('#radius-text-left-half').innerHTML = '-' + 'R/2';
      document.querySelector('#radius-text-top-half').innerHTML = 'R/2';
      document.querySelector('#radius-text-bottom-half').innerHTML = '-' + 'R/2';
    }
  }


  async forDrawPoints() {
    $('circle.point').remove();
    await this.sendService.doGet().then(value => {
      let length = value.length;
      value = value.reverse();
      if (length < 5) {
        value.forEach(value1 => {
          this.drawPoint(value1);
        });
      } else {
        this.drawPoint(value[0]);
        this.drawPoint(value[1]);
        this.drawPoint(value[2]);
        this.drawPoint(value[3]);
        this.drawPoint(value[4]);
      }
    });
  }

  async drawPoint(point) {
    let radiusValue = this.rRadius;
    let svg = document.querySelector('#svg_for_point');
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let x_value_point;
    let y_value_point;
    if (radiusValue != null) {
      x_value_point = (150 + (point.x * 120 / radiusValue));
      y_value_point = (150 + ((-1) * point.y * 120 / radiusValue));
    } else {
      x_value_point = (150 + (point.x * 120 / point.r));
      y_value_point = (150 + ((-1) * point.y * 120 / point.r));
    }
    circle.setAttribute('cx', String(x_value_point));
    circle.setAttribute('cy', String(y_value_point));
    circle.setAttribute('r', '5');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('class', 'point');
    if (point.hit) {
      circle.setAttribute('fill', 'green');
    } else {
      circle.setAttribute('fill', 'red');
    }
    await svg.appendChild(circle);
  }
}
