declare var require: any;
import { Component, OnInit } from '@angular/core';
const version = require('../../package.json').version;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'caught';
  year = new Date().getFullYear();
  version = version;
  valueInParentComponent;

  ngOnInit() {
    console.log('version', version, new Date().getFullYear());
  }


  onValueInParentComponentChanged(value: string) {
    this.valueInParentComponent = value;
  }
}
