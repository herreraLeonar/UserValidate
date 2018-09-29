import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ConsultaCuentasComponent } from './components/consulta-cuentas/consulta-cuentas.component';
import { ConsultaProveedoresComponent } from './components/consulta-proveedores/consulta-proveedores.component';
import { ConsultaProyectosComponent } from './components/consulta-proyectos/consulta-proyectos.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', canActivate: [AuthguardService], component: DashboardComponent,
    children: [
      { path: '',  redirectTo: 'proveedores', pathMatch: 'full' },
      { path: 'proveedor', canActivate: [AuthguardService], component: ProveedoresComponent },
      { path: 'cuenta', canActivate: [AuthguardService], component: CuentasComponent },
      { path: 'proyecto', canActivate: [AuthguardService], component: ProyectosComponent },
      { path: 'cuentas', canActivate: [AuthguardService], component: ConsultaCuentasComponent },
      { path: 'proveedores', canActivate: [AuthguardService], component: ConsultaProveedoresComponent },
      { path: 'proyectos', canActivate: [AuthguardService], component: ConsultaProyectosComponent }
    ]
  }
];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }


