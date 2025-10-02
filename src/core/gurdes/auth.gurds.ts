import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"

/*
  * gurds
  * CanActivateFn : boolean | URLTree
*/
export const gurdUser: CanActivateFn = ()  => {
  /*
    * لما كنت بعمل نفجيت جوه الكومبونانت كان عندي كلاس بعمل اندبيندانس علشان اقدر استعمل الموديل بتاع الروتر
    * هنا ان افي داله مفيش كلاس علشان اقدر استعمل نفس الطريقه
    * بيعمل نفس شغل الكلاس جوه الكومبونانت واقدر اني استعدي الروتر موديول Injector في الداله في
  */
  const router= inject(Router)
  if (localStorage.getItem('token') != null) {
    return true
  }else {
    router.navigate(['login'])
    return false
  }
}
