import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { EditNoticeComponent } from './edit-notice/edit-notice.component';
import { NoticeListComponent } from './notice-list/notice-list.component';

// const routes: Routes = [];

const routes: Routes = [
  { path: '', component: NoticeListComponent },
  { path: 'create', component: CreateNoticeComponent },
  { path: 'edit/:id', component: EditNoticeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
