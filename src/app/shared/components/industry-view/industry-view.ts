import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-industry-view',
  imports: [ 
    CommonModule,
    MatDialogModule,
    MaterialModule  ],
  templateUrl: './industry-view.html',
  styleUrl: './industry-view.css',
})
export class IndustryView {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IndustryView>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
