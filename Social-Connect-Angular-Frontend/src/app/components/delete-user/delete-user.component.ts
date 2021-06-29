import { AdminService } from './../../services/admin.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { UtilService } from './../../services/util.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit, OnDestroy {

  usersset=[
      {
        id:'',
        firstname:'',
        lastname:'',
        username:'',
        imagepro:''
      },
  ];

  friendsCount:number=0;
  postsCount:number=0;

  mediaSub!:Subscription;
  mycssDy:any;
  mycss1Dy:any;
  textShortDy:any;

  constructor(public loginService: LoginService,
              public adminService: AdminService,
              public userService: UserService,
              public utilService:UtilService,
              private snackBar: MatSnackBar,
              private mediaObserver:MediaObserver) { }


  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      (data:any)=>{
            this.usersset=data;
      },(error)=>{console.log(error);}
    );

    this.userService.countPosts().subscribe(
      (data:any)=>{this.postsCount=data;}
      ,(error)=>{console.log(error)});

      this.userService.countFriends().subscribe(
        (data:any)=>{this.friendsCount=data;}
        ,(error)=>{console.log(error)});

        this.mediaSub=this.mediaObserver.media$.subscribe(
          (change:MediaChange)=>{
            console.log(change.mqAlias);
            if(change.mqAlias=='md'){ this.mycssDy={ 'width.px': 600 };}
            else if(change.mqAlias=='sm'){ this.mycssDy={ 'width.px': 470 ,
            'text-align':'center', 'margin':'0 auto' };}
            else if(change.mqAlias=='xs'){ this.mycssDy={ 'width.px': 330, 'margin':'0 auto' };}
            else{this.mycssDy={ 'width.px':660 };}

            if(change.mqAlias=='xs'){ this.mycss1Dy={ 'width.px':330 , 'text-align':'center', 'margin':'0 auto' };}
            else if(change.mqAlias=='sm'){ this.mycss1Dy={ 'width.px':250 , 'text-align':'center', 'margin':'0 auto' };}
            else{this.mycss1Dy={ 'width.px':250 };}

            if(change.mqAlias=='xs'){ this.textShortDy={ 'font-size.px':12, 'color':'black' };}
            else{this.textShortDy={  'color':'black' };}
          }
       );

  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

  deleteUserCall(uid:any){
      this.adminService.deleteUser(uid).subscribe(
        (data)=>{
          if(data){
            this.snackBar.open("user Deleted successfully!😇","Close",{duration: 2000,});
            this.adminService.getUsers().subscribe(
              (data:any)=>{
                    this.usersset=data;
              },(error)=>{console.log(error);}
            );
          }else{
            this.snackBar.open("Somthing went wrong!😓, Please Try again!😅","Close");
          }
        }
        ,(error)=>{console.log(error);}
      );
  }

}

