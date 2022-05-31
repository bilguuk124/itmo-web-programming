import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserAuthPageComponent} from './pages/user-auth-page/user-auth-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';

const routes: Routes = [
  {path: '', redirectTo:"/auth", pathMatch:"full"},
  {path: 'auth', component: UserAuthPageComponent},
  {path: 'main', component: MainPageComponent},
  {path: '**', redirectTo:"/auth", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

