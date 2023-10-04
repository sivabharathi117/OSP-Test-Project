import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(requestParam: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = requestParam;
        const token = localStorage.getItem('token');
        let headers: any = {};
        if (token) {
            headers = {
                'Accept': 'application/json',
                'Authorization': token
            };
        } else {
            headers = {
                'Accept': 'application/json'
            };
        }
        if (!request.headers.has('Content-Type')) {
            headers['Content-Type'] = 'application/json';
        }
        const apiUri = request.url;
        const url = environment.baseApiUrl + apiUri;

        request = request.clone({
            url: url,
            headers: new HttpHeaders(headers)
        });

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                return throwError(() => err);
            })
        );
    }

}
