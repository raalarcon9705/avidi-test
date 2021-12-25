import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  Inject,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Market } from 'src/app/interfaces';
import { MarketsService } from 'src/app/services/markets.service';

@Component({
  selector: 'app-markets-list',
  templateUrl: './markets-list.component.html',
  styleUrls: ['./markets-list.component.scss'],
})
export class MarketsListComponent implements OnInit {
  @ViewChild('createModal', { static: true })
  createModalTemplate!: TemplateRef<any>;
  loading$ = this.marketsService.loading$;
  overlayRef?: OverlayRef;
  markets: Market[] = [];

  filterIcon = {
    ASC: '↑',
    DESC: '↓',
  };

  page = 1;
  limit = 12;
  pagesCount = 0;

  filter: { [key: string]: string | null | undefined } = {};

  constructor(
    private marketsService: MarketsService,
    @Inject(DOCUMENT) private doc: Document,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
    this.loadMarkets();
  }

  loadMarkets() {
    this.updateQueryParams();
    this.marketsService
      .loadMarkets(this.page, this.limit, this.filter)
      .subscribe((res) => {
        this.markets = res.data;
        this.pagesCount = res.pageCount;
      });
  }

  openCreateModal() {
    this.overlayRef = this.overlay.create({
      maxWidth: 600,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
    });
    this.overlayRef.backdropClick().subscribe(() => this.closeModal());
    this.overlayRef.attach(
      new TemplatePortal(this.createModalTemplate, this.vcr)
    );
  }

  closeModal() {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }

  createMarket(data: Market) {
    this.marketsService.createMarket(data).subscribe(() => {
      this.closeModal();
      this.doc.scrollingElement?.scroll({ top: 0, behavior: 'smooth' });
    });
  }

  toggleFilter(name: string) {
    if (!this.filter[name]) {
      this.filter[name] = 'ASC';
    } else if (this.filter[name] === 'ASC') {
      this.filter[name] = 'DESC';
    } else {
      delete this.filter[name];
    }
    this.page = 1;
    this.loadMarkets();
  }

  setPage(page: number) {
    this.page = page;
    this.loadMarkets();
  }

  updateQueryParams() {
    const win = this.doc.defaultView;
    if (win && win.history) {
      let newUrl =
        win.location.protocol +
        '//' +
        win.location.host +
        win.location.pathname;
      newUrl += `?page=${this.page}&limit=${this.limit}`;
      if (this.filter['s']) {
        newUrl += `&s=${this.filter['s']}`;
      }
      if (this.filter['createdAt']) {
        newUrl += `&sort=createdAt,${this.filter['createdAt']}`;
      }
      if (this.filter['name']) {
        newUrl += `&sort=name,${this.filter['name']}`;
      }
      if (this.filter['symbol']) {
        newUrl += `&sort=symbol,${this.filter['symbol']}`;
      }
      if (this.filter['country']) {
        newUrl += `&sort=country,${this.filter['country']}`;
      }
      if (this.filter['sector']) {
        newUrl += `&sort=sector,${this.filter['sector']}`;
      }
      win.history.pushState({ path: newUrl }, '', newUrl);
    }
  }

  getQueryParams() {
    const params = this.route.snapshot.queryParamMap;
    this.page = +(params.get('page') ?? '1');
    this.limit = +(params.get('limit') ?? '12');
    this.filter['s'] = params.get('s') ?? '';
    const url = this.doc.defaultView?.location.href;
    const sorts = url!.split('&')
      .filter(s => s.startsWith('sort'))
      .map(s => s.split('='))
      .map(s => s[1]);
    for (const s of sorts) {
      const pair = s.split(',');
      this.filter[pair[0]] = pair[1];
    }

  }

  handleSearchSubmit(ev: Event) {
    ev.preventDefault();
    this.page = 1;
    this.loadMarkets();
  }
}
