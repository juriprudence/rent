export  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      className: "bg-dark text-light py-3 d-flex flex-column align-items-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "mb-3"
    }, "\xA9 ", new Date().getFullYear(), " R\xE9sidence Ramdane"), /*#__PURE__*/React.createElement("ul", {
      className: "list-unstyled d-flex justify-content-center"
    }, /*#__PURE__*/React.createElement("li", {
      className: "mx-3"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/index.html",
      className: "text-light"
    }, "Home")), /*#__PURE__*/React.createElement("li", {
      className: "mx-3"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/about.html",
      className: "text-light"
    }, "About Us")), /*#__PURE__*/React.createElement("li", {
      className: "mx-3"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/contact.html",
      className: "text-light"
    }, "Contact"))));
  }
  export function renderFooter()
  {
    const newFooter=Footer()
const foot=ReactDOM.createRoot(document.getElementById('foot'));
foot.render(newFooter)
  }
