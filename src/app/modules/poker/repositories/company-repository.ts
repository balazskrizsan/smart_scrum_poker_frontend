import {Injectable}            from '@angular/core';
import {HttpService}           from '../../../services/http-service';
import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';
import {Observable}            from 'rxjs';
import {IResponseEntity}       from '../../../interfaces/i-response-entity';
import {environment}           from '../../../../environments/environment';
import {HttpHelperService}     from '../../../services/http-helper-service';

@Injectable()
export class CompanyRepository extends AbstractApiRepository
{
    public constructor(httpService: HttpService)
    {
        super(httpService);
    }

    public getController(): string
    {
        return 'company';
    }

    public getOwnComplete<T>(code: string): Observable<IResponseEntity<T>>
    {
        const controller = this.getController();

        return this.httpService.get<T>(
          `${environment.backend.api.host}${controller}/own-complete/${code}`,
          HttpHelperService.createHttpParams({})
        );
    }

    public postOwnRequest(postData: {}): Observable<IResponseEntity<null>>
    {
        const controller = this.getController();

        return this.httpService.post<null>(
          `${environment.backend.api.host}${controller}/own-request`,
          HttpHelperService.createFormData(postData)
        );
    }
}
