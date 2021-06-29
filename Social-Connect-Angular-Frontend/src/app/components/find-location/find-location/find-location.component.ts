import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.component.html',
  styleUrls: ['./find-location.component.css']
})
export class FindLocationComponent implements OnInit, OnDestroy {

  ipapiData={
    ip:'',
    city: '',
    region: '',
    country_name: '',
    postal: '',
    latitude: 0,
    longitude: 0,
    country_calling_code: '',
    currency_name: '',
    country_area: 0,
    country_population: 0,
    org: ''
}

searchData={
    location:'',
    city:'',
    street:'',
    height:100,
    width:100,
    zoom:12
}

mediaSub!:Subscription;
findLocDy:any;
LocValDy:any;


  constructor(private userService:UserService,
              private sanitizer:DomSanitizer,
              private mediaObserver:MediaObserver) { }

  getUrl(url:string)
  { return this.sanitizer.bypassSecurityTrustResourceUrl(url); }

  ngOnInit(): void {
     this.userService.getIpapiData().subscribe(
       (data:any)=>{
          this.ipapiData=data;
          this.searchData.location=this.ipapiData.country_name;
          this.searchData.city=this.ipapiData.city;
          this.searchData.street=this.ipapiData.city;
       },(error)=>{console.log(error)}
     );

     this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);
        if(change.mqAlias=='xs'){ this.findLocDy={ 'width.px': 350, 'margin':'0 auto' };}
        else if(change.mqAlias=='sm'){ this.findLocDy={ 'width.px': 620, 'margin':'0 auto' };}
        else if(change.mqAlias=='lg'){this.findLocDy={ 'margin-left.px':24, 'text-align':'center' };}

        if(change.mqAlias=='xs'){ this.LocValDy={ 'width.px': 350, 'margin':'0 auto', 'color':'black' };}
        else if(change.mqAlias=='sm'){ this.LocValDy={ 'width.px': 620, 'margin':'0 auto', 'color':'black' };}
        else if(change.mqAlias=='lg'){this.LocValDy={ 'margin-left.px':8, 'color':'black' };}

      }
   );
  }

  ngOnDestroy(): void {
    if(this.mediaSub){
      this.mediaSub.unsubscribe();
    }
}

}
