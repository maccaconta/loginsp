import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { combineLatest, filter, isEmpty, map     } from 'rxjs/operators';
import { pipe, Subscriber } from 'rxjs';

import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';
import { OrchestLoginSPService } from './orchest-login-sp.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { OrchestDataRequest } from './dialog.model';
import { ConfigurationServiceService } from './configuration-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title:string = "";
  id: any = "";
  fluxo!: boolean;
  data_request:OrchestDataRequest;
  logado: boolean;
  username: string;
  redirect: string;
  url_orchest: string;
  sub_1: any;
  sub_2: any;

  authCodeFlowConfig:AuthConfig 

  constructor( private oauthService: OAuthService,
    private route: ActivatedRoute,
    private Orchest_service_: OrchestLoginSPService,
    private ENV_: ConfigurationServiceService){

    this.logado = false
    this.username = ""

    let redirect_: string = ""

    this.data_request = {"id": "",
                         "payload": {}}

    this.url_orchest = "http://127.0.0.1:8000/" //<string>ENV_.config?.url_orchest;
    this.redirect = <string>ENV_.config?.redirect;

    if (this.redirect === "" )
        redirect_ = window.location.origin
    else
        redirect_ = this.redirect + "/orchest/v1/login/"

    redirect_ = window.location.origin + "/orchest/v1/login/" //window.location.origin + "/orchest/v1/login/" //

//    redirect_ = "http://127.0.0.1:8000/orchest/v1/login/" //window.location.origin + "/orchest/v1/login/" //


    this.authCodeFlowConfig = {
        issuer: environment.issuer,   
        redirectUri: redirect_, 
        postLogoutRedirectUri: window.location.origin,
        clientId: environment.clientId, 
        responseType: environment.responseType, 
        scope:  environment.scope, 
        dummyClientSecret: environment.client_secret,
        showDebugInformation: true,
    };

      if(oauthService)

      this.oauthService.oidc = true;
      this.oauthService.configure(this.authCodeFlowConfig);
      this.oauthService.setStorage(sessionStorage);

      this.oauthService.loadDiscoveryDocument()
      .then(()=>{
        this.oauthService.tryLogin();        
      })

        this.data_request.id = String(localStorage.getItem('id_'))


      this.sub_1 =this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .pipe(filter(e => ['token_received', 'user_profile_loaded'].includes(e.type)))
      .subscribe((_) => {

          const claims: any = this.oauthService.getIdentityClaims();

          this.data_request.id = String(localStorage.getItem('id_'))

          this.username = claims['name']

          this.setMessageTitle()

          this.sub_1.unsubscribe();

          this.fetchOrchest(claims);
          
          this.oauthService.loadUserProfile();

      });


      if(localStorage.getItem("redirect") === null)
         localStorage.setItem('redirect', "0");

    }

    ngOnInit(){

         this.getURL()  
    }

    getURL(){
        let params = new URLSearchParams(window.location.search);

        let id = String(params.get('id'))

        if(localStorage.getItem("redirect") === "0") {

            localStorage.setItem('redirect', "1");
            localStorage.setItem('id_', id);

             this.data_request.id = String(params.get('id_'))

             this.login()

             return id
        }
        else
            //localStorage.removeItem("redirect")
            return ""
    }

    login() {
        this.oauthService.initCodeFlow()
    }

    async fetchOrchest(payload: object){

        this.data_request.id = String(localStorage.getItem('id_'))
        this.data_request.payload = this.oauthService.getIdentityClaims()
      
        const url = this.url_orchest + "orchest/v1/broadcast/logado/"

        this.sub_2 = this.Orchest_service_.postOrchest(this.data_request, url)
        .subscribe(
              data => {
                this.sub_2.unsubscribe();
                this.logado = true;
                this.btnEvent("ok")
               // window.close()
            },
              error => {
              //  console.log("Orchest fora de serviço...")
            }
        )}

        setMessageTitle() {

            if (this.oauthService.getIdentityClaims() != {}) { 
                const claims_: any = this.oauthService.getIdentityClaims();
    
                if (claims_.gender=="M")
                    this.title = claims_.name + " está logado no loginSP"
                else
                    this.title =  claims_.name + " está logada no loginSP"
    
            } else 
            {
                this.title = ""
            }
            
        }

        btnEvent(msg:string){
            localStorage.clear();

            setTimeout(function(){
                window.open('','_self')!.close();;
              }, 500);
         }

}
