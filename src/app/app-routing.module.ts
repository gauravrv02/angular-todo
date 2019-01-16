import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component'
import {LoginComponent} from './login/login.component'

const routes: Routes = [
  { path: 'user', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
