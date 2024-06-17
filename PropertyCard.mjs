 export function PropertyCard({
    property
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "property card  col-lg-4 col-md-6 col-sm-12"
    }, /*#__PURE__*/React.createElement("img", {
      src: property.image,
      className: "card-img-top",
      alt: property.title
    }), /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "card-title"
    }, property.title), /*#__PURE__*/React.createElement("p", {
      className: "card-text price"
    }, property.price), /*#__PURE__*/React.createElement("p", {
      className: "card-text"
    }, property.commun) ,/*#__PURE__*/React.createElement("p", {
      className: "card-text"
    }, property.description.slice(0, 100)), /*#__PURE__*/React.createElement("a", {
      href: `property_details.html?id=${property.id}`,
      className: "btn btn-primary"
    }, "Details")));
  }