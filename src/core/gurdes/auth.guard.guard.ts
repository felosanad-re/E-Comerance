import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

 export const authGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
   /*
     * هنتكلم علي انواع الروات
     * 1- can activate
     * ActivatedRouteSnapshot => UrlSegment??
     * UrlSegment => path & paramters
     * url => /users/10:active:true/profile
     * path = users & paramter {0}
     * path = 0 & parameter {active=true}
     * path = profile & parameter {0}
     * fragment?
     * بستعمله لما اليوسر يضغط علي عنصر واخليه ينزل لحد العنصر بكتب الاي دي بتاع العنصر ويعمل اسكرول لحد عنده
   */
   const router = inject(Router)
   let active: ActivatedRouteSnapshot = router.routerState.snapshot.root
   let stateActive: RouterStateSnapshot = router.routerState.snapshot // لو عاوز اعرض الحاجه بتاعتهم في كونسل
   return true;
 };
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
    // router.navigate(['login', '10'], {queryParams:{token:'123456'}})
    // router.navigateByUrl('/login?token=123456')
    return router.createUrlTree(['login'])
    // return false => not used
  }
}
/* خاص بالراوتس اكثر يمنع اليوسر من التنقل بين الصفحات حسب شرط معين  */
// canmatch => بيمنع تحميل الكومبونات ومش بيدخليني عليها
// canActivate => بيمنع دخولي للكومبونانت بس بيحملها
// canDeactivate => بيمنع خروجي من الكومبونانت استعمله لو عاوز اظهر رساله لليوسر انه هيخرج وكل الداتا هيفقدها
// canActviteChild => parent لكنه يقدر يدخل لل parent url جوه نفس ال url بمنع اليوسر انه يدخل علي اكتر من
