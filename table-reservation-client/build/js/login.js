let login = document.getElementById("login");

login.addEventListener('click', () => {
    let emailId = document.getElementById("emailId").value;
    let password = document.getElementById("password").value;
    let errmsg = document.getElementById("err-msg");
    postData('http://localhost:8081/login', {
            emailId,
            password
        })
        .then(data =>{
             if(data.message!== null){
                errmsg.innerText = data.message;
             }else{
                localStorage.setItem("user",emailId)
             }
        }) // JSON from `response.json()` call
        .catch(error => console.error(error))
})


function postData(url, data) {
    return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
            "headers": {
                "content-type": "application/json"
            },
        })
        .then(response => response.json()) 
        .then(data =>{
            if(data.loginSuccessful){
                window.location = "http://localhost:8085/searchcity.html"
            }
        })
}