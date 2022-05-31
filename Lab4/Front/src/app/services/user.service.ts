import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {PointService} from './point.service';
import {MD5, enc} from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private message:PointService) { }

  doPost(user){
    user.password = MD5(user.password).toString(enc.Hex)
    this.http.post('http://localhost:8080/Back-1.0-SNAPSHOT/user-controller/check-user',user, {headers: {'Access-Control-Allow-Origin':'*'}}).subscribe(value => {
        if(value == false){
          this.message.message.next([{severity: 'error', summary: 'error', detail: 'There is no such user'}])
        }else {
          localStorage.setItem('isLogged', String(value))
          localStorage.setItem('userName', user.login)
          console.log(localStorage.getItem('userName'))
          this.router.navigate(['main'])
        }
      })
  }

  doReg(user){
    user.password = MD5(user.password).toString(enc.Hex)
    this.http.post('http://localhost:8080/Back-1.0-SNAPSHOT/user-controller/add-user',user, {headers: {'Access-Control-Allow-Origin':'*'}}).subscribe(value => {
      localStorage.setItem('isLogged', String(value))
      if(value == false){
        this.message.message.next([{severity: 'error', summary: 'error', detail: 'This user already exists'}])
      }else {
        this.message.message.next([{severity: 'success', summary: 'success', detail: 'User is created'}])
      }
    });
  }

}
