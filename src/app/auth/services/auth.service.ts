import { AuthStatus, User } from '../interfaces';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl:string=environment.baseUrl;
  private http=inject(HttpClient);

  private _currenUser=signal<User|null>(null);
  private _authStatus=signal<AuthStatus>(AuthStatus.checking);

  constructor() { }

  login(emai:string,password:string):Observable<boolean>{
    return of(true);
  }
}
