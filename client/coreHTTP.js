class coreHTTP {
    async request(method, route, param = '', body = null) {
        try{
            route = route.concat('/');
            route = route.concat(param);
        
            const options = {
                method
            }
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            if(body) {
                options.body = JSON.stringify(body);
            }
            const response = await fetch(route, options);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json();
            return data;
        }
        catch(err) {
            console.log("Fetch failed:", err);
            return {error: err};
        }
    }
    get(route, param) {
        return this.request("GET", route, param);
    }
    post(route, body) {
        return this.request("POST", route, "", body);
    }
    put(route, param, body) {
        return this.request("PUT", route, param, body);
    }
    delete(route, param) {
        return this.request("DELETE", route, param);
    }
    patch(route, param, body) {
        return this.request("PATCH", route, param, body);
    }
}