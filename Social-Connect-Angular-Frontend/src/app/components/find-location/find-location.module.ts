import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindLocationComponent } from './find-location/find-location.component';
import {MatDividerModule} from '@angular/material/divider';
import {AgmCoreModule} from '@agm/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [

    FindLocationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDividerModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBkyWILV75BGj1Vre4XIDyKGpTgK6s0YiU'
    })
  ],
  exports:[RouterModule,FindLocationComponent]
})
export class FindLocationModule { }
