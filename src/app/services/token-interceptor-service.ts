import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest
}                            from '@angular/common/http';
import {Injectable}          from '@angular/core';
import {
    from,
    lastValueFrom
}                            from 'rxjs';
import {OidcSecurityService} from "angular-auth-oidc-client";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor
{
    constructor(public oidcSecurityService: OidcSecurityService)
    {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        return from(this.handle(req, next))
    }

    async handle(request: HttpRequest<any>, next: HttpHandler)
    {
        const idToken         = await lastValueFrom(this.oidcSecurityService.getIdToken());
        const accessToken     = await lastValueFrom(this.oidcSecurityService.getAccessToken());
        const isAuthenticated = await lastValueFrom(this.oidcSecurityService.isAuthenticated());

        request = request.clone({
            headers: request.headers.set(
              'Authorization-Ids-Id-Token',
              `Bearer ${idToken}`
            )
        });
        request = request.clone({
            headers: request.headers.set(
              'Authorization-Ids-Access-Token',
              `Bearer ${accessToken}`
            )
        });

        return await lastValueFrom(next.handle(request));
    }
}
