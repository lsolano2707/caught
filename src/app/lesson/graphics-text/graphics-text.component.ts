import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'graphics-text',
  templateUrl: './graphics-text.component.html',
  styleUrls: ['./graphics-text.component.css']
})
export class GraphicsTextComponent implements OnInit {

  constructor() { }

  @Input() data: any;
  @Input() idLesson: string;
  @Input() searchText: string;

  ngOnInit() {
    console.log('data:', JSON.stringify(this.data));
  }

  search(val) {
    this.searchText = val;
  }

  play(event) {
    event.target.firstElementChild.play();
  }

}
