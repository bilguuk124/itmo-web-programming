import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Point} from '../models/Point';
import {Subject} from 'rxjs';
import {Message} from 'primeng/api';


@Injectable()
export class PointService {


  constructor(private http: HttpClient) {
  }

  message: Subject<Message[]> = new Subject<Message[]>();
  data: Subject<Array<Point>> = new Subject<Array<Point>>();


  // Отправка точки
  async doPost(point) {
    await this.http.post<Array<Point>>('http://localhost:8080/Back-1.0-SNAPSHOT/point-controller/add-point', JSON.stringify(point), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).toPromise().then(value => {
      this.data.next(value);
    });
  }

  // Взятие точек
  doGet() {
    return this.http.get<Array<Point>>('http://localhost:8080/Back-1.0-SNAPSHOT/point-controller/get-points?login=' + localStorage.getItem('userName')).toPromise();
  }

}

