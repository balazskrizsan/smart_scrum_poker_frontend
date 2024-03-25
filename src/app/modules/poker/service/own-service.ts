import {Injectable}        from '@angular/core';
import {CompanyRepository} from '../repositories/company-repository';
import {Observable}        from 'rxjs';
import {IResponseEntity}   from '../../../interfaces/i-response-entity';

@Injectable()
export class OwnService
{
    public constructor(private companyRepository: CompanyRepository)
    {
    }

    public complete(companyId: number, code: string): Observable<IResponseEntity<null>>
    {
        return this.companyRepository.getOwnComplete<null>(code);
    }

    public request(postData: {}): Observable<IResponseEntity<null>>
    {
        return this.companyRepository.postOwnRequest(postData);
    }
}
