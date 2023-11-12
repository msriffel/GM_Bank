import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CorrentistaService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  loginValido: boolean = false;
  dadosUsuario: any;

  public login(cpf: string): Observable<any> {
    return this.http.get("http://localhost:8080/correntista/entrar/" + cpf);
  }

  public saldo(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/movimentacao/" + id);
  }

  public cadastrar(correntista: any): Observable<any> {
    return this.http.post("http://localhost:8080/correntista", correntista);
  }

  public obterUltimoNumeroConta(): Observable<string> {
    return this.http.get<string>("http://localhost:8080/correntista/obterUltimoNumeroConta");
  }

  // Método adicional para obter dados do usuário autenticado
  public obterDadosUsuarioAutenticado(): Observable<any> {
    return this.authService.getUserId().pipe(
      // Use o operador switchMap para transformar o ID do usuário em dados do usuário
      switchMap(userId => this.http.get("http://localhost:8080/correntista/" + userId))
    );
  }
}
