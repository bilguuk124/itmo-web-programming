import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {UserAuthPageComponent} from './pages/user-auth-page/user-auth-page.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {HttpClientModule} from '@angular/common/http';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {AppRoutingModule} from './app-routing.module';
import {HeadCompComponent} from './elements/head-comp/head-comp.component';
import {FormComponent} from './elements/form/form.component';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SvgComponent} from './elements/svg/svg.component';
import {PointService} from "./services/point.service";
import { DataTableComponent } from './elements/data-tabel/data-table.component';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthPageComponent,
    MainPageComponent,
    HeadCompComponent,
    SvgComponent,
    FormComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    HttpClientModule,
    AppRoutingModule,
    CheckboxModule,
    RadioButtonModule,
    ReactiveFormsModule,
    TableModule,
    MessageModule,
    MessagesModule,
    FormsModule
  ],
  providers: [PointService, MessageService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
