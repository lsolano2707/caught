import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableUtil } from '../../table/table-util';

@Component({
  selector: 'lesson-vocabulary',
  templateUrl: './lesson-vocabulary.component.html',
  styleUrls: ['./lesson-vocabulary.component.css']
})
export class LessonVocabularyComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() data: any;
  @Input() idLesson: string;
  @Input() searchText: string;

  dataTable;
  filter: any;
  responseTable: any = {};

  columns = [
    { title: 'ENGLISH', field: 'englishValue', type: 'text', sort: true },
    { title: 'SPANISH', field: 'spanishValue', type: 'text', sort: true }
  ];

  config = {
    pageSize: 30,
    currentPage: 1,
    countData: 0
  };

  ngOnInit() {
    // console.log('data:', JSON.stringify(this.data));
    if (this.data) {
      this.dataTable = this.data.slice((this.config.currentPage - 1) * this.config.pageSize,
        this.config.pageSize * this.config.currentPage);
      this.config.countData = this.data.length;
    }
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

  getResponseTable(val) {
    this.responseTable = val;
    this.getData(this.searchText);
  }

  getData(search: string) {
    this.filter = { englishValue: search, spanishValue: search };
    const dataFilter = TableUtil.applyFiltersToData(this.data, this.filter, this.responseTable.currentPage, this.config.pageSize,
      this.responseTable.orderBy, this.responseTable.sort);
    this.dataTable = dataFilter.data;
    this.config.countData = dataFilter.count;
  }

}
