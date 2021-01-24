import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataUtil } from '../../_util/data-util';

import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'lesson-images',
  templateUrl: './lesson-images.component.html',
  styleUrls: ['./lesson-images.component.css']
})
export class LessonImagesComponent implements OnInit, OnChanges {

  constructor(private loaderService: LoaderService) { }

  @Input() data: any;
  @Input() idLesson: string;
  @Input() searchText: string;

  filter: any;
  orderBy = '';
  sort = '';
  countData = 0;
  dataFilter: any = [];
  pageSize = 25;
  totalPages: number;
  currentPage = 1;

  ngOnInit() {
    this.loaderService.show();
    // console.log('data:', JSON.stringify(this.data));
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    this.dataFilter = this.data.slice((this.currentPage - 1) * this.pageSize, this.pageSize * this.currentPage);
    this.loaderService.hide();
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

  play(event) {
    event.target.firstElementChild.play();
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

}
