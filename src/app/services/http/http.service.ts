import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

const DEFAULT_MESSAGE = 'Unknown error',
  DEFAULT_NAME = 'Error',
  DEFAULT_STATUS = -1;

export class HttpError {
  message: string;
  name: string;
  status: number;

  constructor(obj: any) {
    this.message  = obj && obj.message || DEFAULT_MESSAGE;
    this.name     = obj && obj.name    || DEFAULT_NAME;
    this.status   = obj && obj.status  || DEFAULT_STATUS;
  }
}

@Injectable()
export class HttpService {
  private apiUrl = environment.apiUrl;
  private activeSpinnerRequests = 0;
  private isRequestActiveSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isRequestActive$: Observable<boolean> = this.isRequestActiveSource.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  private addSpinnerRequest() {
    this.activeSpinnerRequests += 1;
    this.isRequestActiveSource.next(true);
  }

  private removeSpinnerRequest() {
    this.activeSpinnerRequests -= 1;
    this.isRequestActiveSource.next(!!this.activeSpinnerRequests);
  }

  public getData(path, query) {
    const options: any = {};
    if (query) options.params  = this.setParams(null, query);

    return this.http.request('get', this.apiUrl + '/' + path,  options )
            .catch((e: HttpErrorResponse) => this._handleError(this._parseResponse(e.error), {
              statusCode: e.status,
              statusText: e.statusText
            }));
  }

  private setParams(httpParams, query: { [name: string]: string | any }, prefix: string = ''): HttpParams {
    let _httpParams = httpParams || new HttpParams();

    Object.keys(query).forEach(key => {
      let _value = query[key];

      // skip empty values
      if (_value === undefined || (typeof _value === 'number' && isNaN(_value)) || (typeof _value === 'string' && !_value)) {
        return;
      }

      if (_value === null) {
        _httpParams.delete(key);
        return;
      }

      if (Array.isArray(_value)) {
        _httpParams = this.httpParamsAppend(_httpParams, key, _value);
      } else if (typeof _value === 'object') {
        _httpParams = this.setParams(_httpParams, _value, key + '.');
      } else {
        _httpParams = _httpParams.append(key, encodeURIComponent(_value));
      }
    });

    return _httpParams;
  }

  private httpParamsAppend(httpParams: HttpParams, key: string, value: string[]): HttpParams {
    value.forEach(element => {
      let _val = (typeof element === 'object') ? element : encodeURIComponent(element);
      httpParams = httpParams.append(`${key}[]`, _val);
    });
    return httpParams;
  }

  private _handleError(error, status) {
    return Observable.throw(new HttpError(error || {
      name:    'Server Error',
      status:  status.statusCode,
      message: status.statusText
    }));
  }

  private _parseResponse(response) {
    let _response = response;
    let bodyContent: string;

    try {
      _response = JSON.parse(bodyContent);
    } catch (e) {
      _response = null;
    }

    return _response;
  }



}
