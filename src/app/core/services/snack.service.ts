import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SnackServiceInterface {

  success(message: string): void;

  error(message: string): void;

  info(message: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class SnackService implements SnackServiceInterface {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  success(message: string): void {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  error(message: string): void {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  info(message: string): void {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }
}
