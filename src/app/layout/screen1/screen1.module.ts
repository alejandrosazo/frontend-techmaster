import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Screen1Component } from './screen1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Screen1RoutingModule } from './screen1-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule  } from '@angular/material';

import { StatModule } from '../../shared/modules/stat/stat.module';

@NgModule({
  declarations: [Screen1Component],
  imports: [MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    Screen1RoutingModule,
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
  ]
})
export class Screen1Module { }
