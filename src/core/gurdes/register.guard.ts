import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../app/pages/register/register.component';
// بعمله علشان اخلي العميل يكمل التسجيل ومعلوماته متضعش اللي كتبها لو داس علي حاجه غلط
export const registerGuard: CanDeactivateFn<RegisterComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if ( !component.isRegistred && component.registeratinForm.valid) {
    const alert = window.confirm('are u sure? u will lose your data')
    return alert
  }
  // console.log(component);
  // console.log(nextState);
  return true;
};
