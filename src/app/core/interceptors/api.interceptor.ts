import {environment} from '../../environment/environment';
import {HttpInterceptorFn} from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('assets/')) {
    return next(req);
  }
  const apiReq = req.clone({
    url: `${environment.apiUrl}${req.url}`
  });
  return next(apiReq);
};
