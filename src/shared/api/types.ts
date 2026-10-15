export interface DefaultRequestParams {
   keys: DefaultURLParams;
   signal?: AbortSignal;
}

export interface DefaultURLParams {
   idInstance: string;
   apiTokenInstance: string;
}
