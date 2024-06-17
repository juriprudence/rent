// Initialize Firebase

// Import Firebase configurations and modules
import { firebaseConfig, auth, database } from './firebase.mjs';
import {createHeader} from "./Header.mjs"
import {Footer} from "./Footer.mjs"
// Retrieve property ID from query parameter


const newHeader = createHeader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/newHeader);
// Reference to Firebase Realtime Database
const newFooter=Footer()
const foot=ReactDOM.createRoot(document.getElementById('foot'));
foot.render(newFooter)
// Function to handle registration
function handleRegistration(email, password, fullName, phoneNumber, address,role) {
  // Validate phone number using regex
  
console.log("execute creat user")
  // Perform registration with Firebase Authentication
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      // Save additional user details to Firebase Realtime Database
      saveUserInfo(user.uid, fullName, phoneNumber, address,role);
      // Redirect user to login page
      window.location.href = 'login.html';
    })
    .catch((error) => {
      // Handle errors from Firebase Authentication
      const errorMessage = error.message;
      console.log( document.getElementById('errorMessage'))
      document.getElementById('errorMessage').textContent = errorMessage;
    });
}


// Example usage: Replace with your actual user data



// Function to save user info to Firebase Realtime Database
function saveUserInfo(userId, fullName, phoneNumber, address,role) {


  const usersRef = database.ref('users/' + userId);
  usersRef.set({
    fullName: fullName,
    phoneNumber: phoneNumber,
    address: address,
    role:role,
  })
  .then(() => {
    console.log('User info saved successfully');
  })
  .catch((error) => {
    console.error('Error saving user info:', error.message);
  });
}

// Event listener for registration form submission
document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form field values
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const fullName = document.getElementById('fullName').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const address = document.getElementById('address').value.trim();
  //const role = document.getElementById('role').value;
  //console.log(role)
  // Clear any previous error messages
  document.getElementById('errorMessage').textContent = '';
  document.querySelectorAll('.invalid-feedback').forEach(errorField => errorField.textContent = '');

  // Check if all fields are filled
  if (email === '' || password === '' || fullName === '' || phoneNumber === '' || address === '') {
    document.getElementById('errorMessage').textContent = 'Please fill in all required fields.';
    return;
  }

  // Handle registration
  handleRegistration(email, password, fullName, phoneNumber, address,"property_owner");
});

// Add validation feedback classes dynamically
document.getElementById('registerForm').addEventListener('invalid', (event) => {
  event.preventDefault(); // Prevent form submission again if invalid
  const invalidFields = event.target.querySelectorAll(':invalid');
  invalidFields.forEach(field => {
    const errorId = `${field.id}Error`;
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = field.validationMessage; // Set the error message
  });
});
