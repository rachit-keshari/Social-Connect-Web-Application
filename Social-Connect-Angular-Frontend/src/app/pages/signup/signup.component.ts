import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService,private snackBar: MatSnackBar) {
   }

   public user = {
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    phone:'',
    email:'',
    imagepro:'',
    imagecov:'',
    bio:'',
    }

    ngOnInit(): void {}

    formSubmit() {
    console.log(this.user);
    if(this.user.username==null || this.user.username=="")
    { this.snackBar.open('Username is required', 'Close'); }
    else
    {
      //addUser: userservice
     this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data)
        if(data)
        Swal.fire('Registered','You are Registered Successfully!','success');
        else
        Swal.fire('Username already exist!','set other Username which is unique', 'error');
        },
       (error)=>{
        console.log(error)
        this.snackBar.open('Something went wrong !! Try again.','close');
      }
     );
  }
  }

}
