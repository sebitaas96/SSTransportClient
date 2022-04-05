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
  isLogged = false;
  isLoginFail = false;
  loginUsuario :LoginUsuario;
  roles: string[] = [];
  errMsj:string;

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router:Router
  ) { 
    this.loginUsuario = new LoginUsuario("","");
    this.errMsj = "";
  }

  ngOnInit(): void {
    this.tokenService.logOut();
  }

  onLogin(data:any):void{
    console.log(data['nombreUsuario'],data['password']);
    this.loginUsuario = new LoginUsuario(data['nombreUsuario'],data['password']);
    this.authService.login(this.loginUsuario).subscribe(
      data=>{
        this.isLogged = true;
        this.isLoginFail = false;
        console.log(data.token)
        console.log(data.nombreUsuario)
        console.log(data.authorities)
        
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;

        this.router.navigate(['/dashboard']);

      },
      err =>{
        console.log(err);
        this.isLogged = false;
        this.isLoginFail = true;
        if(err['error']['error'] == "Unauthorized"){
          this.errMsj = "Usuario o password  incorrectos";
        }
        else{
          this.errMsj = err['error']['mensaje'];
        }
      }
    )
  }

}
