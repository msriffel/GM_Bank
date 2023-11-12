import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

enum AuthenticationState {
  Authenticated = 'authenticated',
  NotAuthenticated = 'not_authenticated',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticationState = new BehaviorSubject<AuthenticationState>(AuthenticationState.NotAuthenticated);
  private userId = new BehaviorSubject<number | null>(null);

  constructor() {}

  setAuthenticated(value: boolean, userId: number | null = null): void {
    this.authenticationState.next(value ? AuthenticationState.Authenticated : AuthenticationState.NotAuthenticated);
    this.userId.next(userId);
  }

  logout(): void {
    this.setAuthenticated(false, null);
    // Limpe dados sensíveis, se houver
  }

  getAuthenticationState(): Observable<AuthenticationState> {
    return this.authenticationState.asObservable();
  }

  getUserId(): Observable<number | null> {
    return this.userId.asObservable();
  }
}
