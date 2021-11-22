export interface OrchestDataRequest {
    id: string,
    payload: object
  }

  export interface OrchestDataResponse {
    id: string,
    status: string
  }
  
  export interface EnvVariables {
    url_client: string,
    url_orchest : string,
    title: string,
    msg_sem_servico: string,
    canal: string,
    clientId: string,
    responseType: string,
    scope: string,
    client_secret: string,
    issuer: string,
    redirect: string

}