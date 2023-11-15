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

  home() {
    this.router.navigate(['principal']);
  }

  cadastrar() {
    // Função para validar CPF
    const validarCPF = (): boolean => {
      console.log('Validando CPF...');
      const cpf = this.cpf.replace(/\D/g, ''); // Remover caracteres não numéricos
      console.log('CPF digitado:', cpf);
      if (cpf.length !== 11) {
        this.message.add({
          severity: 'warn', summary: 'Aviso!', detail: 'CPF deve ter 11 dígitos.'
        });
        return false;
      }

      // Algoritmo de validação do CPF
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }

      const remainder = (sum * 10) % 11;
      if (remainder !== parseInt(cpf.charAt(9))) {
        this.message.add({
          severity: 'warn', summary: 'Aviso!', detail: 'CPF inválido.'
        });
        return false;
      }

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }

      const secondRemainder = (sum * 10) % 11;
      if (secondRemainder !== parseInt(cpf.charAt(10))) {
        this.message.add({
          severity: 'warn', summary: 'Aviso!', detail: 'CPF inválido.'
        });
        return false;
      }

      return true;
    };

    if (!this.validarCampos() || !validarCPF()) {
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
          severity: 'error', summary: 'Erro!', detail: 'Contate o administrador do sistema!'
        });
      }
    );
  }

  private validarCampos(): boolean {
    if (!this.nome || !this.dataNascimento || !this.chavePix || !this.cpf) {
      this.message.add({
        severity: 'warn', summary: 'Aviso!', detail: 'Por favor, preencha todos os campos.'
      });
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
