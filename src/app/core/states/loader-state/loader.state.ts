import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from "@ngxs/store";
import { LoaderAdd, LoaderRemove } from "./loader.actions";
import { LOADER_DEFAULTS as defaults } from "./loader.defaults";
import { Injectable } from "@angular/core";
import { Loader } from "@core/models";

@State<Loader.State>({
  name: "LoaderState",
  defaults,
})
@Injectable()
export class LoaderState {
  @Selector()
  static getList({ list }: Loader.State) {
    return list;
  }

  static getAny(items: Loader.Item[]) {
    return createSelector(
      [LoaderState],
      ({ list }: Loader.State) => !!list.find((key) => items.indexOf(key) >= 0)
    );
  }

  @Action(LoaderAdd)
  addItem(
    { getState, patchState }: StateContext<Loader.State>,
    { payload }: LoaderAdd
  ) {
    const { list } = getState();

    patchState({
      list: filterList(list, payload).concat(payload),
    });
  }

  @Action(LoaderRemove)
  removeItem(
    { getState, patchState }: StateContext<Loader.State>,
    { payload }: LoaderRemove
  ) {
    const { list } = getState();

    patchState({
      list: filterList(list, payload),
    });
  }
}

function filterList(list: Loader.Item[], payload: Loader.Item[] | Loader.Item) {
  if (Array.isArray(payload)) {
    return list.filter((name) => payload.indexOf(name) < 0);
  }

  return list.filter((name) => name !== payload);
}
