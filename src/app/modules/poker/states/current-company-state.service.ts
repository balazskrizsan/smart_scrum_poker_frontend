import {Injectable}        from '@angular/core';
import {
  BehaviorSubject,
  Observable
}                          from 'rxjs';
import {IViewDataRegistry} from '../interfaces/i-view-data-registry';

@Injectable()
export class CurrentCompanyState
{
    private data$ = new BehaviorSubject<IViewDataRegistry>({
        company:            null,
        companyStatistic:   null,
        companyGroups:      null,
        companyReviews:     null,
        companyAddresses:   null,
        companyAddressMaps: null,
        companyOwners:      null,
    });

    next(data: IViewDataRegistry): void
    {
        this.data$.next(data);
    }

    get(): Observable<IViewDataRegistry>
    {
        return this.data$.asObservable();
    }
}
