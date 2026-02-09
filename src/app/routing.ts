import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path:     '',
        children: [
            {
                path:          '',
                loadComponent: () => import('./modules/home/actions/index-action.component')
                  .then(m => m.IndexActionComponent)
            }
        ]
    },
    {
        path:     'poker',
        children: [
            {
                path:          '',
                loadComponent: () => import('./modules/poker/controllers/create-action.component')
                  .then(m => m.CreateActionComponent)
            },
            {
                path:          'create',
                loadComponent: () => import('./modules/poker/controllers/create-action.component')
                  .then(m => m.CreateActionComponent)
            },
            {
                path:          'my-pokers',
                loadComponent: () => import('./modules/poker/controllers/my-pokers-action.component')
                  .then(m => m.MyPokersActionComponent)
            },
            {
                path:          'display/:secureId',
                loadComponent: () => import('./modules/poker/controllers/display-action.component')
                  .then(m => m.DisplayActionComponent)
            }
        ]
    },
    {
        path:     'account',
        children: [
            {
                path:          '',
                loadComponent: () => import('./modules/account/actions/insecure-create-action.component')
                  .then(m => m.InsecureCreateActionComponent)
            },
            {
                path:          'login',
                loadComponent: () => import('./modules/account/actions/insecure-create-action.component')
                  .then(m => m.InsecureCreateActionComponent)
            },
            {
                path:          'logout',
                loadComponent: () => import('./modules/account/actions/logout.component')
                  .then(m => m.LogoutComponent)
            }
        ]
    }
];
