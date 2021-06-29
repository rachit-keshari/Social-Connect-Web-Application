import { UtilService } from './../../services/util.service';
import {  AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';
import { stringify } from '@angular/compiler/src/util';
import {AuthService} from 'angularx-social-login';
import {Subscription} from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: NavbarComponent}
  ]
})
export class NavbarComponent implements OnInit, OnDestroy,AfterViewInit {

  @ViewChild('editProfileDialog')
  editProfileDialog!: TemplateRef<any>;

  userName:string='User';
  colorVal:string='primary';

  private localUser = {
      id:'', username:'', firstname:'', lastname:'',
      phone:'', email:'', password:'', profile:'', bio:'',
      imagecov:'',imagepro:'',enable:'',
  };

  public editProfile = {
      phone:'',
      bio:'',
      imagepro:File,
      imagecov:File,
    };

    openEditProfileSubscription:Subscription;
    navColorChangSubscription:Subscription;
    loginTriggerSubscription:Subscription;
    sidenavMobileTrigger:Subscription;

    mediaSub!:Subscription;
    menuItemsDy:any;
    iconSpaceDy:any;
    btnDy:any;

  constructor(
    public loginService:LoginService,
    public userService:UserService,
    private utilService:UtilService,
    public dialog: MatDialog,
    private authService:AuthService,
    private mediaObserver:MediaObserver) {
        this.openEditProfileSubscription=this.utilService.openEditProfileClick.asObservable().subscribe(
          ()=>{
            this.openEditProfileDialog();
          }
        );


        this.navColorChangSubscription=this.utilService.navColorChange.asObservable().subscribe(
          (data:any)=>{
             console.log('got color change:'+data);
             this.colorVal=data;
          },(error)=>{console.log(error);}
        );

        this.loginTriggerSubscription=this.utilService.loginTrigger.asObservable().
        subscribe(
          ()=>{
             this.ngOnInit();
          }
        );

        this.sidenavMobileTrigger=this.utilService.sidenavMobileTrigger.asObservable().subscribe(
          ()=>{ this.toggle(); }
        );
     }


  ngOnInit(): void {
    this.userName=this.loginService.getUser().firstname;
    this.mediaSub=this.mediaObserver.media$.subscribe(
       (change:MediaChange)=>{
         console.log(change.mqAlias);
         if(change.mqAlias=='xs'){ this.menuItemsDy={ 'display':'none' };}
         else{this.menuItemsDy={ 'display':'flex' };}

         if(change.mqAlias=='xs'){ this.btnDy={ 'height.px':30, 'font-size.px':14,
          'padding.px':2, 'width.px':110 };}
         else{this.btnDy={ 'height.px':40 };}

         if(change.mqAlias=='md'){this.iconSpaceDy={'width.px':60 };}
         else if(change.mqAlias=='sm'){this.iconSpaceDy={'width.px':30 };}
         else if(change.mqAlias=='xs'){this.iconSpaceDy={'width.px':4 };}
         else{ this.iconSpaceDy={'width.px':100 }; }
       }
    );
  }

  ngAfterViewInit():void{
    this.userName=this.loginService.getUser().firstname;
  }

  ngOnDestroy(): void {
      if(this.mediaSub){
        this.mediaSub.unsubscribe();
      }
  }

  public logout(){
    this.loginService.logOut();
    this.authService.signOut();
    window.location.reload();
  }

  sideNav=false;

  toggle(){
    this.sideNav=!this.sideNav;
    this.utilService.sidenavSubject.next(this.sideNav);
  }

  openEditProfileDialog(){
    let local=this.loginService.getUser();
    this.editProfile.bio=local.bio;
    this.editProfile.phone=local.phone;
    let dialogRef = this.dialog.open(this.editProfileDialog,{ panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
                   console.log(result);
            } else if (result === 'no') {
               console.log('User clicked no.');
            }
        }
    })
  }

  switchToNmo1(){
     this.utilService.ModChangeSubject.next("nmo-1");
  }

  switchToNmo2(){
    this.utilService.ModChangeSubject.next("nmo-2");
 }

  switchToMo2(){
    this.utilService.ModChangeSubject.next("mo-2");
 }

 switchToMo3(){
  this.utilService.ModChangeSubject.next("mo-3");
}

switchToNmo3(){
  this.utilService.ModChangeSubject.next("nmo-3");
}

switchToNmo4(){
  this.utilService.ModChangeSubject.next("nmo-4");
}

switchToNmo5(){
  this.utilService.ModChangeSubject.next("nmo-5");
}

  onProfileFileChange(event:any){
      this.editProfile.imagepro=event.target.files[0];
  }
  onCoverFileChange(event:any){
     this.editProfile.imagecov=event.target.files[0];
  }

  editDilogFormSubmit(){
        console.log(this.editProfile);
        let user=this.loginService.getUser();
        console.log(user);
        this.localUser.id=user.id;
        this.localUser.username=user.username;
        this.localUser.firstname=user.firstname;
        this.localUser.lastname=user.lastname;
        this.localUser.password=user.password;
        this.localUser.email=user.email;
        this.localUser.profile=user.profile;
        this.localUser.enable=user.enable;
        this.localUser.phone=this.editProfile.phone;
        this.localUser.bio=this.editProfile.bio;
        this.editDilogFormSubmit1(user);
  }

    editDilogFormSubmit1(user:any){
        if(!(this.editProfile.imagepro.name === 'File')){
        this.userService.uploadProfile(this.editProfile.imagepro).subscribe(
        (data:any)=>{
            console.log(data);
            user.imagepro=data.profileUrl;
            console.log(user.imagepro);
            this.editDilogFormSubmit2(user);
        },
        (error)=>{ console.log(error); this.editDilogFormSubmit2(user); });
        }else{ this.editDilogFormSubmit2(user); }
      }

      editDilogFormSubmit2(user:any){
        if(!(this.editProfile.imagecov.name === 'File')){
          this.userService.uploadCover(this.editProfile.imagecov).subscribe(
          (data:any)=>{
              console.log(data);
              user.imagecov=data.coverUrl;
              console.log(user.imagecov);
              this.editDilogFormSubmit3(user);
          },
          (error)=>{ console.log(error); this.editDilogFormSubmit3(user); });
        } else{this.editDilogFormSubmit3(user);}
      }

      editDilogFormSubmit3(user:any){
        console.log('mytesting: upload image');
        console.log(user.imagepro);
        console.log(user.imagecov);
        this.userService.updateUserProflieUrl(JSON.stringify(this.localUser),
        user.imagepro,user.imagecov).subscribe(
          (data)=>{
            console.log(data);
            if(data){
            user.bio=this.editProfile.bio;
            user.phone=this.editProfile.phone;
            this.loginService.setUser(user);
            }
          }
          ,(error)=>{ console.log(error); }
        );

        this.dialog.closeAll(); // Close opened diaglo
      // do whatever you want to do with your data
     }

}
