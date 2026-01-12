import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material/material-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CaptchaService } from '../../shared/services/captcha-service';
import { TokenStoreService } from '../../core/services/token-store.service';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public captchaService: CaptchaService,
    private tokenStoreService: TokenStoreService
  ) {}

  formGroupDetails!: FormGroup;
  submitted: boolean = false;
  captchaSvg!: any;
  captchaId!: string;
  errorMessage!: string;

  ngOnInit(): void {
    this.loadCaptcha();
    this.formGroupDetails = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      captcha: [null, [Validators.required]],
    });
  }

  get f() {
    return this.formGroupDetails.controls;
  }

  loadCaptcha() {
    this.captchaService.getCaptcha().subscribe((res) => {
      this.captchaSvg = res.svg;
      this.captchaId = res.captchaId;
    });
  }

  login() {
    this.submitted = true;
    const payload = {
      email: this.formGroupDetails.value.username,
      password: this.formGroupDetails.value.password,
      captcha: this.formGroupDetails.value.captcha,
      captchaId: this.captchaId,
    };
    if (this.formGroupDetails.valid) {
      this.captchaService.login(payload).subscribe({
        next: (res) => {
          if (res.token) {
            this.tokenStoreService.setToken(res.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err.error.message || 'Something went wrong';
          this.loadCaptcha();
        },
      });
    }
  }

}
