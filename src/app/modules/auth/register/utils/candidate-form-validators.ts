import { AbstractControl } from '@angular/forms';

export const passwordMatchValidator = (control: AbstractControl) => {
  const password = control.get('password');
  const confirmPassword = control.get('passwordConfirm');

  if (password?.value !== confirmPassword?.value) {
    return { passwordMismatch: true };
  }

  return null;
};

export const ageRangeValidator = (control: AbstractControl) => {
  const birthDate = new Date(control.value);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();

  if (age < 18 || age > 99) {
    return { invalidAge: true };
  }

  return null;
};
