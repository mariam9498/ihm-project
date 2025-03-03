import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public httpApi: HttpClient
  ) { }

  login(email: string, password: string): Observable<boolean> {
    return this.httpApi.post('https://reqres.in/api/login', {
      email,
      password
    }).pipe(
      tap((response: any) => localStorage.setItem('token', response?.token)),
      map((response: any) => !!response?.token),
      catchError(() => of(false))
    );
  }

  getUserList() {
    return this.httpApi.get('https://reqres.in/api/users?page=1').pipe(
      map((response: any) => response?.data)
    );
  }

  getUserDetail(id: number): Observable<any> {
    return this.httpApi.get(`https://reqres.in/api/users/${id}`).pipe(
      map((response: any) => response?.data)
    );
  }

  addUser(name: string, job: string): Observable<boolean>{
    return this.httpApi.post('https://reqres.in/api/users', {
      name,
      job
    }).pipe(
        map((response: any) => !!response?.createdAt),
        catchError(() => of(false))
    );
  }

  isMinPrice(price: number): boolean {
    const priceRef = 12;
    return price < priceRef;
  }

  deleteUser(id: number){
    console.log("HTTP DELETE : Deleting user "+ id)
    return this.httpApi.delete(`https://reqres.in/api/users/${id}`).pipe(
      map((response: any) => response?.data)
    );
  }
}
