import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public route: ActivatedRoute, private loginService: LoginService, private router : Router) {}

  ngOnInit(): void {}

  loginCheck(){
    return this.loginService.isLoggedIn();
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
