import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit, Output, Inject, HostListener, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  uid:number=0;
  bgValChangeSubscriber:Subscription;
  windowScrolled!: boolean;

  @HostListener("window:scroll", [])
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  scrollToTop() {
      (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
      })();
  }

  mediaSub!:Subscription;

  constructor(private utilService:UtilService, @Inject(DOCUMENT) private document: Document, private mediaObserver:MediaObserver) {

    this.bgValChangeSubscriber=this.utilService.bgValChange.asObservable()
    .subscribe(
      (data:string)=>{
         this.bgVal=data;
      },(error)=>{console.log(error);}
    );

   }

  public sideNav=false;
  public drawerContent:String='';
  bgVal:string='bg-5';
  modeVal:any='side';

  ngOnInit(): void {
    this.utilService.sidenavSubject.asObservable()
    .subscribe((data)=>{
       this.sideNav=data;
    });

    this.utilService.ModChangeSubject.asObservable().subscribe(
      (data:string)=>{
          console.log("test 4");
          console.log(data);
          window.scrollTo(0, 0);
          this.drawerContent=data;
      }
    );

    this.utilService.openProfileSubject.asObservable().subscribe(
        (data)=>{
          console.log('Test2:in user dashboard')
           console.log(data);
           this.uid=data;
           console.log(this.uid);
           setInterval(function(){},2000);
           this.drawerContent="pmo-1";
        }
    );

    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);
        if(change.mqAlias=='xs'){ this.modeVal='over';}
        else if(change.mqAlias=='lg'){this.modeVal='side';}
      }
   );
}

ngOnDestroy(): void {
if(this.mediaSub){
  this.mediaSub.unsubscribe();
}
}

  ngAfterViewInit(): void {

  }

  switchToMo1(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-1';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToMo2(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-2';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToMo3(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-3';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToMo4(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-4';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToMo5(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-5';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToMo6(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-6';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToMo7(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-7';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToMo8(){
     window.scrollTo(0, 0);
     this.drawerContent='mo-8';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }

  switchToNmo2(){
     window.scrollTo(0, 0);
     this.drawerContent='nmo-2';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }

  Refresh(){
    window.location.reload();
  }

}
