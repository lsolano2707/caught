import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { TableUtil } from '../../table/table-util';

@Component({
  selector: 'lesson-verb',
  templateUrl: './lesson-verb.component.html',
  styleUrls: ['./lesson-verb.component.css']
})
export class LessonVerbComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() data: any;
  @Input() idLesson: string;
  @Input() searchText: string;

  dataTable;
  filter: any;
  responseTable: any = {};

  columns = [
    { title: 'PRESENT', field: 'englishPresentValue', type: 'text', sort: true },
    { title: 'PAST', field: 'englishPastValue', type: 'text', sort: true },
    { title: 'PAST PARTICIPLE', field: 'englishPastParticipleValue', type: 'text', sort: true },
    { title: 'SPANISH', field: 'spanishValue', type: 'text', sort: true }
  ];

  config = {
    pageSize: 30,
    currentPage: 1,
    countData: 0
  };

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.dataTable = this.data.slice((this.config.currentPage - 1) * this.config.pageSize,
        this.config.pageSize * this.config.currentPage);
      this.config.countData = this.data.length;
    }

    this.form.valueChanges.subscribe(() => {
      this.columns = [];
      if (this.form.get('present').value) {
        this.columns.push({ title: 'PRESENT', field: 'englishPresentValue', type: 'text', sort: true });
      }
      if (this.form.get('past').value) {
        this.columns.push({ title: 'PAST', field: 'englishPastValue', type: 'text', sort: true });
      }
      if (this.form.get('pastParticiple').value) {
        this.columns.push({ title: 'PAST PARTICIPLE', field: 'englishPastParticipleValue', type: 'text', sort: true });
      }
      if (this.form.get('spanish').value) {
        this.columns.push({ title: 'SPANISH', field: 'spanishValue', type: 'text', sort: true });
      }
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      present: [true],
      past: [true],
      pastParticiple: [true],
      spanish: [true],
    });
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
    this.filter = { englishPresentValue: search, englishPastValue: search, englishPastParticipleValue: search, spanishValue: search };
    const dataFilter = TableUtil.applyFiltersToData(this.data, this.filter, this.responseTable.currentPage, this.config.pageSize,
      this.responseTable.orderBy, this.responseTable.sort);
    this.dataTable = dataFilter.data;
    this.config.countData = dataFilter.count;
  }

}
