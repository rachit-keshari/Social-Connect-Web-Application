import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  colorVal:string='primary';

  constructor(private utilService:UtilService) { }

  ngOnInit(): void {
  }

  onColorChange(){
    this.utilService.navColorChange.next(this.colorVal);
  }

  onBgValChange(bgVal:string){
    this.utilService.bgValChange.next(bgVal);
  }


}
