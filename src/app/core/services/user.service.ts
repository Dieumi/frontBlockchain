import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { Router} from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';


export interface UserServiceInterface {
  isLogged$ : BehaviorSubject<boolean>;
  hasUser() : void;

  getUser() : User;

  getUserName(): string;

  getUserEmail(): string;

  getToken(): string;

  login(userName: string, password: string) :Observable<any>;

  register(login: string, email: string, password: string): Observable<any>;
  update(user : User) : Observable<any>
  logout(): void;
}


@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceInterface{
  public isLogged$ = new BehaviorSubject<boolean>(false);
  public isLogged : boolean = false;
  public listOfUser$ =new  BehaviorSubject<User[]>(null);
  public hasUser(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }
  public getUser() : User {

    if(this.isLogged) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }
  public isConnected() :boolean {
    const token =  localStorage.getItem('token');

    if(token ) {
      this.isLogged$.next(true)
      return true
    } else {
      this.isLogged$.next(false)
      return false
    }
  }
  getUserName(): string{
    if(this.isLogged) {
      return JSON.parse(localStorage.getItem('user')).username;
    } else {
      return null;
    }
  }

  getUserEmail(): string {
    if(this.isLogged) {
      return JSON.parse(localStorage.getItem('user')).email;
    } else {
      return null;
    }
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public login(login: string, password: string) : Observable<any>{
    let logged = new Subject<any>();
    let body: any = {
      username: login,
      password: password,
    }  
    this.http.post<any>("http://localhost:8080/authenticate", body).subscribe(response => {
      const user:User = response.user;
   
      localStorage.setItem("user", JSON.stringify(user));   
      localStorage.setItem("token", response.jwt);     
      this.isLogged = true;
      this.isLogged$.next(true);
      this.walletService.getWallet();
      this.getListOfUsers();
      logged.next(response);
    }, error => {
      this.isLogged$.error(error);
    });
    return logged.asObservable();
  }

  register(login: string, email: string, password: string): Observable<any>{
    let body: any = {
      userName: login,
      email: email,
      password: password,
    }

    let result = new Subject<any>();

    this.http.post<any>("/registerUser", body).subscribe(response => {

      result.next(response);
    }, error => {
      result.error(error);
    });

    return result.asObservable();
  }
  //TODO For next time 
  public update(user :User) {
    let updated = new Subject<any>();
    // add body to update
    
    this.http.put<any>("/api/user/"+user.id, user,{observe:"response"}).subscribe(response  => {
      const user:User = response.body as User;
      localStorage.setItem("user", JSON.stringify(user));   
      console.log("test")
      updated.next(response)
    }, error => {
      console.log(error)
      updated.next(error)
    });
    console.log("test2")
    return updated.asObservable();
  }
  //TODO
  public logout(): void{
   this.isLogged$.next(false)
   this.isLogged = false;
   this.http.get<any>("/logout");
  }

  getListOfUsers(): void{
    this.http.get<any>("http://localhost:8080/listUser").subscribe(response=>{
      console.log("user"+JSON.stringify(response))
      this.listOfUser$.next(response)
  
    });
  
    }
  constructor(
    private http: HttpClient,
    private router: Router,
    private walletService : WalletService
  ) {
    this.isLogged$.next(this.isConnected())
    this.isLogged = this.isConnected();
    this.getListOfUsers();
   }
}
