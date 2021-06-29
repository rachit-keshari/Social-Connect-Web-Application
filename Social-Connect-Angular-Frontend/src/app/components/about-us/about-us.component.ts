import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { UtilService } from 'src/app/services/util.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit , OnDestroy{

  mediaSub!:Subscription;
  dispDy:any;
  divDy:any;
  textDy:any;

  constructor(public loginService:LoginService,
    private utilService:UtilService, private mediaObserver:MediaObserver) { }

  ngOnInit(): void {
    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);

        if(change.mqAlias=='xs'){this.dispDy={'margin':'0 auto', 'text-align':'center', 'width.px':320, 'font-size.px':10 };}
        else if(change.mqAlias=='lg'){ this.dispDy={ 'width.px':800 }; }

        if(change.mqAlias=='xs'){this.divDy={'margin':'0 auto', 'text-align':'center', 'color':'white' };}
        else if(change.mqAlias=='lg'){ this.divDy={ }; }

        if(change.mqAlias=='xs'){this.textDy={'margin':'0 auto', 'text-align':'center', 'font-size.px':12 };}
        else if(change.mqAlias=='lg'){ this.textDy={ 'text-align':'left' }; }
      }
   );

  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

  openHelpCall(){
     this.utilService.ModChangeSubject.next('mo-6');
  }

}
