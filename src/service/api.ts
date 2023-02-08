import { baseUrl } from './prefix';
import { post, postFile } from "@/utils/request";

export const login = (params: LoginParams) => post(`${baseUrl}/user/login`, params);

export const registry = (params: LoginParams) => post(`${baseUrl}/user/registry`, params);

export const getFriends = (params: any) => post(`${baseUrl}/user/searchfriends`, params);

export const uploadFiles = (params: any[]) => postFile(`${baseUrl}/attach/upload`, params);