import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public isLogged : boolean;
  constructor(private userService: UserService, private router: Router) {
    this.userService.isLogged$.asObservable().subscribe(
      res=>{
        this.isLogged=true;
      }
    )
  }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     
      if(this.isLogged) {
        return true;
      }
      else {
        console.log("test1")
        this.router.navigate(['/welcome']);
        return false;
      }
  }
}
