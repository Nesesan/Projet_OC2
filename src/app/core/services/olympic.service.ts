import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private errorMessage$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    this.isLoading$.next(true);
    this.errorMessage$.next(null);

    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value);
        this.isLoading$.next(false);
      }),
      catchError((error: unknown) => {
        console.error(error);
        this.errorMessage$.next('Failed to load Olympic data');
        this.isLoading$.next(false);
        return throwError(() => error);
      })
    );
  }

  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  getLoadingStatus(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  getErrorMessage(): Observable<string | null> {
    return this.errorMessage$.asObservable();
  }
}
