import {setRouteEmitter} from "~/utils/route-listener";

export default defineNuxtRouteMiddleware(async (to, from) => {
    setRouteEmitter(to);
})