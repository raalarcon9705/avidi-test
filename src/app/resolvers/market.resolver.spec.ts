import { TestBed } from '@angular/core/testing';

import { MarketResolver } from './market.resolver';

describe('MarketResolver', () => {
  let resolver: MarketResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MarketResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
