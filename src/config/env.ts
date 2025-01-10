import dotenv from 'dotenv';

dotenv.config();

export const project = process.env.PROJECT || 'unic';
export const port = process.env.PORT || 6060;
export const env = process.env.NODE_ENV || 'production';
export const isDev = env === 'development';

export const keycloakURL = process.env.KEYCLOAK_URL || 'https://auth.qa.unic.ferlab.bio';
export const keycloakRealm = process.env.KEYCLOAK_REALM || 'UNIC';
export const keycloakClient = process.env.KEYCLOAK_CLIENT || 'unic-client';

export const esHost = process.env.ES_HOST;
export const esUser = process.env.ES_USER;
export const esPass = process.env.ES_PASS;

export const esVariableIndex = process.env.ES_VARIABLE_INDEX || 'variable_centric';
export const esResourceIndex = process.env.ES_RESOURCE_INDEX || 'resource_centric';
export const esTableIndex = process.env.ES_TABLE_INDEX || 'table_centric';

export const usersApiURL = process.env.USERS_API_URL || 'https://users.qa.unic.ferlab.bio';

export const cacheTTL: number = Number.parseInt(process.env.CACHE_TTL_SEC) || 3600;
