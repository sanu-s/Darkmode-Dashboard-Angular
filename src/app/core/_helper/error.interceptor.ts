import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService, NotifierService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private notifierService: NotifierService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                if(this.authenticationService.currentUserValue){
                    this.authenticationService.refreshToken(this.authenticationService.currentUserValue).subscribe(x=>{
                        localStorage.setItem('currentUser', JSON.stringify(x));
                        this.authenticationService.setcurrentUserValue(x)
                        location.reload(true);
                    }, () => {
                        // this.authenticationService.logout().subscribe(()=>{
                        //     localStorage.removeItem('currentUser');
                        // });
                        // location.reload(true);
                
                    })
                } else {
                    // location.reload(true)
                    // this.authenticationService.logout().subscribe(()=>{
                    //     localStorage.removeItem('currentUser');
                    // });
                    
                }


                
            }
            const error = err.error.detail || err.statusText;
            this.notifierService.openSnackBar(error, 'Retry')
            return throwError(error);
        }))
    }
}