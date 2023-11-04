import {GetAllAccountsModel} from "./getaccounts.model";

export interface AccountStateInterface {
  allAccounts: GetAllAccountsModel[],
  count: number
}
