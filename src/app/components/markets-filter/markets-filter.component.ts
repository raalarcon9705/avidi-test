import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-markets-filter',
  templateUrl: './markets-filter.component.html',
  styleUrls: ['./markets-filter.component.scss']
})
export class MarketsFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<any>();

  f: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  toggle(name: string) {
    if (this.f[name] === 'ASC') {
      this.f[name] = 'DESC'
    } else if (this.f[name] === 'DESC') {
      delete this.f[name];
    } else {
      this.f[name] = 'ASC';
    }
  }

  onSearchChange(ev: any) {
    if (ev.target.value) {
      this.f.s = ev.target.value;
    } else {
      delete this.f.s;
    }
  }

  filterClick() {
    this.filter.emit(this.f);
  }

}
