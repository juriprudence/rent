// Initialize Firebase
import { firebaseConfig, auth, database } from './firebase.mjs';
import {createHeader} from "./Header.mjs"
import {Footer} from "./Footer.mjs"
const newHeader = createHeader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/newHeader);
const newFooter=Footer()
const foot=ReactDOM.createRoot(document.getElementById('foot'));
foot.render(newFooter)

document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            const user = auth.currentUser;
            const usersRef = database.ref('users/' + user.uid);
            usersRef.once('value', snapshot => {
                const userData = snapshot.val();
                if (userData) {
                    const role = userData.role;
                    // Check user's role and redirect accordingly
                    if (role === 'property_owner') {
                        window.location.href = 'dashboard.html'; // Redirect property owners to dashboard
                    } else {
                        // Redirect other users to a different page (e.g., homepage)
                        window.location.href = 'index.html'; // Change 'homepage.html' to the desired URL
                    }
                } else {
                    console.error('User data not found in the database');
                    // Handle the case where user data is not found in the database
                }
            });
             // Redirect to main page
        })
        .catch(error => {
            console.error('Login failed:', error.message);
            // Display error message to the user
            document.getElementById('errorMessage').textContent = error.message;
        });
});
