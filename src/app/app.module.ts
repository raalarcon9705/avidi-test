import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { OverlayModule } from "@angular/cdk/overlay";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketsListComponent } from './pages/markets-list/markets-list.component';
import { MarketDetailsComponent } from './pages/market-details/market-details.component';
import { MarketFormComponent } from './components/market-form/market-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketsFilterComponent } from './components/markets-filter/markets-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketsListComponent,
    MarketDetailsComponent,
    MarketFormComponent,
    MarketsFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
