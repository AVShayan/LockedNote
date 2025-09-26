const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const signupMsg = document.getElementById("signup-message");
const loginMsg = document.getElementById("login-message");

loginForm.style.display = "none";  // Ininitially we show only the signup form

document.getElementById("show-login").addEventListener("click",(e)=>{
    e.preventDefault();
    signupForm.style.display = "none";   // Does not show Signup Form
    loginForm.style.display = "block";  // Shows Login Form as a block
})
document.getElementById("toggle-method").addEventListener("click",() => {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
})
document.getElementById("toggle").addEventListener("click",()=>{
    signupForm.style.display = "block";
    loginForm.style.display = "none";
})
signupForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = {
        username: signupForm.userName.value,
        password: signupForm.password.value,
    };
    try{
        const res = await fetch("http://localhost:3500/signup",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if(res.ok){
            signupMsg.style.color= "lightgreen";
            signupMsg.textContent = "User Registered!";
        }else{
            signupForm.textContent="Signup Failed!"
        }
    }catch{
       signupMsg.textContent = "Network Error";
    }
})
loginForm.addEventListener("submit",async(e) => {
    e.preventDefault();
    const data = {
        username: loginForm.userName.value,
        password: loginForm.password.value,
    };
    try{
        const res = await fetch("http://localhost:3500/login",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data),
            credentials: "include",
        });
        const result = await res.json(res);
        if(res.ok){
            loginMsg.style.color="lightgreen";
            loginMsg.textContent="Login Success";
            window.location.href = "/notes.html"
        }else{
            loginMsg.textContent="Invalid Username/Password";
        }
    }catch{
        loginMsg.textContent= "Network Error!";
    }
})
