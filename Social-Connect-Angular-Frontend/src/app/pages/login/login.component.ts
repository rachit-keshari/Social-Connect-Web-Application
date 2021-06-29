import { UtilService } from 'src/app/services/util.service';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { UserService } from './../../services/user.service';
import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import {AuthService,SocialUser,GoogleLoginProvider} from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user!: SocialUser;

  public GoogleUser = {
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    phone:'',
    email:'',
    imagepro:'',
    imagecov:'',
    bio:'',
    }

    mediaSub!:Subscription;
    cardBodyDy:any;
    googleDy:any;

  constructor(private loginService:LoginService, private router:Router,
    private authService:AuthService, private userService:UserService,
    private mediaObserver:MediaObserver,
    private utilService:UtilService) {}

  public loginData = {
      username:'',
      password:''
  };

  public loginVal = {
    username:'',
    password:''
};

  ngOnInit(): void {
    this.authService.authState.subscribe(
      (user)=>{
          //  console.log(user);
           this.user=user;
           if(user)
           this.googleLogin();
    });

    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        // console.log(change.mqAlias);

       if(change.mqAlias=='xs'){ this.cardBodyDy={ 'width.px': 280,'margin':'0 auto','text-align':'center' };}
       else if(change.mqAlias=='lg'){ this.cardBodyDy={  };}
       if(change.mqAlias=='xs'){ this.googleDy={ 'width.px': 260, 'border': '1px solid grey','margin':'0 auto', 'text-align':'center' };}
       else if(change.mqAlias=='lg'){ this.googleDy={  'width.px': 380, 'border': '1px solid grey' };}

      }
   );
  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}



  signInWithgoogle():any{
      // console.log("button clicked login user");

      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }

  googleLogin(){
    // console.log("google login worked");
     var nameVal:string[];
     nameVal=this.user.name.split(" ");
     this.GoogleUser.firstname=nameVal[0];
     this.GoogleUser.lastname=nameVal[1];
     this.GoogleUser.email=this.user.email;
     this.GoogleUser.imagepro=this.user.photoUrl;
     this.GoogleUser.password='12345';
     this.GoogleUser.username=this.user.id;
     this.GoogleUser.bio='You can set your Bio from Edit Profile';
    this.loginVal.username=this.GoogleUser.username;
    this.loginVal.password='12345';

    // console.log(this.user);
    // console.log(this.GoogleUser);
    // console.log(this.loginVal);
    this.loginService.generateToken(this.loginVal).subscribe(
        (data:any)=>{
          // console.log("Success!");
          // console.log(data);
          //login...
          this.loginService.loginUser(data.token);
          this.loginService.currentUser().subscribe(
            (user:any)=>{
                this.loginService.setUser(user);
                // console.log("Success:got-current-user")
                // console.log(user);

                if(this.loginService.getUserRole()=='ADMIN')
                {
                  //redirect ...ADMIN: admin-dashboard
                  this.utilService.loginTrigger.next();
                  this.router.navigate(['/admin']);
                }
                else if(this.loginService.getUserRole()=='NORMAL')
                {
                   //redirect ...NORMAL: user-dashboard
                   this.utilService.loginTrigger.next();
                   this.router.navigate(['/user-dashboard']);
                }
                else
                {
                  this.loginService.logOut();
                   //redirect to login-page
                }
            },
            (error)=>{
               console.log(error);
            }
          );

        },
        (error)=>{
          //  console.log("New SocialUser");
            //addUser: userservice
            this.userService.addUser(this.GoogleUser).subscribe(
             (data:any)=>{
                  console.log(data);
                  this.loginVal.username=this.GoogleUser.username;
                  this.loginVal.password='12345';
                  this.loginService.generateToken(this.loginVal).subscribe(
                      (data:any)=>{
                        // console.log("Success!");
                        // console.log(data);
                        //login...
                        this.loginService.loginUser(data.token);
                        this.loginService.currentUser().subscribe(
                          (user:any)=>{
                              this.loginService.setUser(user);
                              // console.log("Success:got-current-user")
                              // console.log(user);

                              if(this.loginService.getUserRole()=='ADMIN')
                              {
                                //redirect ...ADMIN: admin-dashboard
                                this.utilService.loginTrigger.next();
                                this.router.navigate(['/admin']);
                              }
                              else if(this.loginService.getUserRole()=='NORMAL')
                              {
                                 //redirect ...NORMAL: user-dashboard
                                   this.utilService.loginTrigger.next();
                                   this.router.navigate(['/user-dashboard']);
                              }
                              else
                              {
                                this.loginService.logOut();
                                 //redirect to login-page
                              }
                          },
                          (error)=>{
                             console.log(error);
                          }
                        );

                      },
                      (error)=>{
                         console.log("Error!");
                         console.log(error);
                      }
                    );

               },
              (error)=>{
               console.log(error)
             });
        }
      );
  }

  formSubmit() {
    // console.log(this.loginData);
    if(this.loginData.username==null || this.loginData.username.trim()=="")
    {
      Swal.fire('Invalid Username','Entered Username is Invalid!!','error');
      return;
    }
    if(this.loginData.password==null || this.loginData.password.trim()=="")
    {
      Swal.fire('Invalid Password','Entered Password is Invalid!!','error');
      return;
    }
    //generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        // console.log("Success!");
        // console.log(data);

        //login...
        this.loginService.loginUser(data.token);
        this.loginService.currentUser().subscribe(
          (user:any)=>{
              this.loginService.setUser(user);
              // console.log("Success:got-current-user")
              // console.log(user);

              if(this.loginService.getUserRole()=='ADMIN')
              {
                //redirect ...ADMIN: admin-dashboard
                this.utilService.loginTrigger.next();
                this.router.navigate(['/admin']);
              }
              else if(this.loginService.getUserRole()=='NORMAL')
              {
                 //redirect ...NORMAL: user-dashboard
                   this.utilService.loginTrigger.next();
                   this.router.navigate(['/user-dashboard']);
              }
              else
              {
                this.loginService.logOut();
                 //redirect to login-page
              }


          },
          (error)=>{
             console.log(error);
          }
        );

      },
      (error)=>{
        //  console.log("Error!");
        //  console.log(error);
         Swal.fire('Invalid User Details','Please Try again!','error');
         return;
      }
    );

  }


}
