import {HttpService}       from '../services/http-service';
import {environment}       from '../../environments/environment';
import {Observable}        from 'rxjs';
import {IResponseEntity}   from '../interfaces/i-response-entity';
import {HttpHelperService} from '../services/http-helper-service';

export abstract class AbstractApiRepository
{
    httpService: HttpService;

    public abstract getController(): string;

    protected constructor(httpService: HttpService)
    {
        this.httpService = httpService;
    }

    public abstractPost<T>(postData: {} = {}, actionParam = ''): Observable<IResponseEntity<T>>
    {
        const controller = this.getController();
        const action     = actionParam === '' ? '' : '/' + actionParam;

        return this.httpService.post<T>(
          `${environment.backend.api.host}${controller}${action}`,
          HttpHelperService.createFormData(postData)
        );
    }

    public abstractDelete(idParam: number, actionParam = ''): Observable<IResponseEntity<boolean>>
    {
        const controller = this.getController();
        const action     = actionParam === '' ? '' : '/' + actionParam;

        return this.httpService.delete(`${environment.backend.api.host}${controller}${action}/${idParam}`);
    }

    public abstractGet<T>(
      idParam: number,
      actionParam = '',
      requestRelationIds?: number[]
    ): Observable<IResponseEntity<T>>
    {
        const controller         = this.getController();
        const action             = actionParam === '' ? '' : '/' + actionParam;
        const urlFriendlyIdParam = idParam ? '/' + idParam : '';

        return this.httpService.get<T>(
          `${environment.backend.api.host}${controller}${action}${urlFriendlyIdParam}`,
          HttpHelperService.createHttpParams({requestRelationIds})
        );
    }

    public abstractSeekSearch<T>(
      seekId: number,
      limit: number,
      navigationId?: number,
      requestRelationIds?: number[],
      actionParam = ''
    ):
      Observable<IResponseEntity<T>>
    {
        const controller = this.getController();
        const action     = actionParam === '' ? '' : '/' + actionParam;

        return this.httpService.get<T>(
          `${environment.backend.api.host}${controller}${action}`,
          HttpHelperService.createHttpParams({seekId, limit, navigationId, requestRelationIds})
        );
    }

    public abstractOffsetSearch<T>(offset: number, limit: number, actionParam = '', requestRelationIds?: number[]):
      Observable<IResponseEntity<T>>
    {
        const controller = this.getController();
        const action     = actionParam === '' ? '' : '/' + actionParam;

        return this.httpService.get<T>(
          `${environment.backend.api.host}${controller}${action}`,
          HttpHelperService.createHttpParams({offset, limit, requestRelationIds})
        );
    }

    public abstractUpdate(updateData): Promise<boolean>
    {
        return Promise.resolve(false);
    }
}

