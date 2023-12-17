import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Output() onEnterButtonClickEmitter = new EventEmitter<string>();

  public search : string;

  public onEnterButtonClick(){
    this.onEnterButtonClickEmitter.emit(this.search)
  }
}
