import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PixComponent } from './pix/pix.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'principal', component: PrincipalComponent
  },
  { 
    path: 'cadastro', component: CadastroComponent 
  },
  { 
    path: 'pix', component: PixComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
