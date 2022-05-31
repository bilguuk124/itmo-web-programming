import {Component, OnInit} from '@angular/core';
import {PointService} from '../../services/point.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SvgService} from '../../services/svg.service';
import {isNumeric} from 'rxjs/internal-compatibility';
import {Message, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  point: FormGroup;
  message:Message[]=[];

  constructor(private service: PointService, private svgService: SvgService,  private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = true;
  }

  //инициализации формы
  ngOnInit(): void {
    this.point = new FormGroup({
      x: new FormControl(null, null),
      y: new FormControl(null, null),
      r: new FormControl(null, null),
      owner: new FormControl(localStorage.getItem('userName'), null)
    });
  }

  //передача радиуса свг компоненту через сервис
  rChanger() {
    this.svgService.r.next(this.point.getRawValue().r);
  }

  //отправка точки и обнуление радиуса
  sendPoint() {
    if (this.validation()) {
      this.point.get('y').setValue(this.point.getRawValue().y.replace(',','.'))
      this.service.doPost(this.point.value);
      this.svgService.r.next(null);
      this.point = new FormGroup({
        x: new FormControl(null, null),
        y: new FormControl(null, null),
        r: new FormControl(null, null),
        owner: new FormControl(localStorage.getItem('userName'), null)
      });
    }
  }

  //Валидация данных
  validation() {
    let x = this.point.getRawValue().x;
    let y = this.point.getRawValue().y;
    let r = this.point.getRawValue().r;
    let forRequest = true;
    if (x == null) {
      this.message.push({severity: 'error', summary: 'error', detail: 'X is undefined'});
      forRequest = false;
    }
    if (y == null) {
        this.message.push({severity: 'error', summary: 'error', detail: 'Y is undefined'});
        forRequest = false;
    }else {
      if(!isNumeric(y.replace(',', '.'))){
        forRequest = false;
        this.message.push({severity: 'error', summary: 'error', detail: 'Y is incorrect'});
      }
    }
    if (r == null) {
      this.message.push({severity: 'error', summary: 'error', detail: 'Radius is undefined'});
      forRequest = false;
    }
    this.service.message.next(this.message)
    this.message=[];
    return forRequest;
  }


}

