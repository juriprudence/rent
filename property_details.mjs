// Initialize Firebase
// Firebase configuration code goes here
import { firebaseConfig, auth, database } from './firebase.mjs';


import {getPropertyDetails,bookProperty,checkAvailability} from "./api.mjs"
// Retrieve property ID from query parameter
import {renderHeader} from "./Header.mjs"
import {renderFooter} from "./Footer.mjs"
renderHeader();
renderFooter();


// Reference to Firebase Realtime Database

const queryParams = new URLSearchParams(window.location.search);
const propertyId = queryParams.get('id');


// Reference to elements in the HTML
const propertyImagesContainer = document.getElementById('propertyImages');
const propertyTitleElement = document.getElementById('propertyTitle');
const propertyDescriptionElement = document.getElementById('propertyDescription');

const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const priceDisplay = document.getElementById('priceDisplay');
// Fetch property details from Firebase based on property ID

const property =  await getPropertyDetails(propertyId);
        // Display property title and description
propertyTitleElement.textContent = property.title;
propertyDescriptionElement.textContent = property.description;
        // Populate property images in the carousel
property.images.forEach((image, index) => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('carousel-item');
        if (index === 0) {
            imageElement.classList.add('active');
        }
        const imageSizeStyle = "width: 400px; height: 400px;";
        imageElement.innerHTML = `
            <img src="${image}" class="d-block w-100"  style="${imageSizeStyle}" alt="Property Image">
            `;
            propertyImagesContainer.appendChild(imageElement);

        });

    
// Initialize Google Map
function initMap(location) {
    // Check if property location exists
    if (location && location.latitude && location.longitude) {
        // Initialize Leaflet map
        var map = L.map('map').setView([location.latitude, location.longitude], 13); // Set property location and zoom level

        // Add tile layer (OSM)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker for the property location
        L.marker([location.latitude, location.longitude]).addTo(map)
            .bindPopup('Property Location')
            .openPopup();
    }
}

firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is logged in, enable book button
                bookButton.style.display = 'block';
            } else {
                // User is not logged in, hide book button
                bookButton.style.display = 'block';
            }
        });

  // Redirect to login page when login button is clicked
 
 // Handle book button click
 async function getbook()  {
  const user = firebase.auth().currentUser;
if(!user)
{
  window.location.href="registration.html"
}
const userId=user.uid
const startDate = document.getElementById('startDate').value;
const endDate = document.getElementById('endDate').value;
  const numDays=calculateNumberOfDays(startDate, endDate)
  var amountt;
  let totalAmount = 0;
 /* const isAvailable = await checkAvailability(propertyId, startDate, endDate);
 if(isAvailable)
 {*/
   let currentDay = new Date(startDate);

// Loop through each day of the booking
  for (let i = 0; i < numDays; i++) {
    let pricePerDay = parseInt(property.price); // Default to regular price

// Check for special prices on the current day
    property.specialPrices?.forEach(specialPrice => {
  if (currentDay >= specialPrice.startDate && currentDay <= specialPrice.endDate) {
   pricePerDay = parseInt(specialPrice.price);
    }
  });

totalAmount += pricePerDay;
currentDay.setDate(currentDay.getDate() + 1); // Move to the next day
}
   
  amountt=totalAmount;
  console.log(amountt);
 /* fetch('https://try-flixily.glitch.me/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Send only the amount in the request body
      body: JSON.stringify({
        amount: amountt
      })
    })
    .then(response => {
      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        return response.json();
      } else {
        // Handle error response
        throw new Error('Error creating checkout');
      }
    })
    .then(data => {
      // Extract the checkout URL from the response data
      const checkoutUrl = data.checkoutUrl;
      const res = bookProperty(propertyId, userId,startDate,endDate,data.id);
      // Redirect the user to the checkout URL
      window.location.href = checkoutUrl;
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
      // Display error message to the user or perform other error handling
    });

  }
  else
  {
    $('#unavailableModal').modal('show'); 

    console.log("sory this prooperty is not avayable")
  }
*/


  const res = bookProperty(propertyId, userId,startDate,endDate,0);
  $('#bookingSuccessModal').modal('show');


}
document.getElementById('bookButton').addEventListener('click',getbook)

function calculateNumberOfDays(startDate, endDate) {
  // Parse the date strings into Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const diffInMs = end - start;

  // Convert milliseconds to days and round down to avoid partial days
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return days;
}
function calculatePrice() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    priceDisplay.textContent = ''; // Clear price if dates are invalid
    return;
  }

  let totalPrice = 0;
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const numDays = Math.round(Math.abs((endDate - startDate) / oneDay));

  if (property) {
    const basePrice = property.price || 0; // Default to 0 if price is missing

    // Check if there are special prices
    if (property.specialPrices) {
      for (const specialPriceKey in property.specialPrices) {
        const specialPrice = property.specialPrices[specialPriceKey];
        const specialStartDate = new Date(specialPrice.startDate);
        const specialEndDate = new Date(specialPrice.endDate);

        // Check if the booking overlaps with a special price period
        if (startDate <= specialEndDate && endDate >= specialStartDate) {
          const overlapDays = Math.round(Math.min(
            (endDate - specialStartDate) / oneDay,
            (specialEndDate - startDate) / oneDay,
            numDays // Total number of days booked
          ));
          totalPrice += overlapDays * specialPrice.price;
          // Update the remaining days to calculate
          numDays -= overlapDays; 
        }
      }
    }
    // Add the base price for any remaining days
    totalPrice += numDays * basePrice; 
  }

  priceDisplay.textContent = `السعر الكلي: dzd ${totalPrice}`;
}
startDateInput.addEventListener('change', calculatePrice);
endDateInput.addEventListener('change', calculatePrice);
if(property.location)
initMap(property.location);