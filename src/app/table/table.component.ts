import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() idLesson: string;
  @Input() config: any;
  @Input() columns: any[];
  @Input() data: any[];
  @Output() responseEvent = new EventEmitter();

  totalPages: number;
  selectedColumn: any;
  selectedRow: any;
  searchText: string;
  form: FormGroup;

  response = {
    currentPage: 0,
    search: '',
    orderBy: '',
    sort: '',
    event: '',
    selected: ''
  };

  constructor() { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.config.countData / this.config.pageSize);
    this.data = this.data.slice(0, this.config.pageSize);
    this.response.currentPage = this.config.currentPage;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalPages = Math.ceil(this.config.countData / this.config.pageSize);
    this.data = this.data.slice(0, this.config.pageSize);
    // this.response.currentPage = this.config.currentPage;
  }

  onSelectColumn(column) {
    this.selectedColumn = column;
    if (this.response.orderBy !== column.field) {
      this.response.sort = 'asc';
    } else {
      this.response.sort = this.response.sort === 'asc' ? 'desc' : 'asc';
    }
    this.response.orderBy = column.field;
    this.response.currentPage = 1;
    this.responseEvent.emit(this.response);
  }

  buscar() {
    this.response.search = this.searchText;
    this.response.currentPage = 1;
    this.responseEvent.emit(this.response);
  }

  getEvent(event, obj) {
    this.response.event = event;
    this.response.selected = obj;
    this.responseEvent.emit(this.response);
  }

  getCurrentPage(val) {
    this.response.currentPage = val;
    this.responseEvent.emit(this.response);
  }

  play(event) {
    event.target.firstElementChild.play();
  }

}
