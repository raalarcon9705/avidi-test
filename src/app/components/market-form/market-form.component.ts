import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Market } from 'src/app/interfaces';

@Component({
  selector: 'app-market-form',
  templateUrl: './market-form.component.html',
  styleUrls: ['./market-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketFormComponent implements OnInit {
  @Input() market?: Market;
  @Input() title?: string;

  @Output() cancel = new EventEmitter();
  @Output() submit = new EventEmitter<Market>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.market?.name ?? '', [Validators.required]],
      country: [this.market?.country ?? '', [Validators.required]],
      industry: [this.market?.industry ?? '', [Validators.required]],
      lastPrice: [this.market?.lastPrice, [Validators.required]],
      marketCap: [this.market?.marketCap, [Validators.required]],
      netChange: [this.market?.netChange, [Validators.required]],
      netChangePercent: [this.market?.netChangePercent ?? '', [Validators.required]],
      sector: [this.market?.sector, [Validators.required]],
      symbol: [this.market?.symbol ?? '', [Validators.required]],
    })
  }

  handleCancel() {
    this.cancel.emit();
  }

  handleSubmit() {
    const data = {
      ...this.market,
      ...this.form.getRawValue()
    };
    this.submit.emit(data);
  }

}
