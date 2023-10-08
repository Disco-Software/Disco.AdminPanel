import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import * as _components from './components';

const COMPONENTS = [_components.PostsListComponent, _components.PostComponent];

const MODULES = [CommonModule, PostRoutingModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class PostsModule {}
