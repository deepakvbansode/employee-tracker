import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert.service';
import { LoginComponent } from './core/login/login.component';
import { AppService } from './services/app.service';
import { AuthGuard } from './helpers/auth.guard';
import { AuthService } from './core/auth.service';
import { routing } from './app.routings';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { TeamLeadDashboardComponent } from './team-lead-dashboard/team-lead-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeListComponent,
    EmployeeComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent,
    EmployeeDashboardComponent,
    TeamLeadDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    routing
  ],
  providers: [
    AppService,
    AuthGuard,
    AuthService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
