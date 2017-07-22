import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdSelectModule,
  MdToolbarModule,
  MdIconModule,
  MdRippleModule,
  MdTableModule
} from '@angular/material';

const modules = [
  CommonModule,
  FormsModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdSelectModule,
  MdProgressSpinnerModule,
  MdProgressBarModule,
  MdSelectModule,
  MdToolbarModule,
  MdIconModule,
  MdRippleModule,
  MdTableModule
];

@NgModule({
  imports: [ modules ],
  exports: [ modules ],
  declarations: [],
})
export class MaterialModule { }
