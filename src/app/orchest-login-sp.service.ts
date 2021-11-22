import { OrchestDataRequest, OrchestDataResponse } from './dialog.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import { delay, retryWhen, mergeMap} from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class OrchestLoginSPService {

  orquestResponse = {} as OrchestDataRequest

  constructor(private http: HttpClient) { }

  postOrchest(data: OrchestDataRequest, url_: string): Observable<OrchestDataResponse>  {
    let retry_: number = 0;

    return this.http.post<OrchestDataResponse>(url_, data)
    
    .pipe(
        retryWhen(
            error => 
              error.pipe(

                delay(2000),
       
                mergeMap(error => {

                    if ( ++ retry_ == 0) {
                        return throwError(error);
                    }

                    console.log("Tentando se conectar ao Orchest ...")
                    return of(error);

                })
            )
        ),
    )}   
}
