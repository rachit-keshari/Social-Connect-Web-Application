import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-trending-videos',
  templateUrl: './trending-videos.component.html',
  styleUrls: ['./trending-videos.component.css']
})
export class TrendingVideosComponent implements OnInit, OnDestroy {
  @ViewChild('imageCarsoleDialog')
  imageCarsoleDialog!:TemplateRef<any>;

  dialogVideoLink:string='';
  search:string='';

  getUrl(url:string)
  { return this.sanitizer.bypassSecurityTrustResourceUrl(url); }

  youtubeSearch={
      items: [
    {   id: {videoId:''},
        snippet: {
            title: '',
            thumbnails: {
              default: {url:'',width: 0,height: 0},
              medium: {url:'',width: 0,height: 0},
              high: {url:'', width: 0,height: 0}
            },
        }},]}

        mediaSub!:Subscription;
        imgDispDy:any;
        photoScaleDy:any;
        galleryViewDy:any;

  constructor(public loginService: LoginService,
              public userService:UserService,
              public dialog:MatDialog,
              public sanitizer:DomSanitizer,
              private mediaObserver:MediaObserver) { }

  ngOnInit(): void {

    this.userService.getVideos("badsha").subscribe(
      (data:any)=>{
          console.log(data);
          this.youtubeSearch=data;
          console.log(JSON.stringify(this.youtubeSearch));
      },(error)=>{console.log(error);}
    );

    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);
        if(change.mqAlias=='md'){this.imgDispDy={'width.px':600 , 'height.px':370 };}
        else if(change.mqAlias=='sm'){this.imgDispDy={'width.px':500, 'height.px':350 , 'object-fit':'cover', 'object-position':'center' };}
        else if(change.mqAlias=='xs'){this.imgDispDy={'width.px':290, 'height.px':160 , 'object-fit':'fill'};}
        else{ this.imgDispDy={'width.px':950, 'height.px':465 }; }

        if(change.mqAlias=='xs'){this.photoScaleDy={ 'margin':'0 auto', 'width.px':350, 'height.px':210};}
        else if(change.mqAlias=='sm'){this.photoScaleDy={'width.px':310, 'height.px':230 };}
        else if(change.mqAlias=='lg'){this.photoScaleDy={ 'width.px':340, 'height.px':230 };}
        else{ this.photoScaleDy={}; }

        if(change.mqAlias=='xs'){this.galleryViewDy={ 'margin':'10px auto', 'text-align':'center'};}
        else if(change.mqAlias=='lg'){ this.galleryViewDy={ 'margin-left.px':24, 'text-align':'center' }; }
      }
   );
  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

  openVideoDialog(val:string){
    this.dialogVideoLink="http://www.youtube.com/embed/"+val+"?autoplay=1";
    console.log(this.dialogVideoLink);
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
  }

  onVideoSearch(){
    this.userService.getVideos(this.search).subscribe(
      (data:any)=>{
         this.youtubeSearch=data;
      },(error)=>{console.log(error);}
    );
  }

}
