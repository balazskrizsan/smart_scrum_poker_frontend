import {HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import {environment} from '../../environments/environment';
import {HttpService} from './http-service';

@Injectable()
@Inject(HttpService)
export class FileService {
  constructor(private httpService: HttpService) {
  }

  public downloadJsonFile(uri: string, fileName: string): void {
    // const headers = new HttpHeaders({'Accept': 'application/json'});
    // this.httpService.get(environment.backend.api.host + uri, {headers: headers})
    //   .toPromise()
    //   .then(responseData => this.saveAs(responseData, fileName))
    //   .catch(error => console.log(error));
  }

  private saveAs(responseData: string, fileName: string): void {
    // saveAs(new Blob([responseData], {type: 'text/plain'}), fileName);
  }
}

