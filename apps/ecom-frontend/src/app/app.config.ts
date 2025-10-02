import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideQueryClient,
  QueryClient,
} from '@tanstack/angular-query-experimental';   
import { SsrStorageService } from './auth/ssr-storage.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AbstractSecurityStorage, authInterceptor, LogLevel, provideAuth } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor()])),
    provideAuth({
      config: {
        authority: environment.kinde.authority,
        redirectUrl: environment.kinde.redirectUrl,
        postLogoutRedirectUri: environment.kinde.postLogoutRedirectUri,
        clientId: environment.kinde.clientId,
        scope: 'openid profile email offline',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Warn,
        secureRoutes: [environment.apiUrl],
        customParamsAuthRequest: {
        audience: environment.kinde.audience
      },
    }
    }),
     { provide: AbstractSecurityStorage, useClass: SsrStorageService },
    provideQueryClient(new QueryClient())
    
  ],
};
