import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authImage'
})
export class AuthImagePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
    private loginService:LoginService , // our service that provides us with the authorization token
  ) {}

  async transform(src: string): Promise<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`,'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
    try {
      if(src.indexOf('g')==12 && src.indexOf('o')==13 && src.indexOf('.')==11){
        return src;
      } else{
        const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
        const reader = new FileReader();
        return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageBlob);
        });
      }

    } catch {
      return 'assets/image/default123.jpg';
    }
  }
}
