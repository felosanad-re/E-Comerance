import { NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthSerService } from '../../../core/services/auth.ser.service';
import { Iregister } from '../../../core/interfaces/iregister';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { AutoFocusModule } from 'primeng/autofocus';



@NgModule({
  declarations: [],
  imports: [
  ReactiveFormsModule,
  InputGroupModule,
  InputGroupAddonModule,
  InputTextModule,
  ButtonModule,
  MessagesModule,
  ButtonModule,
  NgxSpinnerModule,
  AutoFocusModule
    ],
  exports: [
      ReactiveFormsModule,
  InputGroupModule,
  InputGroupAddonModule,
  InputTextModule,
  ButtonModule,
  MessagesModule,
  ButtonModule,
  NgxSpinnerModule,
  AutoFocusModule
  ],
})
export class ImportsAuthModule { }
