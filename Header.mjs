import { auth } from './firebase.mjs';
const { useState, useEffect } = React;
function handleLogin() {
  // Implement your login logic using Firebase auth methods (e.g., signInWithEmailAndPassword)
  window.location.href = 'login.html'; // Placeholder for actual login functionality
}

function handleRegistr() {
  window.location.href = 'registration.html';
}

function handleLogout() {
  auth.signOut().then(() => {
    // Sign-out successful, redirect user or handle as needed
    console.log('User signed out');
    // Redirect to the home page after logout
    window.location.href = 'index.html';
  }).catch(error => {
    // An error happened.
    console.error('Logout failed:', error.message);
  });
}
export function renderHeader()
{
  const newHeader = createHeader();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render( /*#__PURE__*/newHeader);
  hundelshange()
}
function hundelshange()
{
  auth.onAuthStateChanged(user => {
    // Get references to the buttons 
    const loginButton = document.getElementById('loginBtn');
    const registerButton = document.getElementById('registerBtn');
    const logoutButton = document.getElementById('logoutBtn');

    if (user) {
      // User is logged in, show logout button, hide login/register
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
      logoutButton.style.display = 'block';
    } else {
      // User is not logged in, show login/register buttons, hide logout
      loginButton.style.display = 'block';
      registerButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }
  });

}

export function createHeader() {
  const isLoggedIn = auth.currentUser; // Check if user is logged in


  const loginButton = /*#__PURE__*/React.createElement("button", {
    id: "loginBtn",
    className: "btn btn-primary",
    style: {
      display: isLoggedIn ? 'none' : 'block' // Show login button if user is not logged in
    },
    onClick: handleLogin
  }, "\u062F\u062E\u0648\u0644");

  const registerButton = /*#__PURE__*/React.createElement("button", {
    id: "registerBtn",
    className: "btn btn-secondary",
    style: {
      display: isLoggedIn ? 'none' : 'block' // Show register button if user is not logged in
    },
    onClick: handleRegistr
  }, "\u062A\u0633\u062C\u064A\u0644");

  const logoutButton = /*#__PURE__*/React.createElement("button", {
    id: "logoutBtn",
    className: "btn btn-danger",
    style: {
      display: isLoggedIn ? 'block' : 'none' // Show logout button if user is logged in
    },
    onClick: handleLogout
  }, "\u062E\u0631\u0648\u062C");

  const header = /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-lg navbar-dark bg-dark"
  }, /*#__PURE__*/React.createElement("a", {
    className: "navbar-brand",
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: "image/icon.jpg",
    alt: "Icon",
    style: {
      width: 30,
      height: 30
    },
    className: "d-inline-block align-top mr-2"
  }), "R\xE9sidence Ramdane"), /*#__PURE__*/React.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    "data-toggle": "collapse",
    "data-target": "#navbarSupportedContent",
    "aria-controls": "navbarSupportedContent",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "collapse navbar-collapse",
    id: "navbarSupportedContent"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav mr-auto" // 'Home' and 'About' links
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "index.html"
  }, "Home")), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "about.html"
  }, "About")), /*#__PURE__*/React.createElement("div", {
    className: "btn-group", // 'btn-group' containing login, register, and logout buttons
    role: "group",
    "aria-label": "Authentication buttons"
  }, loginButton, registerButton, logoutButton))));

  return header;
}

