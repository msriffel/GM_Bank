import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CorrentistaService } from '../correntista.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  usuario = '';
  senha = '';

  constructor(
    private router: Router,
    private service: CorrentistaService,
    private message: MessageService
  ) { }

  entrarSistema() {
    if (!this.usuario || !this.senha) {
      this.message.add({
        severity: 'warn', summary: 'Aviso', detail: 'Por favor, preencha todos os campos.'
      });
      return;
    }

    this.service.login(this.usuario).subscribe(
      (response) => {
        if (response && response.id != null) {
          this.message.add({ severity: 'success', summary: 'Sucesso!', detail: 'Login efetuado com sucesso!' });
          this.service.dadosUsuario = response;
          this.router.navigate(['principal']);
        } else {
          this.message.add({ severity: 'warn', summary: 'Aviso', detail: 'Login incorreto!' });
        }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        this.message.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao fazer login.' });
      }
    );
    
  }

  register() {
    this.router.navigate(['cadastro']);
  }
}
