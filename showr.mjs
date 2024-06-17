
// Function to render booking details for each property
export function renderBookingDetails(bookingsByProperty,datalist) {

   var  names={}
    datalist.map((property)=>{
    console.log(property.title)
        names[property.id]=property.title
    }  
)
    
return Object.entries(bookingsByProperty).map(([propertyId, bookings]) => /*#__PURE__*/React.createElement("div", {
    key: propertyId,
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-3"
  }, "\u0627\u0644\u0645\u0644\u0643\u064A\u0629: ", names[propertyId]), /*#__PURE__*/React.createElement("ul", {
    className: "list-group"
  }, bookings.map(booking => /*#__PURE__*/React.createElement("li", {
    key: booking.id,
    className: "list-group-item"
  }, /*#__PURE__*/React.createElement("p", null, "\u0631\u0642\u0645 \u0627\u0644\u062D\u062C\u0632: ", booking.id), /*#__PURE__*/React.createElement("p", null, "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0623\u062C\u0631: ", booking.fullName), /*#__PURE__*/React.createElement("p", null, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641: ", booking.phoneNumber), /*#__PURE__*/React.createElement("p", null, "\u064A\u0628\u062F\u0623: ", booking.startDate), /*#__PURE__*/React.createElement("p", null, "\u064A\u0646\u062A\u0647\u064A: ", booking.endDate), /*#__PURE__*/React.createElement("p", null, "\u062A\u0645 \u0627\u0644\u062F\u0641\u0639: ", booking.payed ? 'نعم' : 'لا'))))));
}
  export function renderbookings(bookingsByProperty,datalist)
{
  const newHeader = renderBookingDetails(bookingsByProperty,datalist);
  console.log(newHeader);
  const root = ReactDOM.createRoot(document.getElementById('bookinglist'));
  root.render( /*#__PURE__*/newHeader);
}
  // Example usage

