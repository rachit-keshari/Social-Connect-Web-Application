import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, OnInit, Output, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: MyProfileComponent}
  ]
})
export class MyProfileComponent implements OnInit, OnDestroy {

  @ViewChild('addPostDialog')
  addPostDialog!:TemplateRef<any>;

  @ViewChild('editPostDialog')
  editPostDialog!:TemplateRef<any>;

  public addPost = {
    title:'',
    msg:'',
    image:File,
    imgUrl:'',
    postid:'',
    likes:0,share:0,dislike:0,fav:false,
  };

  post={title:'',msg:'',image:'',post_id:'',likes:0,share:0,dislike:0,fav:false}

  postsset = [
    {
       post_id:'',
       title:'',
       msg:'',
       image:'',
       likes:0,share:0,dislike:0,fav:false,
    },
  ];

  friendsset = [
    {
      name:'',
      uid:'',
      imagepro:'',
      friend_id:''
    },
  ];

  mediaSub!:Subscription;
  mycss1Dy:any;
  mycss3Dy:any;
  mycssDy:any;
  likeBtnDy:any;
  favBtnDy:any;
  mainTextDy:any;

  constructor(public loginService: LoginService,
              private userService: UserService,
              public utilService: UtilService,
              public dialog: MatDialog,
              public mediaObserver:MediaObserver) { }
  ngOnInit(): void {
    this.userService.getFriends().subscribe(
      (data:any)=>{
        console.log(data);
        this.friendsset=data;
      },(error)=>{console.log(error);}
    );

    this.userService.getPosts().subscribe(
      (data:any)=>{
          console.log(data);
          this.postsset=data;
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

            if(change.mqAlias=='md'){ this.favBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10, 'margin-left.px':110 };}
            else if(change.mqAlias=='sm'){ this.favBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':6, 'margin-left.px':35  };}
            else if(change.mqAlias=='xs'){ this.favBtnDy={ 'width.px': 10,'height.px': 36, 'margin.px':6, 'margin-left.px':6  };}
            else{this.favBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10, 'margin-left.px':254
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
        if(change.mqAlias=='sm'){ this.mainTextDy={ 'margin-left.px':950 };}
        else{this.mainTextDy={ 'margin-left.px':310 }; }
      }
    );
  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

  OpenProfileCall(userid:any){
     console.log("test 1");
     console.log(userid);
     this.utilService.openProfileSubject.next(userid);
  }

  onPostImageChange(event:any){
    this.addPost.image=event.target.files[0];
  }

  openAddPostDialog(){
    let dialogRef = this.dialog.open(this.addPostDialog);
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

  addPostDilogFormSubmit(){
     console.log(this.addPost);

     if(!(this.addPost.image.name === 'File')){
     this.userService.uploadProfile(this.addPost.image).subscribe(
     (data:any)=>{
         console.log(data);
         this.post.title=this.addPost.title;
         this.post.msg=this.addPost.msg;
         this.userService.addPost(JSON.stringify(this.post),data.profileUrl).subscribe(
          (data)=>{console.log(data);
            this.reloadPostsset();},(error)=>{console.log(error)});
     },(error)=>{console.log(error);}
    );
    }else{this.reloadPostsset();}

  }

  openEditPostDialog(title:string,msg:string,img:string,postid:string,likes:number,share:number,dislike:number,fav:boolean){
    this.addPost.title=title;
    this.addPost.msg=msg;
    this.addPost.postid=postid;
    this.addPost.imgUrl=img;
    this.addPost.likes=likes;
    this.addPost.dislike=dislike;
    this.addPost.share=share;
    this.addPost.fav=fav;
    let dialogRef = this.dialog.open(this.editPostDialog,{ panelClass: 'custom-dialog-container' });
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

  editPostDilogFormSubmit(){
    console.log(this.addPost);
    if(!(this.addPost.image.name === 'File')){
    this.userService.uploadProfile(this.addPost.image).subscribe(
    (data:any)=>{
        console.log(data);
        this.post.title=this.addPost.title;
        this.post.msg=this.addPost.msg;
        this.post.post_id=this.addPost.postid;
        this.post.likes=this.addPost.likes;
        this.post.dislike=this.addPost.dislike;
        this.post.share=this.addPost.share;
        this.post.fav=this.addPost.fav;
        this.userService.editPost(JSON.stringify(this.post),data.profileUrl).subscribe(
         (data)=>{console.log(data);
           this.reloadPostsset();},(error)=>{console.log(error)});
    },(error)=>{console.log(error);}
   );
   }else{

      this.post.title=this.addPost.title;
      this.post.msg=this.addPost.msg;
      this.post.post_id=this.addPost.postid;
      this.post.likes=this.addPost.likes;
        this.post.dislike=this.addPost.dislike;
        this.post.share=this.addPost.share;
        this.post.fav=this.addPost.fav;
      this.userService.editPost(JSON.stringify(this.post),this.addPost.imgUrl).subscribe(
         (data)=>{console.log(data);
           this.reloadPostsset();},(error)=>{console.log(error)});
   }

  }

  reloadPostsset(){
    this.userService.getPosts().subscribe(
      (data:any)=>{
          console.log(data);
          console.log("Hello");
          this.postsset=data;
      },(error)=>{console.log(error);}
    );
    this.dialog.closeAll();
  }

  deletePostCall(postid:number){
    this.userService.removePost(JSON.stringify(postid)).subscribe(
      (data:any)=>{
           console.log(data);
           this.userService.getPosts().subscribe(
            (data:any)=>{
                console.log(data);
                console.log("Hello");
                this.postsset=data;
            },(error)=>{console.log(error);}
          );
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
    this.userService.editPost(JSON.stringify(this.post),img).subscribe(
       (data)=>{console.log(data);
         this.reloadPostsset();},(error)=>{console.log(error)});
  }

  dislikePostCall(title:string,msg:string,img:string,postid:string,likes:number,dislike:number,share:number,fav:boolean){
    this.post.title=title;
    this.post.msg=msg;
    this.post.post_id=postid;
    this.post.likes=likes;
      this.post.dislike=dislike+1;
      this.post.share=share;
      this.post.fav=fav;
    this.userService.editPost(JSON.stringify(this.post),img).subscribe(
       (data)=>{console.log(data);
         this.reloadPostsset();},(error)=>{console.log(error)});
  }

  sharePostCall(title:string,msg:string,img:string,postid:string,likes:number,dislike:number,share:number,fav:boolean){
    this.post.title=title;
    this.post.msg=msg;
    this.post.post_id=postid;
    this.post.likes=likes;
      this.post.dislike=dislike;
      this.post.share=share+1;
      this.post.fav=fav;
    this.userService.editPost(JSON.stringify(this.post),img).subscribe(
       (data)=>{console.log(data);
         this.reloadPostsset();},(error)=>{console.log(error)});
  }

  favPostCall(title:string,msg:string,img:string,postid:string,likes:number,dislike:number,share:number,fav:boolean){
    this.post.title=title;
    this.post.msg=msg;
    this.post.post_id=postid;
    this.post.likes=likes;
      this.post.dislike=dislike;
      this.post.share=share;
      this.post.fav=!fav;
    this.userService.editPost(JSON.stringify(this.post),img).subscribe(
       (data)=>{console.log(data);
         this.reloadPostsset();},(error)=>{console.log(error)});
  }

}
