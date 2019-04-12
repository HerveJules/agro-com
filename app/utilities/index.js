const route = require ('express').Router();


let _registerRoutes = (routes,method) => {
    for (const key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
            _registerRoutes(routes[key],key);
        }else{
            if (method === 'get') {
                route.get(key,routes[key]);
            } else if (method === 'post') {
                route.post(key,routes[key])
            } else if (method === 'put') {
                route.put(key,routes[key])
            }else {
                route.use(routes[key]);
            }
        }
    }
}
let routeBr = routers => {
    _registerRoutes(routers);
return route;
}
module.exports ={
    routeBr
}
