import { Component } from '@angular/core';
import { CorrentistaService } from '../correntista.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  numeroConta: string = '12';
  nome: string = '';
  dataNascimento: string = '';
  chavePix: string = '';
  cpf: string = '';

  constructor(private correntistaService: CorrentistaService) {}

  cadastrar() {
    if (!this.validarCampos()) {
      console.error('Preencha todos os campos corretamente.');
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
        console.log('Cadastro realizado com sucesso!', response);
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

    // Adicione mais lógica de validação conforme necessário

    return true;
  }
}
