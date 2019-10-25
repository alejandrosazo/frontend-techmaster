import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Screen2Component } from './screen2.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule  } from '@angular/material';

import { StatModule } from '../../shared/modules/stat/stat.module';

@NgModule({
  
  imports: [MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule, 
        FormsModule, ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  declarations: [Screen2Component]
})
export class Screen2Module { }
