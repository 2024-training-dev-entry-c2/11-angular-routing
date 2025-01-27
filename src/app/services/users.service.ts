import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser, IUserRequest } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  createUser(userRequest: IUserRequest): Observable<IUser> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<IUser>(`${this.baseUrl}`, userRequest, { headers });
  }

  getAllUsers(): Observable<IUser[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<IUser[]>(`${this.baseUrl}`, { headers });
  }

  getUserById(id: string): Observable<IUser | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    // Suponiendo que la API devuelve todos los usuarios
    return this.http.get<IUser[]>(`${this.baseUrl}`, { headers }).pipe(
      map(users => {
        const foundUser = users.find(user => user.id === id);
        if (!foundUser) {
          console.warn(`Usuario con ID ${id} no encontrado.`);
        }
        return foundUser || null;  // Devuelve el usuario o null si no se encuentra
      }),
      catchError(error => {
        console.error("Error al obtener los usuarios:", error);
        return of(null);  // Devuelve null en caso de error
      })
    );
  }
}
