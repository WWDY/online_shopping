import {CustomerRouteObject} from "./useRoutes";

export let routeWilDidCallBack: Function = (data: CustomerRouteObject) => {data.element};

export function routeWilDid(){
    return routeWilDidCallBack;
}

export function useRouteGuard(routeWilDid: Function){
    routeWilDidCallBack = routeWilDid
}
