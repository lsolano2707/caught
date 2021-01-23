import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataUtil } from '../../_util/data-util';

@Component({
  selector: 'lesson-icon-font',
  templateUrl: './lesson-icon-font.component.html',
  styleUrls: ['./lesson-icon-font.component.css']
})
export class LessonIconFontComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() data: any;
  @Input() idLesson: string;
  @Input() searchText: string;

  filter: any;
  orderBy = 'englishValue';
  sort = 'asc';
  countData = 0;
  dataFilter: any = [];
  pageSize = 25;
  totalPages: number;
  currentPage = 1;

  ngOnInit() {
    // console.log('data:', JSON.stringify(this.data));
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    this.dataFilter = this.data.slice((this.currentPage - 1) * this.pageSize, this.pageSize * this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges) {

    // tslint:disable-next-line:forin
    for (const propName in changes) {
      const change = changes[propName];
      switch (propName) {
        case 'searchText': {
          this.getData(change.currentValue);
          break;
        }
      }
    }
  }

  getCurrentPage(val) {
    this.currentPage = val;
    this.getData(this.searchText);
  }

  getData(search: string) {
    this.filter = { englishValue: search, spanishValue: search };
    const dataFilter = DataUtil.applyFiltersToData(this.data, this.filter, this.currentPage, this.pageSize,
      this.orderBy, this.sort);
    this.dataFilter = dataFilter.data;
    this.countData = dataFilter.count;
    this.totalPages = Math.ceil(this.countData / this.pageSize);
  }

  play(event) {
    event.target.firstElementChild.play();
  }

}
