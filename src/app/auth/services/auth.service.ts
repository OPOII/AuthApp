import { AuthStatus, LoginResponse, User } from '../interfaces';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl:string=environment.baseUrl;
  private http=inject(HttpClient);

  // Para que nadie cambie la señal
  private _currenUser=signal<User|null>(null);
  private _authStatus=signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  // Así nadie va a cambiar los estados
  public currentUser=computed(()=>this._currenUser());
  public authStatus=computed(()=>this._authStatus());
  constructor() { }

  login(email:string,password:string):Observable<boolean>{
    const url=`${this.baseUrl}/auth/login`
    const body={email,password};
    return this.http.post<LoginResponse>(url,body)
    .pipe(
      tap(({user,token})=>{
        this._currenUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token',token);
      }),
      map(()=>true),
      //Todo: errores
      catchError(err=>throwError(()=>err.error.message)
      )
    );
  }
}
