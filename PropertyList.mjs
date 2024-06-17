import { getPropertyList } from './api.mjs'; // Import data fetching function


import {PropertyCard} from "./PropertyCard.mjs"

export  function PropertyList(props) {
  //console.log( props)
    let propertyList = props.datalist; // Declare propertyList outside of component
  let isLoading = false; // Declare isLoading outside of component
console.log(propertyList)
  
  const renderContent = () => {
    const content = /*#__PURE__*/React.createElement("div",{
      className: "row"
    },null, propertyList.map(property => /*#__PURE__*/React.createElement(PropertyCard, {
      key: property.id,
      property: property
    })));
    
    return content;
  };

  // Call fetchData on component mount
   //fetchData();

  // Return the rendered content after data is fetched
  return renderContent();
}
