interface ApiKeys {
   idInstance: string;
   apiTokenInstance: string;
}

export function validateApiKeys({ apiTokenInstance, idInstance }: ApiKeys) {
   const idInstanceError = validateIdInstance(idInstance);
   const apiTokenInstanceError = validateApiTokenInstance(apiTokenInstance);

   return { idInstanceError, apiTokenInstanceError };
}

function validateIdInstance(idInstance: string) {
   if (!idInstance) return "idInstance не должен быть пустым";

   return null;
}

function validateApiTokenInstance(apiTokenInstance: string) {
   if (!apiTokenInstance) return "apiTokenInstance не должен быть пустым";

   return null;
}
