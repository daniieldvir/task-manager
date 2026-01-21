import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

/**
 * Checks if a JWT token has expired
 * @param token - The JWT token string
 * @returns true if token is expired or invalid, false if still valid
 */
function isTokenExpired(token: string): boolean {
  try {
    // JWT structure: header.payload.signature
    const payload = token.split('.')[1];
    if (!payload) {
      return true;
    }

    // Decode base64 payload
    const decodedPayload = JSON.parse(atob(payload));

    // Check if expiration claim exists
    if (!decodedPayload.exp) {
      return false; // No expiration set, consider valid
    }

    // exp is in seconds, Date.now() is in milliseconds
    const expirationTime = decodedPayload.exp * 1000;
    const currentTime = Date.now();

    // Add a small buffer (30 seconds) to handle clock skew
    const bufferMs = 30 * 1000;

    return currentTime >= expirationTime - bufferMs;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true; // Treat as expired if parsing fails
  }
}

/**
 * Clears authentication data from localStorage
 */
function clearAuthData(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  // Check if token and user exist
  if (!token || !userStr) {
    router.navigate(['/login']);
    return false;
  }

  // Validate token expiration
  if (isTokenExpired(token)) {
    console.warn('Token has expired, redirecting to login');
    clearAuthData();
    router.navigate(['/login']);
    return false;
  }

  // Validate user data structure
  try {
    JSON.parse(userStr);
    return true;
  } catch (error) {
    console.error('Error parsing user data:', error);
    clearAuthData();
    router.navigate(['/login']);
    return false;
  }
};
