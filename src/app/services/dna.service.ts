import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DnaService {
  private readonly remoteBase = 'https://wise-kingfisher-1srtohrus-a8b5aca5.koyeb.app';
  private baseUrl = (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname))
    ? '/api'
    : this.remoteBase;

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    const url = `${this.baseUrl}/stats`;
    console.info('[DNA API] GET', url);
    return this.http.get(url).pipe(
      tap((res) => console.debug('[DNA API] Response GET', url, res)),
      catchError((err: HttpErrorResponse) => {
        console.error('[DNA API] Error GET', url, {
          status: err.status,
          message: err.message,
          error: err.error
        });
        return throwError(() => err);
      })
    );
  }

  getList(): Observable<any> {
    const url = `${this.baseUrl}/list`;
    console.info('[DNA API] GET', url);
    return this.http.get(url).pipe(
      tap((res) => console.debug('[DNA API] Response GET', url, res)),
      catchError((err: HttpErrorResponse) => {
        console.error('[DNA API] Error GET', url, {
          status: err.status,
          message: err.message,
          error: err.error
        });
        return throwError(() => err);
      })
    );
  }

  checkMutation(dna: string[]): Observable<{ mutation: boolean; status: number; body?: any }> {
    const url = `${this.baseUrl}/mutation`;
    const body = { dna };
    console.info('[DNA API] POST', url, 'payload:', body);
    return this.http.post(url, body, { observe: 'response' }).pipe(
      map((res) => {
        console.debug('[DNA API] Response POST', url, res);
        return { mutation: true, status: res.status, body: res.body };
      }),
      catchError((err: HttpErrorResponse) => {
    
        if (err.status === 403) {
          console.warn('[DNA API] POST 403 (no mutation)', url, { payload: body });
          return of({ mutation: false, status: err.status, body: err.error });
        }
        console.error('[DNA API] Error POST', url, {
          status: err.status,
          message: err.message,
          error: err.error,
          payload: body
        });
        return throwError(() => err);
      })
    );
  }

  getBaseUrl(): string {
    return this.baseUrl.startsWith('/') ? `${this.remoteBase}` : this.remoteBase;
  }
}
