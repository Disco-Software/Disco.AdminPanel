import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../core/services/page.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(private _pageService: PageService) { }

  ngOnInit(): void {
    this._pageService.setTitle({
      pageName: 'Posts',
      pageIcon: 'posts'
    })
  }

}
