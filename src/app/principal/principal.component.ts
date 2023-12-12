import { Component, OnInit } from '@angular/core';
import { CorrentistaService } from '../correntista.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 
  public cpf: string = "";
  public nome: string = "";
  public saldo: number = 0;
  public extrato: any;
  public filtroPix: string = 'todos';
  public filtroMes: string = 'todos';

  constructor(
    private service: CorrentistaService, 
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cpf = this.service.dadosUsuario?.cpf || '';
    this.nome = this.service.dadosUsuario?.nome || '';
    this.buscarSaldo();
    this.buscarExtrato();
  }

  private buscarSaldo(): void {
    let id = this.service.dadosUsuario.id;
    this.service.saldo(id).subscribe(item => {
      this.saldo = item;
    });
  }

  sair() {
    this.router.navigate(['']);
  }

  irParaTelaPix() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['pix']);
    } else {
      console.warn('Usuário não autenticado. Redirecionando para a tela de login.');
      this.router.navigate(['']);
    }
  }

  realizarPesquisa(): void {
    this.buscarExtrato();
  }

  private buscarExtrato(): void {
    let id = this.service.dadosUsuario.id;
    this.service.extrato(id).subscribe(items => {
      let extratoFiltrado = this.filtrarExtrato(items);
      this.extrato = extratoFiltrado;
    });
  }

  private filtrarExtrato(items: any[]): any[] {
    return items.filter(item => {
      if (this.filtroPix === 'recebido' && item.tipo !== 'Pix Recebido') {
        return false;
      }

      if (this.filtroPix === 'enviado' && item.tipo !== 'Pix Enviado') {
        return false;
      }

      if (this.filtroMes !== 'todos') {
        const mesExtrato = new Date(item.dataMovimentacao).getMonth() + 1;
        if (mesExtrato.toString() !== this.filtroMes) {
          return false;
        }
      }

      return true;
    });
  }
}
