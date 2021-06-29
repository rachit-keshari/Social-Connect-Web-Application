import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-my-timeline',
  templateUrl: './my-timeline.component.html',
  styleUrls: ['./my-timeline.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: MyTimelineComponent}
  ]
})
export class MyTimelineComponent implements OnInit, OnDestroy {

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

  friendsCount:number=0;
  postsCount:number=0;

  postsset = [
    {
       post_id:'',
       title:'',
       msg:'',
       image:'',
       likes:0,share:0,dislike:0,fav:false,
    },
  ];

  mediaSub!:Subscription;
  mycssDy:any;
  likeBtnDy:any;
  favBtnDy:any;
  mycss1Dy:any;
  proImgDy:any;
  addPostHeadingDy:any;
  addPostCommentDy:any;

  constructor(public loginService: LoginService,
    private userService: UserService,
    public utilService: UtilService,
    public dialog: MatDialog,
    private mediaObserver:MediaObserver) { }

  ngOnInit(): void {

    this.userService.getPosts().subscribe(
      (data:any)=>{
          console.log(data);
          this.postsset=data;
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
            else if(change.mqAlias=='sm'){ this.mycssDy={ 'width.px': 450,'margin':'0 auto' };}
            else if(change.mqAlias=='xs'){ this.mycssDy={ 'width.px': 330, 'margin':'0 auto' };}
            else{this.mycssDy={ 'width.px':660 };}

            if(change.mqAlias=='sm'){ this.proImgDy={ 'width.px': 170,'height.px': 170, 'margin-bottom.px':20 };}

            if(change.mqAlias=='md'){ this.likeBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10 };}
            else if(change.mqAlias=='sm'){ this.likeBtnDy={ 'width.px': 10,'height.px': 36, 'margin.px':6  };}
            else if(change.mqAlias=='xs'){ this.likeBtnDy={ 'width.px': 10,'height.px': 36, 'margin.px':4  };}
            else{this.likeBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10,
            };}

            if(change.mqAlias=='md'){ this.favBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10, 'margin-left.px':230 };}
            else if(change.mqAlias=='sm'){ this.favBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':6, 'margin-left.px':125  };}
            else if(change.mqAlias=='xs'){ this.favBtnDy={ 'width.px': 10,'height.px': 36, 'margin.px':6, 'margin-left.px':12  };}
            else{this.favBtnDy={ 'width.px': 40,'height.px': 40, 'margin.px':10, 'margin-left.px':310
            };}

            if(change.mqAlias=='xs'){ this.addPostHeadingDy={ 'font-size.px':18 };}

            if(change.mqAlias=='xs'){ this.addPostCommentDy={ 'display':'none' };}
            else if(change.mqAlias=='lg'){ this.addPostCommentDy={ 'padding-top.px':20,'font-size.px':30 };}

            if(change.mqAlias=='xs'){ this.mycss1Dy={ 'width.px':330 , 'text-align':'center', 'margin':'0 auto' };}
            else if(change.mqAlias=='sm'){ this.mycss1Dy={ 'width.px':220 , 'text-align':'center', 'margin':'0 auto' };}
            else{this.mycss1Dy={ 'width.px':250 };}
          }
       );
  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

  openEditProfile(){
     this.utilService.openEditProfileClick.next();
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
            this.addPostDialogFormsubmit1();},(error)=>{console.log(error)});
     },(error)=>{console.log(error);}
    );
    }else{this.addPostDialogFormsubmit1();}

  }

  addPostDialogFormsubmit1(){
    this.userService.getPosts().subscribe(
      (data:any)=>{
          console.log(data);
          console.log("Hello");
          this.postsset=data;
      },(error)=>{console.log(error);}
    );
    this.dialog.closeAll();
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
    let dialogRef = this.dialog.open(this.editPostDialog);
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
