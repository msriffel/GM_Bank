import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorrentistaService {
  loginValido: boolean = false;
  dadosUsuario: any;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.tryLoadUserData();
  }

  setDadosUsuario(data: any): void {
    this.dadosUsuario = data;
    localStorage.setItem('dadosUsuario', JSON.stringify(data));
  }

  clearDadosUsuario(): void {
    this.dadosUsuario = null;
    localStorage.removeItem('dadosUsuario');
  }

  private tryLoadUserData(): void {
    if (this.authService.isLoggedIn()) {
      const storedData = localStorage.getItem('dadosUsuario');
      if (storedData) {
        this.dadosUsuario = JSON.parse(storedData);
       
        if (this.dadosUsuario.id) {
          this.obterDadosUsuarioAutenticado().subscribe(
            response => this.setDadosUsuario(response),
            error => console.error('Erro ao obter dados do usuário:', error)
          );
        }
      }
    }
  }

  public login(cpf: string, senha: string): Observable<any> {
    return this.http.post("http://localhost:8080/correntista/login", { cpf, senha });
  }

  public saldo(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/movimentacao/saldo/" + id);
  }

  public cadastrar(correntista: any): Observable<any> {
    return this.http.post("http://localhost:8080/correntista", correntista);
  }

  public obterUltimoNumeroConta(): Observable<string> {
    return this.http.get<string>("http://localhost:8080/correntista/obterUltimoNumeroConta");
  }

  public extrato(id: number): Observable<any[]> {
    return this.http.get<any>("http://localhost:8080/movimentacao/extrato/" + id);
  }

  // Método adicional para obter dados do usuário autenticado
  public obterDadosUsuarioAutenticado(): Observable<any> {
    return this.authService.getUserId().pipe(
      switchMap(userId => this.http.get("http://localhost:8080/correntista/" + userId))
    );
  }
}
