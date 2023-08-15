import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly controllerUrl = '/login';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.logout();
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  login(username: string, password: string) {
    let o = { username: '', password: '' };
    o.username = username;
    o.password = password;

    return this.http.post<any>(
      `${environment.serverUrl}${this.controllerUrl}`,
      o
    );

    //      return this.http.post<any>(this.loginUrl, o).pipe(map( response => {

    //   let tokenInfo = this.getDecodedAccessToken(response.jwt); // decode token

    //   // console.log(tokenInfo); // show decoded token object in console
    //   // console.log(tokenInfo.sub);
    //   // console.log(tokenInfo.type[0].authority);

    //   localStorage.setItem("jwt", response.jwt);
    //   localStorage.setItem("username", tokenInfo.sub);
    //   localStorage.setItem("usertype", tokenInfo.type[0].authority);

    // },
    //   (error: any) => {
    //   console.log("Login failed.");
    // }))
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getJwtToken() {
    return localStorage.getItem('jwt');
  }

  // getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch (Error) {
  //     return null;
  //   }
  // }
}
