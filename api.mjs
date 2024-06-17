import { database,auth } from './firebase.mjs'; 

// Function to fetch property details
export async function getPropertyDetails(propertyId) {
  try {
    const propertyRef = database.ref('properties/' + propertyId);
    const snapshot = await propertyRef.once('value');
    return snapshot.val(); 
  } catch (error) {
    console.error('Error fetching property details:', error.message);
    throw error; // Re-throw to allow handling in the calling component
  }
}
export async function checkAvailability(propertyId, startDate, endDate) {
  try {
    const bookingsRef = database.ref('bookings');
    const snapshot = await bookingsRef
      .orderByChild('propertyId')
      .equalTo(propertyId)
      .once('value');

    const bookings = [];
    snapshot.forEach(childSnapshot => {
      const booking = childSnapshot.val();
      // Only consider paid bookings
      if (booking.payed) {
        bookings.push({
          id: childSnapshot.key,
          ...booking,
        });
      }
    });

    return isPropertyAvailable(bookings, startDate, endDate); 
  } catch (error) {
    console.error('Error checking availability:', error.message);
    throw error;
  }
}
function isPropertyAvailable(bookings, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return !bookings.some(booking => {
    const bookingStart = new Date(booking.startDate);
    const bookingEnd = new Date(booking.endDate);
    return (
      (start >= bookingStart && start <= bookingEnd) ||
      (end >= bookingStart && end <= bookingEnd) ||
      (start <= bookingStart && end >= bookingEnd)
    );
  });
}
export async function fetchBookingsForProperties(propertyList) {
  try {
      const bookingsByProperty = {};

      for (const property of propertyList) {
          const bookings = await fetchBookingsByPropertyId(property.id);
          
      if(bookings.length>0)
      {
        
          const propertyRefb = database.ref('users/' + bookings[0].userId);
          const snapshotb = await propertyRefb.once('value');
        // console.log(snapshotb.val())
         bookings[0]["fullName"]=snapshotb.val().fullName
         bookings[0]["phoneNumber"]=snapshotb.val().phoneNumber
         console.log(bookings)
      }
          bookingsByProperty[property.id] = bookings;
      }

      return bookingsByProperty;
  } catch (error) {
      console.error('Error fetching bookings for properties:', error.message);
      throw error; // Re-throw for handling in the component
  }
}

export async function fetchBookingsByPropertyId(propertyId) {
  try {
      const bookingsRef = database.ref('bookings');
      const snapshot = await bookingsRef.orderByChild('propertyId').equalTo(propertyId).once('value');
      const bookings = [];

      snapshot.forEach(childSnapshot => {
          const booking = childSnapshot.val();
          if(booking.payed)
          bookings.push({
              id: childSnapshot.key,
              ...booking
          });
      });

      return bookings;
  } catch (error) {
      console.error('Error fetching bookings by property ID:', error.message);
      throw error; // Re-throw for handling in the component
  }
}
// Function to book a property
export async function bookProperty(propertyId, userId, startDate, endDate,id) {
  try {
    const bookingsRef = database.ref('bookings');
    const newBookingRef = bookingsRef.push();
    await newBookingRef.set({
      propertyId: propertyId,
      userId: userId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      startDate: startDate,
      endDate: endDate,
      pymentid:id
    });
    console.log('Property booked successfully');
    return true; // Indicate success
  } catch (error) {
    console.error('Booking failed:', error.message);
    throw error; // Re-throw to allow handling in the calling component
  }
}
export async function getPropertyListbyuser() {
  try {
      const propertiesRef = database.ref('properties');
      const snapshot = await propertiesRef.once('value');
      const propertyList = [];
      const uid=firebase.auth().currentUser.uid
console.log(uid)
      snapshot.forEach(childSnapshot => {
          const propertyId = childSnapshot.key;
          const propertyData = childSnapshot.val();
          // Check if the ownerId matches the current user's id
          if (propertyData.ownerId === uid) {
              propertyList.push({
                  id: propertyId,
                  ...propertyData
              });
          }
      });

      return propertyList;
  } catch (error) {
      console.error('Error fetching property list:', error.message);
      throw error; // Re-throw for handling in the component
  }
}
export async function getPropertyList() {
    try {
      const propertiesRef = database.ref('properties');
      const snapshot = await propertiesRef.once('value');
      const propertyList = [];
  
      snapshot.forEach(childSnapshot => {
        const propertyId = childSnapshot.key;
        const propertyData = childSnapshot.val();
        propertyList.push({
          id: propertyId,
          ...propertyData
        });
      });
  
      return propertyList;
    } catch (error) {
      console.error('Error fetching property list:', error.message);
      throw error; // Re-throw for handling in the component
    }
  }