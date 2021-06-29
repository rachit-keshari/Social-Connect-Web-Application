import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AgmCoreModule} from '@agm/core';
import { FindLocationModule } from './components/find-location/find-location.module';
import {AuthService, AuthServiceConfig} from 'angularx-social-login';
import { SocialLoginModule,GoogleLoginProvider} from 'angularx-social-login';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';


import { authInterceptorProviders } from './services/auth.interceptor';
import { AuthImagePipe } from './pipes/auth-image.pipe';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { FriendsComponent } from './components/friends/friends.component';
import { RemoveFriendComponent } from './components/remove-friend/remove-friend.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { MyTimelineComponent } from './components/my-timeline/my-timeline.component';
import { HelpComponent } from './components/help/help.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { FriendProfileComponent } from './components/friend-profile/friend-profile.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TrendingVideosComponent } from './components/trending-videos/trending-videos.component';
import { CovidInfoComponent } from './components/covid-info/covid-info.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { GetUsersComponent } from './components/get-users/get-users.component';


export function provideConfig(){
  const config = new AuthServiceConfig([{ id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('453036754442-o78jqcaq3fs3l3ivikc21sc0fbr04vvg.apps.googleusercontent.com')}]);
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AuthImagePipe,
    AddFriendComponent,
    FriendsComponent,
    RemoveFriendComponent,
    PhotoGalleryComponent,
    MyTimelineComponent,
    HelpComponent,
    MyProfileComponent,
    FriendProfileComponent,
    ReversePipe,
    AuthImagePipe,
    TrendingVideosComponent,
    CovidInfoComponent,
    SettingsComponent,
    AboutUsComponent,
    ContactUsComponent,
    DeleteUserComponent,
    GetUsersComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBGU_vl5qEt4QwfkbGQwfJJV0IUdbA8Og8'

    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatBadgeModule,
    MatAutocompleteModule,
    SocialLoginModule,
    MatProgressBarModule,
    FindLocationModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
