import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatDatepickerModule,
  MatGridListModule,
  MatTabsModule,
  MatRippleModule,
  MatExpansionModule,
  MatBottomSheetModule,
  MatSnackBarModule,

} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatGridListModule,
    FlexLayoutModule,
    MatTabsModule,
    MatRippleModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatSnackBarModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatGridListModule,
    FlexLayoutModule,
    MatTabsModule,
    MatRippleModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
