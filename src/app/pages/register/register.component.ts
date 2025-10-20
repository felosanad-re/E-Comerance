import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { AuthSerService } from '../../../core/services/auth.ser.service';
import { Iregister } from '../../../core/interfaces/iregister';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ImportsAuthModule } from '../../../core/modules/imports-auth/imports-auth.module';
import { NotificationService } from '../../../core/services/notification.service';
// import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ImportsAuthModule // has all modules i need in register and login
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
    constructor(
      private _authSerService:AuthSerService,
      private _notificationService: NotificationService,
      private _ngxSpinnerService:NgxSpinnerService,
      private router: Router,
    ){
    this.initFormControls()
    this.iniFormGroub()
  }
  name!: FormControl
  email!: FormControl
  password!: FormControl
  avatar!: FormControl
  registeratinForm!: FormGroup
  messages!: Message[] ;
  value!: string;
  isRegistred: boolean = false

  initFormControls():void{
    this.name = new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.password = new FormControl('', [Validators.required])
    this.avatar = new FormControl('', [Validators.required,])  //this.passwordMatch(this.password)
  }
  iniFormGroub():void{
    this.registeratinForm = new FormGroup({
      email : this.email,
      password : this.password,
      name : this.name,
      avatar : this.avatar,
    })
  }
  /* هعمله كومنت لان الاي بي اي اللي جبته مش بيقبل الري باسورد
  https://picsum.photos/800 => هستعمل الكود ده علشان بس اتست الفورم شغاله صح ولا لا
  * لو لقيت فيك اي بي اي جدديد هبقي اعدله
  passwordMatch(pass:AbstractControl):  ValidatorFn  {
    return (rePsas:AbstractControl): {[key:string]: boolean} | null => {
      if(rePsas.value !== pass.value || rePsas.value === ''){
        return {passowrdnotmatch: true}
      } else return null
    }
  }
    */
  submit(){
    if (this.registeratinForm.valid) {
      this.isRegistred = true
      this.signUp(this.registeratinForm.value)
    }else{
      this.registeratinForm.markAllAsTouched();
      Object.keys(this.registeratinForm.controls).forEach((control) => this.registeratinForm.controls[control].markAsDirty())
    }
  }

  signUp(data:Iregister):void{
    this._ngxSpinnerService.show();
    this._authSerService.register(data).subscribe({
      next: (response) => {
        if (response.id) {
        // console.log(response);
        this._notificationService.showSuccsess('success', "created successful")
        /*
        * هنا بخليه يجيب اليوسر نيم و الباسورد اللي سجل بيهم وينقله علي طول لصفحه الهوم بدل ما يعمل تسجيل دخول
        * const {name, password} = data
        * this._authSerService.logIn({name, password}).subscribe((next)=> this.router.navigate(['home']))
        * this._userDataService.userName.next(response.username) // هنا انا بجيب اسم المستخدم لما يعمل تسجيل دخول
        */
        }
        this._ngxSpinnerService.hide()
        this.router.navigate(['login'])
      },
      error: (err) => {
        console.log(err);
        this._notificationService.showError('Error', err.error.message)
        this._ngxSpinnerService.hide();
      }
    })
  }
}
