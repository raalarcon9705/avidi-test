import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { GetManyMarketResponseDto, Market } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  private readonly apiUrlBase = 'http://173.212.193.40:5486';

  private _loading$ = new BehaviorSubject(false);

 
  get loading$() {
    return this._loading$.asObservable()
  }

  // get selected$() {
  //   return this._selected$.asObservable()
  // }


  constructor(private http: HttpClient) { }

  loadMarkets(page = 1, limit = 12, filter = {}) {
    this._loading$.next(true)
    const offset = (page - 1) * limit;
    const params = this.serialize(offset, limit, filter);
    return this.http.get<GetManyMarketResponseDto>(`${this.apiUrlBase}/markets${params}`).pipe(
      tap({
        complete: () => this._loading$.next(false)
      })
    )
  };

  loadMarket(id: string) {
    return this.http.get<Market>(`${this.apiUrlBase}/markets/${id}`)
  }

  updateMarket(market: Market) {
    this._loading$.next(true);
    return this.http.patch<Market>(`${this.apiUrlBase}/markets/${market.id}`, market).pipe(
      tap({
        complete: () => this._loading$.next(false)
      })
    )
  }

  createMarket(market: Market) {
    this._loading$.next(true);
    return this.http.post<Market>(`${this.apiUrlBase}/markets`, market).pipe(
      tap({
        complete: () => this._loading$.next(false)
      })
    )
  }

  deleteMarket(id: number) {
    this._loading$.next(true);
    return this.http.delete(`${this.apiUrlBase}/markets/${id}`).pipe(
      tap({
        complete: () => this._loading$.next(false)
      })
    )
  }

  serialize(offset:number, limit: number, f: any) {
    let filter = `?offset=${offset}&limit=${limit}`;
    if (f.s) {
      filter += `&s=${f.s}`;
    }
    if (f.createdAt) {
      filter += `&sort=createdAt,${f.createdAt}`;
    }
    if (f.name) {
      filter += `&sort=name,${f.name}`;
    }
    if (f.symbol) {
      filter += `&sort=symbol,${f.symbol}`;
    }
    if (f.country) {
      filter += `&sort=country,${f.country}`;
    }
    if (f.sector) {
      filter += `&sort=sector,${f.sector}`;
    }
    return filter;
  }
}
