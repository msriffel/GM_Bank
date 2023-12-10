import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CorrentistaService } from '../correntista.service';
import { AuthService } from '../auth.service';
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
    private message: MessageService,
    private authService: AuthService

  ) { }

  entrarSistema() {
    if (!this.usuario || !this.senha) {
       // Trate o caso em que o usuário ou senha não são fornecidos
       return;
    }
 
    this.service.login(this.usuario, this.senha).subscribe(
       (response) => {
          if (response && response.id != null) {
             // Login bem-sucedido
             this.message.add({ severity: 'success', summary: 'Sucesso!', detail: 'Login efetuado com sucesso!' });
             this.service.dadosUsuario = response;
             this.authService.setAuthenticated(true, response.id);
             this.router.navigate(['principal']);
          } else {
             // Login incorreto
             this.message.add({ severity: 'warn', summary: 'Aviso', detail: 'Login incorreto!' });
          }
       },
       (error) => {
          // Tratamento de erro
          console.error('Erro ao fazer login:', error);
          this.message.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao fazer login.' });
       }
    );
 }

  register() {
    this.router.navigate(['cadastro']);
  }
}
