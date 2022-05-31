import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  constructor() {}

  //переменная для слежки за радиусом
  r:Subject<number> = new Subject<number>()

}
