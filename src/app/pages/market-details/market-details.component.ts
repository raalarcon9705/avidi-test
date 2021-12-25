import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Market } from 'src/app/interfaces';
import { MarketsService } from 'src/app/services/markets.service';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDetailsComponent implements OnInit {
  @ViewChild('editModal', { static: true }) editModalTemplate!: TemplateRef<any>;
  overlayRef?: OverlayRef;
  market!: Market;
  isOpen = false;

  constructor(private route: ActivatedRoute, private overlay: Overlay, private vcr: ViewContainerRef, private marketsService: MarketsService) { }

  ngOnInit(): void {
    this.market = this.route.snapshot.data['market'];
  }
  openEditModal() {
    this.overlayRef = this.overlay.create({
      maxWidth: 600,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this.overlayRef.backdropClick().subscribe(() => this.closeModal());
    this.overlayRef.attach(new TemplatePortal(this.editModalTemplate, this.vcr))
  }

  closeModal() {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }

  editMarket(market: Market) {
    this.marketsService.updateMarket(market).subscribe((market) => {
      this.closeModal();
      this.market = market;
    })
  }

}
