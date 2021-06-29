import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit, OnDestroy {

  @Input() userid:number=8;

  post={title:'',msg:'',image:'',post_id:'',likes:0,share:0,dislike:0,fav:false}

  user={
    firstname:'', lastname:'', username:'', email:'',
    imagepro:'', imagecov:'', bio:'', phone:'',
    friends:[{ name:'', uid:'', imagepro:'' },],
    posts:[{ post_id:'',title:'', msg:'', image:'',likes:0,dislike:0,
             share:0, fav:false },]
  };

  mediaSub!:Subscription;
  mycss1Dy:any;
  mycss3Dy:any;
  mycssDy:any;
  likeBtnDy:any;
  btnDy:any;
  mainTextDy:any;
  col2Dy:any;

  constructor(public loginService: LoginService,
              public userService: UserService,
              public utilService:UtilService,
              public mediaObserver:MediaObserver) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userid).subscribe(
      (result:any)=>{
            console.log("Test 3");
            console.log(JSON.stringify(result));
            this.user=result;
      },(error)=>{console.log(error);}
    );

    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);
        if(change.mqAlias=='md'){ this.mycss3Dy={ 'width.px': 700 };}
        else if(change.mqAlias=='sm'){ this.mycss3Dy={ 'width.px': 580,
        'margin':'0 auto' };}
        else if(change.mqAlias=='xs'){ this.mycss3Dy={ 'width.px': 330,
        'margin':'0 auto' };}
        else{this.mycss3Dy={ 'width.px':899 };}

        if(change.mqAlias=='md'){ this.likeBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10 };}
            else if(change.mqAlias=='sm'){ this.likeBtnDy={ 'width.px': 10,'height.px': 36, 'margin.px':6  };}
            else if(change.mqAlias=='xs'){ this.likeBtnDy={ 'width.px': 10,'height.px': 36, 'margin.px':6  };}
            else{this.likeBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10,
            };}



        if(change.mqAlias=='md'){ this.mycss1Dy={ 'width.px': 210 };}
        else if(change.mqAlias=='sm'){ this.mycss1Dy={ 'width.px': 190,
        'margin':'0 auto', 'text-align':'center'  };}
        else if(change.mqAlias=='xs'){ this.mycss1Dy={ 'width.px': 330,
        'margin':'0 auto', 'text-align':'center' };}
        else{this.mycss1Dy={ 'width.px':270, 'margin-left.px':24 };}

        if(change.mqAlias=='md'){ this.mycssDy={ 'width.px': 480 };}
        else if(change.mqAlias=='sm'){ this.mycssDy={ 'width.px': 370,
        'margin':'0 auto' };}
        else if(change.mqAlias=='xs'){ this.mycssDy={ 'width.px': 330,
        'margin':'0 auto'};}
        else{this.mycssDy={ 'width.px':610, 'margin-left.px':3 };}

        if(change.mqAlias=='xs'){ this.mainTextDy={ 'margin-left.px':550 };}
        else if(change.mqAlias=='sm'){ this.mainTextDy={ 'margin-left.px':950 };}
        else{this.mainTextDy={ 'margin-left.px':310 }; }

        if(change.mqAlias=='sm'){ this.btnDy={ 'width.px':120 };}

        if(change.mqAlias=='xs'){ this.col2Dy={ 'margin':'0 auto' };}
        else if(change.mqAlias=='lg'){this.col2Dy={ 'margin-right.px':10 };}
      }
    );
  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

  openAddFriends(){
    this.utilService.ModChangeSubject.next('mo-4');
  }

  reloadUser(){
    this.userService.getUserById(this.userid).subscribe(
      (result:any)=>{
            console.log("Test 3");
            console.log(JSON.stringify(result));
            this.user=result;
      },(error)=>{console.log(error);}
    );
  }

  likePostCall(title:string,msg:string,img:string,postid:string,likes:number,dislike:number,share:number,fav:boolean){
    this.post.title=title;
    this.post.msg=msg;
    this.post.post_id=postid;
    this.post.likes=likes+1;
      this.post.dislike=dislike;
      this.post.share=share;
      this.post.fav=fav;
      console.log(this.post);
    this.userService.editFriendPost(JSON.stringify(this.post),img,JSON.stringify(this.userid)).subscribe(
    (data)=>{console.log(data);
    this.reloadUser();},(error)=>{console.log(error)});
  }

  dislikePostCall(title:string,msg:string,img:string,postid:string,likes:number,dislike:number,share:number,fav:boolean){
    this.post.title=title;
    this.post.msg=msg;
    this.post.post_id=postid;
    this.post.likes=likes;
      this.post.dislike=dislike+1;
      this.post.share=share;
      this.post.fav=fav;
    this.userService.editFriendPost(JSON.stringify(this.post),img,JSON.stringify(this.userid)).subscribe(
       (data)=>{console.log(data);
         this.reloadUser();},(error)=>{console.log(error)});
  }

  sharePostCall(title:string,msg:string,img:string,postid:string,likes:number,dislike:number,share:number,fav:boolean){
    this.post.title=title;
    this.post.msg=msg;
    this.post.post_id=postid;
    this.post.likes=likes;
      this.post.dislike=dislike;
      this.post.share=share+1;
      this.post.fav=fav;
    this.userService.editFriendPost(JSON.stringify(this.post),img,JSON.stringify(this.userid)).subscribe(
       (data)=>{console.log(data);
         this.reloadUser();},(error)=>{console.log(error)});
  }



}
