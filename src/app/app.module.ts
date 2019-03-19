import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule,
  MatBadgeModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatDatepickerModule,
  MatNativeDateModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { HighchartComponent } from './highchart/highchart.component';
import { ChartModule} from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { UserService } from './services/user.service';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    HighchartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ChartModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule
  ],
  exports: [MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
