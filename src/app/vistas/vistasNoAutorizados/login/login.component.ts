import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginFail:boolean;
  loginUsuario :LoginUsuario;
  errMsj:string;
  captcha:string;
  email:string;

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router,
    private recaptchaV3Service: ReCaptchaV3Service
  ) { 
    this.loginUsuario = new LoginUsuario("","");
    this.errMsj = "";
    this.isLoginFail = false;
    this.captcha = '';
    this.email = "onussarasebas@gmail.com";
  }

  ngOnInit(): void {
    this.tokenService.logOut();
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      console.log(`Token [${token}] generated`);
      this.onLogin(form);
    });
  }

  onLogin(data:any):void{
    console.log(data['nombreUsuario'],data['password']);
    this.loginUsuario = new LoginUsuario(data['nombreUsuario'],data['password']);
    this.authService.login(this.loginUsuario).subscribe(
      data=>{
        console.log(data.token);
        this.tokenService.setToken(data.token);
        this.router.navigate(['/onus/dashboard']);
      },
      err =>{
        console.log(err);
        if(err['error']['error'] == "Unauthorized"){
          this.isLoginFail = true;
          this.errMsj = "Usuario o password  incorrectos";
        }
        else{
          this.isLoginFail = true;
          this.errMsj = err['error']['mensaje'];
        }
      }
    )
  }

}
