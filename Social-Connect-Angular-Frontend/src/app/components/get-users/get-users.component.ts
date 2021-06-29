import { AdminService } from './../../services/admin.service';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit, OnDestroy {

  mediaSub!:Subscription;
  dispDy:any;
  divDy:any;
  textDy:any;



  snippet=[
    {
      id: 0,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      bio: '',
      imagepro: '',
      imagecov: '',
      authorities: [
        {
          authority:''
        }
      ],
    },
  ];

  constructor(public loginService:LoginService,
    private adminService:AdminService, private mediaObserver:MediaObserver) { }

  ngOnInit(): void {

    this.adminService.getUsers().subscribe(
      (data:any)=>{
         this.snippet=data;
      },(error)=>{console.log(error);}
    );

    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);

        if(change.mqAlias=='xs'){this.dispDy={'margin':'0 auto', 'text-align':'center',  'width.px':320, 'font-size.px':10 };}
        if(change.mqAlias=='sm'){this.dispDy={'margin':'0 auto', 'text-align':'center',  'width.px':560, 'font-size.px':10 };}
        else if(change.mqAlias=='lg'){ this.dispDy={ 'width.px': 800 }; }

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

}
