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
    // Check if the user is authenticated before navigating to 'pix'
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['pix']);
    } else {
      // Handle unauthenticated access
      console.warn('Usuário não autenticado. Redirecionando para a tela de login.');
      this.router.navigate(['']);
    }
  }
  

  private buscarExtrato(): void {
    let id = this.service.dadosUsuario.id;

    this.service.extrato(id).subscribe(item => {
      this.extrato = item;
    });
  }
}
