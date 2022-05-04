import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticesService } from '../services/notices.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import INotice from '../model/INotice';

@Component({
  selector: 'app-edit-notice',
  templateUrl: './edit-notice.component.html',
  styleUrls: ['./edit-notice.component.scss'],
})
export class EditNoticeComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  loading = false;
  errMsg: string = '';
  id: string;
  notice: INotice;

  constructor(
    private formBuilder: FormBuilder,
    private noticesService: NoticesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });

    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.loadNotice();
  }

  loadNotice() {
    this.noticesService.get(this.id).subscribe((res) => {
      this.notice = res;
    });
  }

  update() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;
    this.noticesService.edit(this.id, this.editForm.value).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      () => {
        this.loading = false;
        this.errMsg = 'An error occurred, please try again later';
      }
    );
  }
}
