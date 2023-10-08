import {Action, createSelector, Selector, State, StateContext,} from "@ngxs/store";
import {LoaderAddAction, LoaderRemoveAction} from "./loader.actions";
import {Injectable} from "@angular/core";
import {Loader} from "@core/models";

@State<Loader.State>({
  name: "LoaderState",
  defaults: {
    list: [],
    isLoading: false,
  },
})
@Injectable()
export class LoaderState {

  @Selector()
  static isLoadingSelector({isLoading}: Loader.State) {
    return isLoading;
  }
  @Selector()
  static getListSelector({ list }: Loader.State) {
    return list;
  }

  static getAny(items: string[]) {
    return createSelector(
      [LoaderState],
      ({ list }: Loader.State) => !!list.find((key) => items.indexOf(key) >= 0)
    );
  }

  @Action(LoaderAddAction)
  addItem(
    { getState, patchState }: StateContext<Loader.State>,
    { payload }: LoaderAddAction
  ) {
    const { list } = getState();

    patchState({
      list: filterList(list, payload).concat(payload),
      isLoading: true
    });
  }

  @Action(LoaderRemoveAction)
  removeItem(
    { getState, patchState }: StateContext<Loader.State>,
    { payload }: LoaderRemoveAction
  ) {
    const { list } = getState();

    patchState({
      list: filterList(list, payload),
      isLoading: false
    });
  }
}

function filterList(list: string[], payload: string[] | string) {
  if (Array.isArray(payload)) {
    return list.filter((name) => payload.indexOf(name) < 0);
  }

  return list.filter((name) => name !== payload);
}
