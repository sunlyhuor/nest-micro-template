// Get the query string from the URL
const queryString = window.location.search;

// Create a URLSearchParams object with the query string
const params = new URLSearchParams(queryString);

const signupForm = document.getElementById("signupForm")
const expiredElement = document.getElementById("expiredElement")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const submitButton = document.getElementById("submitButton")
const loader = document.getElementById("loader")
const message = document.getElementById("message")

//Backend Url

if( !params.get("token") ){
    signupForm.style.display = "none";
}else{
    expiredElement.style.display = "none"
}
const url = "http://localhost:3000/api/v1/user/reset-password?token=" + params.get("token")


submitButton.addEventListener("click" , async (e)=>{
    e.preventDefault()
    loader.style.display = "inline"
    submitButton.style.display = "none"

    if( password.value != confirmPassword.value ){
        message.innerText = "Password and Confirm password must be the same"
    }else if( password.value.length < 8 ){
        message.innerText = "Password must be more than 8characters"
    }else if( confirmPassword.value.length < 8 ){
        message.innerText = "ConfirmPassword must be more than 8characters"
    }
    else{
        try{
            console.log( url )
            const response = await fetch(url, {
                method:"POST",
                body: JSON.stringify({
                    password: password.value,
                    confirmPassword: confirmPassword.value
                }),
                headers:{
                    "Authorization": "Bearer " + params.get("token"),
                    "authorization": "Bearer " + params.get("token"),
                    "Content-Type": "application/json"
                }
            })
            const e = await response.json()
            if( !response.ok ){
                if( Array.isArray(e.errors) ){
                    let mess = "";
                    e.errors.map( data => mess += data + "\n" )
                    message.innerText = mess;
                }else{
                    console.log(e)
                    message.innerHTML = e.message
                }
            }else{
                message.innerText = e.message
            }
            message.style.display = "inline"

        }
        finally{
            loader.style.display = "none"
            submitButton.style.display = "block"
        }
    }
    message.style.display = "inline"
    loader.style.display = "none"
    submitButton.style.display = "block"

} )
