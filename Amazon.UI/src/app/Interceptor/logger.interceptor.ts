import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../Services/user-service.service';
import { inject } from '@angular/core';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService)
  const token = userService.getToken()

  const authReq = req.clone({
    headers: req.headers.set('Authorization',` Bearer ${token}`) //.set('Content-Type', 'application/json')
  })

  return next(authReq);
};
