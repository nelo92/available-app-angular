import { Status } from './../../services/availableapp.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styles: [
  ]
})
export class StatusComponent {

  @Input() value: Status;

  constructor() { }

}
