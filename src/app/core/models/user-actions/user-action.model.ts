import { EventEmitter } from "@angular/core";

export interface UserActionModel{
  name : string;
  icon : string;
  onClickEvent : Function;
}
