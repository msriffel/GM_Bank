import { Component } from '@angular/core';
import { CorrentistaService } from '../correntista.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]
})

export class CadastroComponent {
  numeroConta: string = '';
  nome: string = '';
  dataNascimento: string = '';
  chavePix: string = '';
  cpf: string = '';

  constructor(
    private correntistaService: CorrentistaService,
    private router: Router,
    private message: MessageService
    ) {
    this.obterProximoNumeroConta();
  }

  cadastrar() {
    if (!this.validarCampos()) {
      this.message.add({
        severity: 'warn', summary: 'Aviso!', detail: 'Por favor, preencha todos os campos.'
      });
      return;
    }

    const correntista = {
      numeroConta: this.numeroConta,
      nome: this.nome,
      dataNascimento: this.dataNascimento,
      chavePix: this.chavePix,
      cpf: this.cpf
    };

    console.log('JSON da requisição:', JSON.stringify(correntista));

    this.correntistaService.cadastrar(correntista).subscribe(
      (response) => {
        this.message.add({
          severity: 'success', summary: 'Sucesso!', detail: 'Conta criada com sucesso!'
        });
        this.obterProximoNumeroConta();
        this.router.navigate(['']);
      },
      (error) => {
        this.message.add({
        severity: 'error', summary: 'Erro!', detail: error
      });
      }
    );
  }

  private validarCampos(): boolean {
    if (!this.nome || !this.dataNascimento || !this.chavePix || !this.cpf) {
      return false;
    }

    const dataNascimentoDate = new Date(this.dataNascimento);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimentoDate.getFullYear();

    if (idade < 18) {
      this.message.add({
        severity: 'warn', summary: 'Aviso', detail: "Você precisa ter mais de 18 anos de idade!"
      });
      return false;
    }

    return true;
  }

  private obterProximoNumeroConta() {
    this.correntistaService.obterUltimoNumeroConta().subscribe(
      (ultimoNumero) => {
        this.numeroConta = (parseInt(ultimoNumero) + 1).toString();
      },
      (error) => {
        console.error('Erro ao obter o próximo número de conta', error);
      }
    );
  }
}
