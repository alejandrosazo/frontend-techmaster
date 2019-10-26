import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { Screen2Component } from './screen2/screen2.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule, MatTableModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule  } from '@angular/material';
import { Screen3Component } from './screen3/screen3.component';




@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        TranslateModule,

        MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule, MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
        MatGridListModule,
        
        MatCardModule,
        MatCardModule, 
        FormsModule, ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
    ],
    declarations: [Screen2Component, LayoutComponent, NavComponent, TopnavComponent, SidebarComponent, Screen3Component, ]

})
export class LayoutModule { }
