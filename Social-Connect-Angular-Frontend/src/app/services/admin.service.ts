import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //add user
  public addUser(user: any){
      return this.http.post(`${baseUrl}/user/`,user);
  }

  //update user:
  public updateUser(user:any){
    console.log('localUser in update method:'+user)
    return this.http.put(`${baseUrl}/user/`,JSON.parse(user));
  }

  //update user:
  public updateUserProflieUrl(user:any,proUrl:string,covUrl:string){
    user=JSON.parse(user);
    if(proUrl!="")
    user.imagepro=proUrl;
    if(covUrl!="")
    user.imagecov=covUrl;
    return this.http.put(`${baseUrl}/user/`,user);
  }

  //upload profile:
  public uploadProfile(userpro:any){
    let formData = new FormData();
    formData.append('userpro', userpro, userpro.name);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.post(`${baseUrl}/user/user-profile`,formData,options);
  }

  //upload cover:
  public uploadCover(usercov:any){
    let formData = new FormData();
    formData.append('usercov', usercov, usercov.name);
    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.post(`${baseUrl}/user/user-cover`,formData,options);
  }

  //delete user
  public deleteUser(uid:any){
    return this.http.delete(`${baseUrl}/user/${uid}`);
  }

  //get user
  public getUsers(){
    return this.http.get(`${baseUrl}/user/`);
  }

  //add friend users
  public getUsersWithNoFriends(){
    return this.http.get(`${baseUrl}/user/not-friend`);
  }

  //get friends
  public getFriends(){
    return this.http.get(`${baseUrl}/user/get-friends`);
  }

  //add friend
  public addFriend(username:string){
    return this.http.post(`${baseUrl}/user/add-friend/${username}`,username);
  }

  //add friend
  public removeFriend(friendid:string){
    return this.http.post(`${baseUrl}/user/remove-friend/${friendid}`,friendid);
  }

  public getUserById(uid:number){
    return this.http.get(`${baseUrl}/user/${uid}`);
  }

  //add post
  public addPost(post:any,url:string){
    post=JSON.parse(post);
    console.log(url);
    post.image=url;
    console.log(post);
    return this.http.post(`${baseUrl}/user/add-post`,post);
  }

  //edit post
  public editPost(post:any,url:string){
    post=JSON.parse(post);
    console.log(url);
    post.image=url;
    console.log(post);
    return this.http.post(`${baseUrl}/user/edit-post`,post);
  }

  //edit friend post
  public editFriendPost(post:any,url:string,uid:string){
    post=JSON.parse(post);
    console.log(url);
    post.image=url;
    console.log(post);
    return this.http.post(`${baseUrl}/user/edit-friendpost/${uid}`,post);
  }

  //get youtube videos
  public getVideos(search:string){
         return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=Google_API_Key
         &type=video&maxResults=10&q=${search}`);
       
  }

  //get post
  public getPosts(){
    return this.http.get(`${baseUrl}/user/get-posts`);
  }

  //remove post
  public removePost(postid:any){
     return this.http.post(`${baseUrl}/user/remove-post/${postid}`,postid);
  }

  //get covid info
  public getCovidInfo(){
    return this.http.get(`https://api.covid19api.com/summary`);
  }

  //get location data
  public getIpapiData(){
    return this.http.get(`https://ipapi.co/json/`);
  }

}
