import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079},
  {position: 2, name: 'Helium', weight: 4.0026},
  {position: 3, name: 'Lithium', weight: 6.941},
  {position: 4, name: 'Beryllium', weight: 9.0122},

];

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {

  friendsset=[
    {
      name:'',
      uid:'',
      imagepro:'',
      friend_id:''
    },
];

mediaSub!:Subscription;
  mycssDy:any;
  mycss1Dy:any;
  textShortDy:any;
  addPostCommentDy:any;

  friendsCount:number=0;
  postsCount:number=0;

  constructor(public loginService: LoginService,
              public userService: UserService,
              public utilService:UtilService,
              private mediaObserver:MediaObserver) { }

  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this.userService.getFriends().subscribe(
      (data:any)=>{
            this.friendsset=data;
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
            else if(change.mqAlias=='sm'){ this.mycssDy={ 'width.px': 470,
            'margin':'0 auto' };}
            else if(change.mqAlias=='xs'){ this.mycssDy={ 'width.px': 330, 'margin':'0 auto' };}
            else{this.mycssDy={ 'width.px':660 };}

            if(change.mqAlias=='xs'){ this.mycss1Dy={ 'width.px':330 , 'text-align':'center', 'margin':'0 auto' };}
            else if(change.mqAlias=='sm'){ this.mycss1Dy={ 'width.px': 250,
            'margin':'0 auto', 'text-align':'center', };}
            else{this.mycss1Dy={ 'width.px':250 };}

            if(change.mqAlias=='xs'){ this.addPostCommentDy={ 'display':'none' };}
            else if(change.mqAlias=='lg'){ this.addPostCommentDy={ 'padding-top.px':20,'font-size.px':30 };}

            if(change.mqAlias=='xs'){ this.textShortDy={ 'font-size.px':12, 'color':'black' };}
            else{this.textShortDy={ 'color':'black' };}
          }
       );

  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

  openProfileCall(userid:any){
    console.log("test 1");
    console.log(userid);
    this.utilService.openProfileSubject.next(userid);
  }

  addFriendCall(){
    this.utilService.ModChangeSubject.next('mo-4');
  }

}
