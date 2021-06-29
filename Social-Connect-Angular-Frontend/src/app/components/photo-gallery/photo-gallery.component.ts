import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
})
export class PhotoGalleryComponent implements OnInit, OnDestroy {

  @ViewChild('imageCarsoleDialog')
  imageCarsoleDialog!:TemplateRef<any>;

  dialogImage:string='';

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
  imgDispDy:any;
  photoScaleDy:any;
  galleryViewDy:any;

  constructor(public loginService: LoginService,
              public userService:UserService,
              public dialog:MatDialog,
              private mediaObserver:MediaObserver) { }

  ngOnInit(): void {

    this.userService.getPosts().subscribe(
      (data:any)=>{
          console.log(data);
          this.postsset=data;
      },(error)=>{console.log(error);}
    );
  }

  openImageCarsoleDialog(img:string){
    this.dialogImage=img;
    let dialogRef = this.dialog.open(this.imageCarsoleDialog,{ panelClass: 'custom-dialog-container' });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result !== 'no') {
                   console.log(result);
            } else if (result === 'no') {
               console.log('User clicked no.');
            }
        }
    })

    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);
        if(change.mqAlias=='md'){this.imgDispDy={'width.px':600 , 'height.px':370 };}
        else if(change.mqAlias=='sm'){this.imgDispDy={'width.px':500, 'height.px':320 };}
        else if(change.mqAlias=='xs'){this.imgDispDy={'width.px':280, 'height.px':150 };}
        else{ this.imgDispDy={'width.px':860, 'height.px':465 }; }

        if(change.mqAlias=='xs'){this.photoScaleDy={ 'margin':'0 auto'};}
        else if(change.mqAlias=='sm'){this.photoScaleDy={
          'width.px':310, 'height.px':230 };}
        else{ this.photoScaleDy={'width.px':340, 'height.px':250 }; }

        if(change.mqAlias=='xs'){this.galleryViewDy={ 'margin':'0 auto', 'text-align':'center' , 'margin-left.px':15};}
        else if(change.mqAlias=='lg'){ this.galleryViewDy={  'text-align':'center' }; }
      }
   );


  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

}
