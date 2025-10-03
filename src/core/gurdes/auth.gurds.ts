import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthSerService } from "../services/auth.ser.service"


export const gurdUser: CanActivateFn = ()  => {

  const router= inject(Router)
  const auth = inject(AuthSerService) // to sheard this servises with more component
  if (auth.authorized()) {
    return true
  }else {
    return router.createUrlTree(['login'])
  }
}
