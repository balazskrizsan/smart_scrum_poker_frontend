import {BrowserModule}             from '@angular/platform-browser';
import {NgModule}                  from '@angular/core';
import {AppComponent}              from './app.component';
import {
    FormsModule,
    ReactiveFormsModule
}                                  from '@angular/forms';
import {HttpService}               from './services/http-service';
import {LocalStorageService}       from './services/local-storage-service';
import {LayoutRightBlockComponent} from './modules/layout/layout-right-block.component';
import {FlashMessageState}         from './modules/flash-message/states/flash-message-state';
import {FlashMessageService}       from './modules/flash-message/services/flash-message-service';
import {RxStompService}            from "./modules/commons/services/rx-stomp-service";
import {AccountService}            from "./modules/account/service/account-service";

@NgModule(
  {
      declarations: [],
      imports:      [
          AppComponent,
          LayoutRightBlockComponent,
          // BrowserAnimationsModule,
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          // RouterModule.forRoot(
          //   [
          //       {
          //           path:         'poker',
          //           loadChildren: () => import('./modules/poker/poker.module').then(m => m.PokerModule)
          //       },
          //       {
          //           path:         'account',
          //           loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
          //       },
          //       {
          //           path:         '',
          //           loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
          //       },
          //       {
          //           path:         'pages',
          //           loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
          //       },
          //   ],
          //   {
          //       preloadingStrategy:        PreloadAllModules,
          //       anchorScrolling:           'enabled',
          //       scrollPositionRestoration: 'enabled',
          //       scrollOffset:              [0, 90],
          //   }
          // ),
          // ModalsModule,
          // CommonsModule,
          // LayoutModule,
          // FlashMessageModule,
      ],
      providers:    [
          HttpService,
          LocalStorageService,
          FlashMessageState,
          FlashMessageService,
          AccountService,
          RxStompService,
      ],
      bootstrap:    [],
  }
)
export class AppModule
{
}
