import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { UtilService } from './../../../services/util.service';
import { Component, OnInit, Output, Inject, HostListener, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

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

  switchToamo1(){
     window.scrollTo(0, 0);
     this.drawerContent='amo-1';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToamo2(){
     window.scrollTo(0, 0);
     this.drawerContent='amo-2';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToamo3(){
     window.scrollTo(0, 0);
     this.drawerContent='amo-3';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }
  switchToamo4(){
     window.scrollTo(0, 0);
     this.drawerContent='amo-4';
     if(this.modeVal=='over'){ this.utilService.sidenavMobileTrigger.next(); }
  }


  Refresh(){
    window.location.reload();
  }

}
