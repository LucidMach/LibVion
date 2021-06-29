##  /session

these are endpoints for login, signup and logout!



### Frontend

#### firebase CDN
Include thse scrips in header of your app, it should execute before this `login.js` script.

```html
<script defer src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
```





##### frontend-firebase setup

this should run before any other firebase code (login, signup) in frontend.

```js
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBT4pu9ve8zrqSz0CmxENE3KDp8AbSWEn0",
    authDomain: "libhood-7.firebaseapp.com",
    projectId: "libhood-7",
    storageBucket: "libhood-7.appspot.com",
    messagingSenderId: "887318886355",
    appId: "1:887318886355:web:7822c502c98a7af9366126",
    measurementId: "G-79GE8Z0ZVD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```








####    login flow

1.  submit __login__ form with `email` & `password` fields.
2.  make async req to `firebase auth server` from client side and verify credentials.
3.  recieve idToken (JWT) and send back to our node server.
4.  node server will verify JWT and create sessionCookie for corresponding user

```js
//  login button from DOM (form)
let loginBtn = document.querySelectorAll('.loginbtn');

//  can do submit event, your wish!
btn.addEventListener('click', e => {
    e.preventDefault();
    
    //  fetch email & pasword from it's input firld
    const email = document.querySelector('#email');
    const password = document.querySelector('#passwd');

    // As httpOnly cookies are to be used, do not persist any state client side from firebase.
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)    //  authenticate using email & password fron firebase auth server.
        .then(({ user }) => {       //  if login is successful, then firebasse will return current user's data,
            return user.getIdToken().then((idToken) => {    //  get user's idToken (JWT)
                //  make a reques to backend endpoint, which will verify JWT and send back the sessiion, if JWT is valid.
                return fetch("/session/login", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        // "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                    },
                        body: JSON.stringify({ idToken }),  //  send idToken in the body
                });
            });
        })
        .then(() => {
            //  now user's session is already managed by backend, so we dont need firebase management anymore!
            //  hense JWT will expire now (probably 😅)
            return firebase.auth().signOut();
        })
        .then(() => {
            //  do some redirection or other actions
            window.location.assign("/");
        })
        .catch(err => {
            //  if user credentials are incorrect then handle accordingly!
            //  message will be sent back from firebase auth server here, 
            //  just add a proper message to DOM. 
            console.log(err);
        });
});
```









### signup flow

signup is pretty straight forward!
1.  just grap user details from frontend
2.  make req to backend.
3.  asee if response is `{success: true}` or `{success: false}`.

```js
//  signup button from DOM (form)
let signupbtn = document.querySelectorAll('.signupbtn');

//  can do submit event, your wish!
btn.addEventListener('click', e => {
    e.preventDefault();
    
    //  fetch email, pasword and other fields
    const email = document.querySelector('#email');
    const password = document.querySelector('#passwd');

    fetch("/session/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: {
            email,
            password,
            // etc
        },
    })
    .then(res => res.json())
    .then(data => {
        if(data.success == true) {
            //  greet or something!
        }
        else {
            //  get the reason why signup failed, and show message acc to it!
            console.log(data.error);
        }
    })
    

});
```








### logout flow

just send a logout req.

```js
document.querySelector('#logout').onclick = e => {
    e.preventDefault();
    console.log('logout hit');
    // send req to server to eat cookie
    fetch('/session/logout')
        .then(_ => {
            //  perform action after logging out!
            window.location.replace("/welcome");
        })
        .catch(err => {
            //  catch the error, show to UI etc...
            console.log(err);
        });
}
```


##  side-note

>   you might be thinking why login is little complicated in admin SDK. so here's why:

There is no way to log a user in with the Admin SDK. The Admin SDK runs with administrative privileges and has no need to log in.

You'll want to use one of the Firebase client-side SDKs (e.g. for Android, iOS or web users) to sign your users in to Firebase directly from the client-side code.

If you want your server-side code to know what user is signed in, you send the token from the client to your server and then decode and validate it there.