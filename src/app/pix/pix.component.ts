import { Component, OnInit } from '@angular/core';
import { PixService } from './pix.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent implements OnInit {
  pixForm!: FormGroup;
  userId: number | null = null;

  constructor(
    private pixService: PixService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(userId => {
      this.userId = userId;
      this.initializeForm();
    });
  }

  private initializeForm(): void {
    this.pixForm = this.fb.group({
      correntista: this.fb.group({
        id: [this.userId, Validators.required]
      }),
      valor: ['', [Validators.required, Validators.min(0)]],
      chave: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  realizarPix(): void {
    console.log('Início da função realizarPix');

    if (this.pixForm.valid) {
      const pixData = this.pixForm.value;

      this.pixService.processarPix(pixData).pipe(
        switchMap(response => {
          console.log('PIX realizado com sucesso!', response);
          // Lógica adicional após o sucesso, se necessário
          this.pixForm.reset(); // Limpar o formulário após o sucesso
          return this.authService.getUserId(); // Atualizar o ID do usuário, se necessário
        }),
        catchError(error => {
          console.error('Erro ao realizar PIX', error);
          // Lógica adicional para tratamento de erro
          throw error; // Rejeitar o erro para que seja tratado no próximo bloco catch
        })
      ).subscribe(
        userId => {
          console.log('ID do usuário atualizado:', userId);
        },
        error => {
          // Tratamento de erro adicional, se necessário
        }
      );
    } else {
      // Trate os campos inválidos, se necessário
    }

    console.log('Fim da função realizarPix');
  }
}
