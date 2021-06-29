import { UtilService } from 'src/app/services/util.service';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  loginTriggerSubscription:Subscription;

  mediaSub!:Subscription;
  footerDy:any;
  divDy:any;
  textDy:any;
  iconImg2:any;

  constructor(private mediaObserver:MediaObserver, public loginService:LoginService,
    private utilService:UtilService) {

      this.loginTriggerSubscription=this.utilService.loginTrigger.asObservable().
        subscribe(
          ()=>{
             this.ngOnInit();
          }
        );
     }

  ngOnInit(): void {

    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);

        if(change.mqAlias=='xs'||change.mqAlias=='sm'){this.footerDy={'margin':'0 auto', 'text-align':'center', };}
        else if(change.mqAlias=='lg'){ this.footerDy={ }; }

        if(change.mqAlias=='xs'||change.mqAlias=='sm'){this.divDy={'margin':'0 auto', 'text-align':'center',  };}
        else if(change.mqAlias=='lg'){ this.divDy={ }; }

        if(change.mqAlias=='sm'){this.iconImg2={'width.px':16, 'height.px':16 };}
        else if(change.mqAlias=='xs'){ this.iconImg2={ 'width.px':40, 'height.px':40 }; }
        else if(change.mqAlias=='lg'){ this.iconImg2={ 'width.px':40, 'height.px':40 }; }

        if(change.mqAlias=='xs'||change.mqAlias=='sm'){this.textDy={'margin':'0 auto', 'text-align':'center', 'font-size.px':12 };}
        else if(change.mqAlias=='lg'){ this.textDy={ 'text-align':'left' }; }
      }
   );

  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

openContactUsCall(){

  this.utilService.ModChangeSubject.next('nmo-5');
}
openPhotoGalleryCall(){
this.utilService.ModChangeSubject.next('mo-3');
}
openFriendsCall(){
this.utilService.ModChangeSubject.next('mo-1');
}
openAboutUsCall(){
this.utilService.ModChangeSubject.next('nmo-4');
}
openCovidInfoCall(){
this.utilService.ModChangeSubject.next('mo-7');
}
openFindLocationCall(){
this.utilService.ModChangeSubject.next('mo-8');
}
openSettingCall(){
this.utilService.ModChangeSubject.next('nmo-3');
}
openMyTimelineCall(){
this.utilService.ModChangeSubject.next('mo-2');
}
openMyProfileCall(){
this.utilService.ModChangeSubject.next('nmo-1');
}
openSearchVideoCall(){
this.utilService.ModChangeSubject.next('nmo-2');
}

}
