import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginFail:boolean;
  loginUsuario :LoginUsuario;
  errMsj:string;

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router
  ) { 
    this.loginUsuario = new LoginUsuario("","");
    this.errMsj = "";
    this.isLoginFail = false;
  }

  ngOnInit(): void {
    this.tokenService.logOut();
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
