import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AuthguardService } from './services/authguard.service';
import { HttpService } from './services/http-service.service';

//components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AppComponent } from './app.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ConsultaCuentasComponent } from './components/consulta-cuentas/consulta-cuentas.component';
import { ConsultaProveedoresComponent } from './components/consulta-proveedores/consulta-proveedores.component';
import { ConsultaProyectosComponent } from './components/consulta-proyectos/consulta-proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ProveedoresComponent,
    CuentasComponent,
    ProyectosComponent,
    ConsultaCuentasComponent,
    ConsultaProveedoresComponent,
    ConsultaProyectosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthguardService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
