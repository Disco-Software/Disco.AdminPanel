export interface EmailSendingRequestModel{
  toEmails : string[];
  name : string;
  title : string;
  body : string;
  isHtml : boolean;
}
