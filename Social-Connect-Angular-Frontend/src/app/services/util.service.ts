import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  //toggle var
  public sidenavSubject=new Subject<boolean>();

  //toggle var
  public sidenavMobileTrigger=new Subject<any>();

  //nav mod switch
  public ModChangeSubject=new Subject<string>();

  //open profile
  public openProfileSubject= new Subject<number>();

  //send Edit Profile click
  public openEditProfileClick = new Subject<any>();

  //navbar color val
  public navColorChange = new Subject<any>();

  //drawer content bg val
  public bgValChange = new Subject<any>();

  //login trigger
  public loginTrigger = new Subject<any>();
}
