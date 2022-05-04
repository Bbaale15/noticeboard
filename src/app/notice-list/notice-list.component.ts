import { Component, OnInit } from '@angular/core';
import INotice from '../model/INotice';
import { NoticesService } from '../services/notices.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.scss'],
})
export class NoticeListComponent implements OnInit {
  notices: INotice[];
  constructor(
    private noticesService: NoticesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices() {
    this.noticesService.getAll().subscribe((res: INotice[]) => {
      this.notices = res;
    });
  }

  deleteNotice(id) {
    this.noticesService.delete(id).subscribe(() => {
      this.snackBar.open('Notice deleted', 'Ok', {
        duration: 3000,
      });

      this.loadNotices();
    });
  }
}
