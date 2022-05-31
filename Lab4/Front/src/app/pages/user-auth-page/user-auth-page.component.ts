import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Message} from 'primeng/api';
import {PointService} from '../../services/point.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user-auth-page',
  templateUrl: './user-auth-page.component.html',
  styleUrls: ['./user-auth-page.component.scss']
})

export class UserAuthPageComponent implements OnInit {

  user: FormGroup;
  message: Message[];

  constructor(private pointService: PointService, private userService: UserService, private router: Router) {
    this.pointService.message.subscribe(value => {
      this.message = value;
    });
    this.user = new FormGroup({
      login: new FormControl(null, null),
      password: new FormControl(null, null)
    });
  }

  sendUser(){
    if(this.user.getRawValue().login !== null && this.user.getRawValue().password !== null && this.user.getRawValue().login.trim() != '' && this.user.getRawValue().password.trim() != '') {
      this.userService.doPost(this.user.value)
      this.user = new FormGroup({
        login: new FormControl(null, null),
        password: new FormControl(null, null)
      });
    } else {
      this.pointService.message.next([{severity: 'error', summary: 'error', detail: 'Check login or password'}])
    }
  }

  createUser(){
    if(this.user.getRawValue().login !== null && this.user.getRawValue().password !== null && this.user.getRawValue().login.trim() != '' && this.user.getRawValue().password.trim() != '') {
      this.userService.doReg(this.user.value)
      this.user = new FormGroup({
        login: new FormControl(null, null),
        password: new FormControl(null, null)
      });
    }else {
      this.pointService.message.next([{severity: 'error', summary: 'error', detail: 'Check login or password'}])
    }
  }


  ngOnInit(): void {
    if(localStorage.getItem('isLogged') === "true"){
      this.router.navigate(['main']);
    }
  }

}
