import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorMessage!: boolean;

  constructor(
    private authService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
    this.showErrorMessage = false;
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  login() {
    this.authService
      .login(
        this.loginForm.get('username')!.value,
        this.loginForm.get('password')!.value
      )
      .subscribe((resp) => {
        next: console.log(resp);
        localStorage.setItem('jwt', resp.jwt);
        this.router.navigate(['/home']);
      });
  }
}
