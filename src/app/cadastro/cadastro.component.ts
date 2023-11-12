import { Component } from '@angular/core';
import { CorrentistaService } from '../correntista.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
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
    ) {
    // Chame a função para obter o próximo número de conta no construtor
    this.obterProximoNumeroConta();
  }

  cadastrar() {
    if (!this.validarCampos()) {
      alert('Preencha todos os campos corretamente.');
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
        alert('Cadastro realizado com sucesso!');
        this.obterProximoNumeroConta();
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Erro ao cadastrar correntista', error);
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
      alert('Você deve ter mais de 18 anos para se cadastrar.');
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
