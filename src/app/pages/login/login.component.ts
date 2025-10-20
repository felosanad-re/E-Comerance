import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSerService } from '../../../core/services/auth.ser.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, RouterModule } from '@angular/router';
import { ILogin } from '../../../core/interfaces/ilogin';
import { ImportsAuthModule } from '../../../core/modules/imports-auth/imports-auth.module';
import { UserDataService } from '../../../core/services/user-data.service';
import { NotificationService } from '../../../core/services/notification.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ImportsAuthModule,
    RouterModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  constructor(
      private _authSerService:AuthSerService,
      private _notificationService: NotificationService,
      private router: Router,
      private _userDataService:UserDataService
  ){
    this.initFormsControls(),
    this.initFormGroub()
  }
  username!: FormControl
  password!: FormControl
  logIn!: FormGroup
  initFormsControls():void{
    this.username = new FormControl("",Validators.required),
    this.password = new FormControl("", Validators.required)
  }
  initFormGroub():void {
    this.logIn =new FormGroup({
      username: this.username,
      password: this.password
    })
  }

  // submit button
  submit(){
    if (this.logIn.valid) {
      this.signIn(this.logIn.value)
    }else{
      this.logIn.markAllAsTouched();
      Object.keys(this.logIn.controls).forEach((control) => this.logIn.controls[control].markAsDirty())
    }
  }

  signIn(data:ILogin):void{
    this._authSerService.logIn(data).subscribe // call API => (انا مستعمل موقع خارجي)
    ({
      next: (response) =>  // api الاستجابه اللي هتجيلي من تسجيل الدخول حسب ال
        {
        if (response.id)  // يبقا الحساب اتعمل id بقوله الاستجابه لو جالي فيها
          {
        // console.log(response);
        this._notificationService.showSuccsess('Success', "logIn successful") // toast mssge is create account
        this._userDataService.userName.next(response.username) // هنا انا بجيب اسم المستخدم لما يعمل تسجيل دخول
        localStorage.setItem('token', response.id) // take id and save in local storge
        localStorage.setItem('userName', response.username)
        localStorage.removeItem("defultName")
        }
        this.router.navigate(['home']) // بعد ما تسجيل الحساب يتم انتقل لصفحه تسجيل الدخل
      },
      error: (err) => // id يعني مفيش  else  كاني بقوله
        {
        // console.log(err);
        this._notificationService.showError('Error', "incorrect password") // بيظهر الماسج اللي بتدل علي نوع الخطاء
      }
    })
  }
  // toast mssge call function
}
