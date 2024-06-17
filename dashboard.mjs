import {renderHeader} from "./Header.mjs"
import {renderFooter} from "./Footer.mjs"
import  {database,storage,auth} from "./firebase.mjs"
import {getPropertyListbyuser,fetchBookingsForProperties} from "./api.mjs"
import { PropertyList } from "./PropertyList.mjs"
import {renderbookings} from "./showr.mjs"
renderHeader()
renderFooter()
const pr=ReactDOM.createRoot(propertyList)
const datalist=await getPropertyListbyuser()
const newp =PropertyList( {datalist})
const payedbooking=await fetchBookingsForProperties(datalist)
renderbookings(payedbooking,datalist)

pr.render(newp)
  const modal = document.getElementById('propertyModal');
  const btn = document.getElementById('addPropertyBtnch');
  const closeBtn = document.getElementsByClassName('close')[0];
  
  // When the user clicks the button, open the modal
  btn.addEventListener('click', () => {
      modal.style.display = 'block';
  });
  
  // When the user clicks on <span> (x), close the modal
  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });
  
  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', (event) => {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  });

  document.getElementById('addPropertyBtn').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const images = document.getElementById('images').files;
    const commun = document.getElementById('commun').value;
    const description = document.getElementById('description').value;

    // Validate input fields
    if (!title || !price || !latitude || !longitude || images.length === 0) {
        document.getElementById('errorMessage').textContent = 'Please fill out all fields and upload at least one image.';
        return;
    }

    const property = {
        title: title,
        price: price,
        location: {
            latitude: latitude,
            longitude: longitude
        },
        commun: commun,
        description: description,
        ownerId: firebase.auth().currentUser.uid,
        images: []
    };

    // Upload images to Firebase Storage
    Promise.all(Array.from(images).map(imageFile => {
        const imageRef = storage.ref().child('images/' + imageFile.name);
        return imageRef.put(imageFile).then(snapshot => {
            return snapshot.ref.getDownloadURL().then(downloadURL => {
                property.images.push(downloadURL);
            });
        });
    })).then(() => {
        property.image=property.images[0]
        const specialPrices = [];
         const specialPriceEntries = document.querySelectorAll('.special-price-entry');
        specialPriceEntries.forEach(entry => {
             const startDate = new Date(entry.querySelector('#startDate').value);
            const endDate = new Date(entry.querySelector('#endDate').value);
            const price = parseFloat(entry.querySelector('#specialPrice').value);

    // Validate dates and prices here...

            specialPrices.push({ startDate, endDate, price });
         });

  // Add special prices to the property object
        property.specialPrices = specialPrices;
        // Store property data in the Realtime Database
        return database.ref('properties').push(property);
    }).then(() => {
        console.log('Property added successfully');
        // Optionally, redirect to a success page or clear input fields
    }).catch(error => {
        console.error('Error adding property:', error.message);
        document.getElementById('errorMessage').textContent = 'Failed to add property. Please try again later.';
    });
});
document.getElementById('addSpecialPriceBtn').addEventListener('click', () => {
    const specialPricesSection = document.getElementById('specialPricesSection');
    const newEntry = document.querySelector('.special-price-entry').cloneNode(true);
    specialPricesSection.appendChild(newEntry);
  
    // Add event listener to the new "Remove" button
    newEntry.querySelector('.remove-special-price').addEventListener('click', () => {
      newEntry.remove();
    });
  });