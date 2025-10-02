import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthSerService } from '../../../core/services/auth.ser.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ILogin } from '../../../core/interfaces/ilogin';
import { ImportsAuthModule } from '../../../core/modules/imports-auth/imports-auth.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ImportsAuthModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  constructor(
      private _authSerService:AuthSerService,
      private _messageService: MessageService,
      private _ngxSpinnerService:NgxSpinnerService,
      private router: Router
  ){
    this.initFormsControls(),
    this.initFormGroub()
  }
  name!: FormControl
  password!: FormControl
  logIn!: FormGroup
  initFormsControls():void{
    this.name = new FormControl("",Validators.required),
    this.password = new FormControl("", Validators.required)
  }
  initFormGroub():void {
    this.logIn =new FormGroup({
      username: this.name,
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
    this._ngxSpinnerService.show(); // كود الانتظار
    this._authSerService.logIn(data).subscribe // call API => (انا مستعمل موقع خارجي)
    ({
      next: (response) =>  // api الاستجابه اللي هتجيلي من تسجيل الدخول حسب ال
        {
        if (response.id)  // يبقا الحساب اتعمل id بقوله الاستجابه لو جالي فيها
          {
        console.log(response);
        this.show("success", 'success', "logIn successful") // toast mssge is create account
        localStorage.setItem('token', response.id) // take id and save in local storge
        }
        this._ngxSpinnerService.hide() // Spinner بوقف ال
        this.router.navigate(['user']) // بعد ما تسجيل الحساب يتم انتقل لصفحه تسجيل الدخل
      },
      error: (err) => // id يعني مفيش  else  كاني بقوله
        {
        console.log(err);
        this.show("error", 'Error', "incorrect password") // بيظهر الماسج اللي بتدل علي نوع الخطاء
        this._ngxSpinnerService.hide();
      }
    })
  }
  // toast mssge call function
  show(severity: string, summary:string, detail: string) {
      this._messageService.add({
        severity: severity,
        summary: summary,
        detail: detail,
      });
  }
}
