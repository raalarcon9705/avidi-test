import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketDetailsComponent } from './pages/market-details/market-details.component';
import { MarketsListComponent } from './pages/markets-list/markets-list.component';
import { MarketResolver } from './resolvers/market.resolver';

const routes: Routes = [
  {
    path: 'markets/:id',
    component: MarketDetailsComponent,
    resolve: {
      market: MarketResolver
    }
  },
  {
    path: 'markets',
    component: MarketsListComponent
  },
  {
    path: '',
    redirectTo: 'markets',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
