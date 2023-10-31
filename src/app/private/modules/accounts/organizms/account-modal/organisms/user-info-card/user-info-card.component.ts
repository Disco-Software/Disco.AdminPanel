import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.scss']
})
export class UserInfoCardComponent implements OnInit {

  @Input() public title: string;
  @Input() public content : string;
  @Input() public isEditable : boolean = true;

  @Output() public onEdit = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public eventEmit(){
    this.onEdit.emit();
  }

}
