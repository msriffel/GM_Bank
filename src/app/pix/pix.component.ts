import { Component, OnInit } from '@angular/core';
import { PixService } from './pix.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css'],
  providers: [MessageService]
})
export class PixComponent implements OnInit {
  pixForm!: FormGroup;
  userId: number | null = null;

  constructor(
    private pixService: PixService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  home() {
    this.router.navigate(['principal']);
  }

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

    if (this.areAllFieldsFilled()) {
      const pixData = this.pixForm.value;

      this.pixService.processarPix(pixData).pipe(
        switchMap(response => {
          console.log('PIX realizado com sucesso!', response);
          this.showSuccessNotification();
          this.pixForm.reset();
          return this.authService.getUserId();
        }),
        catchError(error => {
          console.error('Erro ao realizar PIX', error);
          this.showErrorNotification();
          throw error;
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
      this.showWarningNotification();
    }

    console.log('Fim da função realizarPix');
  }

  private areAllFieldsFilled(): boolean {
    const formControls = this.pixForm.controls;
    return Object.values(formControls).every(control => !!control.value);
  }

  private showSuccessNotification(): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'PIX realizado com sucesso!' });
  }

  private showErrorNotification(): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar PIX.' });
  }

  private showWarningNotification(): void {
    this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Por favor, preencha todos os campos.' });
  }
}
