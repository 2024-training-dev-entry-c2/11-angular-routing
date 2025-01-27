import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.dev";
import { AuthService } from "../../features/auth/services/auth.services";
import { Transaction } from "../../features/dashboard/interfaces/transaction.interface";

@Injectable({
    providedIn: 'root'
   })
   export class TransactionService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private apiUrl = `${environment.apiUrl}/transactions`;
   
    private get headers() {
      return new HttpHeaders().set('Authorization', `Bearer ${this.authService.tokenSignal()}`);
    }
   
    createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
      return this.http.post<Transaction>(this.apiUrl, transaction, { headers: this.headers });
    }
   
    getTransactions(): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(this.apiUrl+"/ /account", { headers: this.headers });
    }
    
   }