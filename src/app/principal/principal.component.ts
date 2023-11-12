import { Component, OnInit } from '@angular/core';
import { CorrentistaService } from '../correntista.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 
  public cpf: string = "";
  public nome: string = "";

  constructor(
    private service: CorrentistaService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cpf = this.service.dadosUsuario.cpf;
    this.nome = this.service.dadosUsuario.nome;
    this.buscarSaldo();
  }

  public saldo: number = 0;
  private buscarSaldo(): void {
    let id = this.service.dadosUsuario.id;
    this.service.saldo(id).subscribe (item => {
      this.saldo = item;
    });
  }

  sair(){
    this.router.navigate(['']);
  }
}
