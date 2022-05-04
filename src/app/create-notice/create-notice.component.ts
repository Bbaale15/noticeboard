import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticesService } from '../services/notices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.scss'],
})
export class CreateNoticeComponent implements OnInit {
  createForm: FormGroup;
  submitted = false;
  loading = false;
  errMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private noticesService: NoticesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;
    this.noticesService.create(this.createForm.value).subscribe(
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
