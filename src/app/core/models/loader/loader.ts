export namespace Loader {
  export type Item = string;

  export interface Progress {
    id: string | number;
    status: number;
  }

  export type State = {
    list: Item[];
    progress: Progress[];
  };
}
