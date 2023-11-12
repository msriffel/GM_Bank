import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent {

  constructor(
    private router: Router
  ) {}

  home() {
    this.router.navigate(['principal']);
  }
}
