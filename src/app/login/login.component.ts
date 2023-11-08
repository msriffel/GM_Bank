import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CorrentistaService } from '../correntista.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private service: CorrentistaService
  ){}

  usuario = "";
  senha = "";

  entrarSistema() {
    this.service.login(this.usuario)
    .subscribe(
      (response) => {
        if (response.id != null){
          this.router.navigate(['principal'])
        }
      }
    )
    this.router.navigate(['principal']);
  }
}