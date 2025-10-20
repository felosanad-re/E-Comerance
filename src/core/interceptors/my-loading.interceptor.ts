import { NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';


// القديم بيكون عباره عن كلاس
// بعمل شاشه لودنج تشتغل مع كل ريكويست
export const myLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spiner = inject(NgxSpinnerService)
  spiner.show()
  return next(req).pipe(finalize(()=> {
    spiner.hide()
  }))
};
