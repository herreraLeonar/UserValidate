//ng generate component login
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Request } from '../../services/request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private request: Request,
    private routes: Router) { }

  ngOnInit() {
    this.document.body.classList.add('SisporMainC');
  }

  private async LoginClick() {
    let promise = await new Promise(() => {
      this.request.post("/Login/Do", { user: this.user, password: this.password })
        .subscribe(resp => {
          if (resp.result.estado == true) {
            sessionStorage.setItem('user', resp.result.username);
            sessionStorage.setItem('usuario_userid', resp.result.idUsuario);
            window.location.href = ('/dashboard');

            //this.routes.navigate(['/dashboard']);
          }
        });
    });
    
  }
}
