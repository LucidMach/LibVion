/**
 * include thse scrips in header of your app, it should execute before this `login.js` script.`
    <script defer src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
 */



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
firebase.analytics();









/*   LOGIN   */


//  login button from DOM (form)
let loginBtn = document.querySelectorAll('.loginbtn');

//  can do submit event, your wish!
btn.addEventListener('click', e => {
    e.preventDefault();
    
    //  fetch email & pasword from it;s input firld
    const email = document.querySelector('#email');
    const password = document.querySelector('#passwd');

    // As httpOnly cookies are to be used, do not persist any state client side.
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
            //  do some redirection or ther actions
            window.location.assign("/");
        })
        .catch(err => {
            //  if user credentials are incorrect then handle accordingly!
            //  message will be sent back from firebase auth server here, 
            //  just add a proper message to DOM. 
            console.log(err);
        });
});










/*  SIGNUP  */


//  signup button from DOM (form)
let signupbtn = document.querySelectorAll('.signupbtn');

//  can do submit event, your wish!
btn.addEventListener('click', e => {
    e.preventDefault();
    
    //  fetch email & pasword from it;s input firld
    const email = document.querySelector('#email');
    const password = document.querySelector('#passwd');

    // As httpOnly cookies are to be used, do not persist any state client side.
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)    //  create new user using email & password into firebase auth server.
        .then(({ user }) => {       //  if email is unregistered, then account will be creatred & user will be logged in too!
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









/*   LOGOUT   */

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