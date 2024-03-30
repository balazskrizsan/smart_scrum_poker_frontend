import {BrowserModule}              from '@angular/platform-browser';
import {NgModule}                   from '@angular/core';
import {AppComponent}               from './app.component';
import {
    FormsModule,
    ReactiveFormsModule
}                                   from '@angular/forms';
import {
    PreloadAllModules,
    RouterModule
}                                   from '@angular/router';
import {BrowserAnimationsModule}    from '@angular/platform-browser/animations';
import {
    HTTP_INTERCEPTORS,
    HttpClientModule
} from '@angular/common/http';
import {HttpService}                from './services/http-service';
import {LocalStorageService}        from './services/local-storage-services';
import {LeftMenuModule}             from './modules/left-menu/left-menu.module';
import {ModalsModule}               from './modules/modals/modals.module';
import {CommonsModule}             from './modules/commons/commons.module';
import {LayoutModule}              from './modules/layout/layout-module';
import {LayoutRightBlockComponent} from './modules/layout/layout-right-block.component';
import {FlashMessageModule}        from './modules/flash-message/flash-message-module';
import {FlashMessageState}         from './modules/flash-message/states/flash-message-state';
import {FlashMessageService}       from './modules/flash-message/services/flash-message-service';
import {
    AuthModule,
    LogLevel
}                                  from 'angular-auth-oidc-client';
import {environment}               from "../environments/environment";
import {TokenInterceptorService}   from "./services/token-interceptor-service";
import {RxStompService}            from "./modules/commons/services/rx-stomp-service";

@NgModule(
  {
      declarations: [AppComponent, LayoutRightBlockComponent],
      imports:      [
          BrowserAnimationsModule,
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule,
          RouterModule.forRoot(
            [
                {
                    path:         'poker',
                    loadChildren: () => import('./modules/poker/poker.module').then(m => m.PokerModule)
                },
                {
                    path:         'account',
                    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
                }
            ],
            {preloadingStrategy: PreloadAllModules}
          ),
          LeftMenuModule,
          ModalsModule,
          CommonsModule,
          LayoutModule,
          FlashMessageModule,
          AuthModule.forRoot({
              config: {
                  authority:               environment.backend.account.identityServerUrl,
                  redirectUrl:             'https://localhost:4200',
                  clientId:                'sj.frontend',
                  postLogoutRedirectUri:   window.location.origin,
                  scope:                   'openid profile sj sj.frontend offline_access',
                  responseType:            'code',
                  silentRenew:             true,
                  useRefreshToken:         true,
                  disablePkce:             true,
                  logLevel:                LogLevel.Debug,
                  customParamsAuthRequest: {"acr_values": "idp:Facebook"}
              },
          })
      ],
      providers:    [
          HttpService,
          LocalStorageService,
          FlashMessageState,
          FlashMessageService,
          LayoutRightBlockComponent,
          {
              provide:  HTTP_INTERCEPTORS,
              useClass: TokenInterceptorService,
              multi:    true
          },
          RxStompService,
      ],
      bootstrap:    [AppComponent],
  }
)
export class AppModule
{
}
