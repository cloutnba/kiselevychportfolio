class Request {
    authorization(email, password) {
        return axios({
            url: "https://ajax.test-danit.com/api/v2/cards/login",

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {email: email, password: password}
        });
    }

    send({method = "GET", url, data = null}) {
        return axios({
            method: method,
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
    del(id) {
        return axios({
            method: "DELETE",
            url: `https://ajax.test-danit.com/api/v2/cards/${id}`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}

const request = new Request();
export default request;

