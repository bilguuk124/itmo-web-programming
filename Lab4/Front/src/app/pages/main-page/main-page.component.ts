import {Component, OnInit} from '@angular/core';
import {Message, MessageService, PrimeNGConfig} from 'primeng/api';
import {PointService} from '../../services/point.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  message: Message[] = [];
  name: string = localStorage.getItem('userName');

  constructor(private service: PointService, private messageService: MessageService, private primengConfig: PrimeNGConfig, private router: Router) {
    this.service.message.subscribe(value => {
      messageService.clear()
      value.forEach(value1 => {
        messageService.add(value1);
      })
    });
  }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if(localStorage.getItem('isLogged') == "false"){
      this.router.navigate(['auth'])
    }
  }

  logout(){
    localStorage.setItem('isLogged',String(false));
    this.router.navigate(['auth'])
  }
}
