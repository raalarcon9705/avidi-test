import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Market } from '../interfaces';
import { MarketsService } from '../services/markets.service';

@Injectable({
  providedIn: 'root'
})
export class MarketResolver implements Resolve<Market> {
  constructor(private marketsService: MarketsService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Market> {
    return this.marketsService.loadMarket(route.paramMap.get('id')!);
  }
}
