//This file provides all the components which are required to use material components which are part of Angular
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule, MatSnackBarModule, MatDialogModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatSidenavModule,
        MatGridListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCheckboxModule
    ],

    exports: [MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatTabsModule,
        MatInputModule,
        MatTableModule,
        MatSidenavModule,
        MatGridListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCheckboxModule
    ]
})

export class MaterialModule { }