import { Component, OnInit, Injectable } from '@angular/core';
import { Observable, Subject, from, throwError } from "rxjs";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

import { HttpParams, HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Location, LocationStrategy } from '@angular/common';

import { Http, Response, HttpModule } from '@angular/http';

import { Constants } from "../services/constants";


const params = new HttpParams().set('_page', "1").set('_limit', "1");

@Injectable({ providedIn: 'root' })
export class Request {

  location: Location;
  private subject = new Subject<any>();
  private headers: HttpHeaders;
  constructor(private Http: HttpClient, location: Location) {
    this.location = location;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("usuario_userid") + ";" + sessionStorage.getItem("user")
    });
  }
  
  get(url: string): Observable<any> {
    return this.Http.get(Constants.URL_BASE_WEB_API + url, { headers: this.headers })
      .pipe(
        map((data: any[]) => {
          return data
        })
        , catchError(error => {
          return throwError('Algo salio mal!')
        })
      );
  }
  post(url: string, data: any): Observable<any> {
    return this.Http.post(Constants.URL_BASE_WEB_API + url, data, { headers: this.headers }  )
      .pipe(
        map((data: any[]) => {
          return data
        })
        , catchError(error => {
          return throwError('Algo salio mal!')
        })
      );
  }

  put(url: string, data: any): Observable<any> {
    return this.Http.put(Constants.URL_BASE_WEB_API + url, data, { headers: this.headers })
      .pipe(
        map((data: any[]) => {
          return data
        })
        , catchError(error => {
          return throwError('Algo salio mal!')
        })
      );
  }
  delete(url: string): Observable<any> {
    return this.Http.delete(Constants.URL_BASE_WEB_API + url, { headers: this.headers })
      .pipe(
        map((data: any[]) => {
          return data
        })
        , catchError(error => {
          return throwError('Algo salio mal!')
        })
      );
  }

}
