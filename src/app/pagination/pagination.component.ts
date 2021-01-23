import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalPagesInput: number;
  @Input() currentPage: number;
  @Output() currentPageEvent = new EventEmitter();

  totalPages: number;
  pages = [];

  constructor() { }


  ngOnInit() {
    this.totalPages = this.totalPagesInput;
    this.pages = this.getPages(this.currentPage);
    this.currentPageEvent.emit(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges) {

    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      const to = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      // const changeLog = `${propName}: changed from ${from} to ${to} `;
      //  console.log(changeLog);

      switch (propName) {
        case 'totalPagesInput': {
          this.totalPages = this.totalPagesInput;
          this.pages = this.getPages(this.currentPage);
          break;
        }
      }
    }
  }

  getPages(current) {
    const last = this.totalPages,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [];
    this.pages = [];
    let l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || i >= left && i < right) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          this.pages.push(l + 1);
        } else if (i - l !== 1) {
          this.pages.push('...');
        }
      }
      this.pages.push(i);
      l = i;
    }

    return this.pages;
  }

  changePage(page?) {
    if (page) {
      this.currentPage = page;
      this.getPages(page);
      this.currentPageEvent.emit(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.getPages(this.currentPage);
      this.currentPageEvent.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.getPages(this.currentPage);
      this.currentPageEvent.emit(this.currentPage);
    }
  }

}

