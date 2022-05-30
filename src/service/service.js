
const host = process.env.REACT_APP_SERVICE_HOST;

export default (_token)=>({
    find(resource, filters = {}){
        let length = Object.keys(filters).length;

        let queryString = ``;
        Object.keys(filters).forEach((f, i)=>{
            if(i === 0){
                queryString += "?"
            }
            queryString += `${f}=${filters[f]}`;
            if(i < length-1){
                queryString += "&"
            }
        })
        let url = `${host}/${resource}${queryString}`;
        return fetch(url, {
            method: "GET",
            headers: new Headers({
                'content-type': 'application/json',
                "Authorization": `Bearer ${_token}`
            }),
        })
        .then(res=>res.json())
       
    },
    create(resource, data){
        return fetch(`${host}/${resource}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'content-type': 'application/json',
                "Authorization": `Bearer ${_token}`
            }),
        })
        .then((res)=>{
            return res.json()
        })
       
    },
    update(resource, id, data){
        console.log(resource, id, data)
        return fetch(`${host}/${resource}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: new Headers({
                'content-type': 'application/json',
                "Authorization": `Bearer ${_token}`

            }),
        })
        .then(res=>res.json())
       
    },
    delete(resource, id){
        return fetch(`${host}/${resource}/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'content-type': 'application/json',
                "Authorization": `Bearer ${_token}`

            }),
        })
        .then(res=>res.json())
       
    },
    run(resource, id, data = {}){
        return fetch(`${host}/${resource}/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'content-type': 'application/json',
                "Authorization": `Bearer ${_token}`

            }),
        })
        .then(res=>res.json())
    },
    getUserInfo(){
        return fetch(`${host}/users/me`, {
            method: "GET",
            headers: new Headers({
                'content-type': 'application/json',
                "Authorization": `Bearer ${_token}`

            }),
        })
        .then(res=>res.json())
    }
})
      
export const helpers = {
    isAdmin(user){
        return user[process.env.REACT_APP_AUTH0_USER_CLAIMS_NS].some(role=>role==="Admin")
    }
}