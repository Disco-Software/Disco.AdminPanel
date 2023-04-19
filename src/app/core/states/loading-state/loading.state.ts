import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AddLoading, RemoveLoading } from './loading.action';

@State({
    name: 'LoadingState',
    defaults: false
})
export class LoadingState{
  @Selector()
  public static isLoading(isLoading: boolean){
     return isLoading;
  }

  @Action(AddLoading)
  addLoading({patchState} : StateContext<any>): void{
     patchState({isLoading: true});
  }

  @Action(RemoveLoading)
  removeLoading({patchState} : StateContext<any>){
    patchState({isLoading: false});
  }
}
