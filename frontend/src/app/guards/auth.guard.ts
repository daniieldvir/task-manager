import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) {
    router.navigate(['/login']);
    return false;
  }

  try {
    JSON.parse(userStr);
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.navigate(['/login']);
    return false;
  }
};
