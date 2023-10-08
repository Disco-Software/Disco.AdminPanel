export class LoaderAddAction {
  static readonly type = "[Loader] Add";

  constructor(public payload: string[] | string) {
  }
}

export class LoaderRemoveAction {
  static readonly type = "[Loader] Remove";

  constructor(public payload: string[] | string) {
  }
}
