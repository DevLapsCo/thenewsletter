import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../services/user-data/user.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Check for a custom header indicating to skip this interceptor
  if (req.headers.get('X-Skip-JWT-Interceptor')) {
    return next(req);
  }
  
  // Get the JWT token from localStorage
  const token = sessionStorage.getItem('jwt_tkn');
  // var refreshToken = inject(UserService)

  // refreshToken.refreshToken()
  
  if (token) {
    // Clone the request and add the token to the Authorization header
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type' : 'application/json'
      }
    });
    return next(clonedRequest);
  }
  
  return next(req);
};