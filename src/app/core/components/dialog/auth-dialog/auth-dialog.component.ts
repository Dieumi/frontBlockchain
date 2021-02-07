import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, UserServiceInterface } from 'src/app/core/services/user.service';
import { SnackService, SnackServiceInterface } from 'src/app/core/services/snack.service';
import { Router} from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  inscriptionForm: FormGroup = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    })

  connexionForm : FormGroup = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });

  isPasswordVisible: boolean = false;
  public isLogged : Observable<Boolean>;
  constructor(
    public dialogRef: MatDialogRef<AuthDialogComponent>,
   @Inject(UserService) private userService : UserServiceInterface,
   @Inject(Router) private router: Router,
   @Inject(SnackService) private snackService: SnackServiceInterface,
  ) { 
    this.isLogged=this.userService.isLogged$.asObservable()
  }

  ngOnInit() {

  }


  submitInscription(){
    if(this.inscriptionForm.valid){
      this.userService.register(
        this.inscriptionForm.get('username').value,
        this.inscriptionForm.get('email').value,
        this.inscriptionForm.get('password').value
        ).subscribe(response => {
          this.router.navigate(['wallet']);
          this.snackService.success("Bienvenue");
          this.dialogRef.close();
        }, error => {
          this.snackService.error("Erreur lors de l'inscription");
        })
    }
  }

  submitConnexion(){
 {   if(this.connexionForm.valid) 
   
      combineLatest(
        this.userService.login(this.connexionForm.get('username').value, this.connexionForm.get('password').value),
        this.isLogged
      ).subscribe(([res,log]) =>{
          
          this.router.navigate(['/welcome']);
          this.snackService.success("Bienvenu");
          this.dialogRef.close();
        }, error => {
          this.snackService.error("Erreur ! Login ou mot de passe incorrect");
        })
    }
  }

  togglePasswordVisibilty(){
    return this.isPasswordVisible = !this.isPasswordVisible;
  }

}
