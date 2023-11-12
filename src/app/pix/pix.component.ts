import { Component, OnInit } from '@angular/core';
import { PixService } from './pix.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent implements OnInit {
  pixForm!: FormGroup; // Adicione "!" para indicar que a variável será inicializada no ngOnInit

  constructor(private pixService: PixService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pixForm = this.fb.group({
      correntista: this.fb.group({
        id: [1, Validators.required]
      }),
      valor: ['', [Validators.required, Validators.min(0)]],
      chave: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  realizarPix() {
    if (this.pixForm.valid) {
      const pixData = this.pixForm.value;
      this.pixService.processarPix(pixData).subscribe(
        response => {
          console.log('PIX realizado com sucesso!', response);
          // Lógica adicional após o sucesso
        },
        error => {
          console.error('Erro ao realizar PIX', error);
          // Lógica adicional para tratamento de erro
        }
      );
    } else {
      // Trate os campos inválidos, se necessário
    }
  }
}
