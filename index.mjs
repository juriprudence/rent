// Initialize Firebase




import {PropertyList} from "./PropertyList.mjs"
import {getPropertyList} from "./api.mjs"
import {renderHeader} from "./Header.mjs"
import {renderFooter} from "./Footer.mjs"
renderHeader();
renderFooter();
const propertyList = document.getElementById('propertyList');

const pr=ReactDOM.createRoot(propertyList)
//const newpr= PropertyList()
//console.log(newpr)
//pr.render(newpr)
const datalist=await getPropertyList()

const newp =PropertyList( {datalist})
pr.render(newp)
/*
document.getElementById('minPriceRange').addEventListener('input', updateMinPrice);
document.getElementById('maxPriceRange').addEventListener('input', updateMaxPrice);
*/
// Function to update the displayed minimum price value
function updateMinPrice() {
  const minPrice = document.getElementById('minPriceRange').value;
  document.getElementById('minPrice').textContent = minPrice;
  filterProperties();
}

// Function to update the displayed maximum price value
function updateMaxPrice() {
  const maxPrice = document.getElementById('maxPriceRange').value;
  document.getElementById('maxPrice').textContent = maxPrice;
  filterProperties();
}

// Function to filter properties based on price range
function filterProperties() {
  const minPrice = parseInt(document.getElementById('minPriceRange').value);
  const maxPrice = parseInt(document.getElementById('maxPriceRange').value);

  // Perform filtering logic here
  const properties = document.querySelectorAll('.property');

    properties.forEach(property => {
        const priceElement = property.querySelector('.price');
        
        
        const propertyPrice = parseInt(priceElement.textContent);

        if (propertyPrice >= minPrice && propertyPrice <= maxPrice) {
            // Show property if it falls within the price range
            property.style.display = 'block';
        } else {
            // Hide property if it falls outside the price range
            property.style.display = 'none';
        }
    });
  // For example, you could hide/show properties based on their price range
}
  
