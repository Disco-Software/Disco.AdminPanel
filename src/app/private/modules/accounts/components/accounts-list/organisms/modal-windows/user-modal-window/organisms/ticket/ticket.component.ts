import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() public title : string;
  @Input() public description : string;


  selecte
  constructor() { }

  ngOnInit(): void {
  }

}
