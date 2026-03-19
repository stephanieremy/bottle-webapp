import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bottle } from '../../shared/models/bottle.model';

@Injectable({ providedIn: 'root' })
export class BottleService {
  private http = inject(HttpClient);

  getAll(): Observable<Bottle[]> {
    return this.http.get<Bottle[]>('/bottle');
  }

  getById(id: string): Observable<Bottle> {
    return this.http.get<Bottle>(`/bottle/${id}`);
  }

  create(bottle: Omit<Bottle, 'id'>): Observable<Bottle> {
    return this.http.post<Bottle>('/bottle', bottle);
  }

  update(id: string, bottle: Partial<Bottle>): Observable<Bottle> {
    return this.http.put<Bottle>(`/bottle/${id}`, bottle);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/bottle/${id}`);
  }
}
