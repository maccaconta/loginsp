import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvVariables } from './dialog.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationServiceService {
    private configData: EnvVariables | undefined;
    private readonly configPath: string = environment.envURL;
  constructor( private http: HttpClient) { }

  async loadConfiguration(): Promise<EnvVariables> {
    try {
      const response = await this.http.get<EnvVariables>(`${this.configPath}`)
        .toPromise();
      this.configData = response;
      return this.configData;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  get config(): EnvVariables | undefined {
    return this.configData;
  }
}
