const container = document.querySelector(".campgroundListContainer");
const loader = document.getElementById("loader");
const campgrounds = campgrounds; // Passed from EJS
let page = 1;
let isLoading = false;

// Function to fetch data from an API
async function fetchData(pageNumber) {
  isLoading = true;

  // await something...

  isLoading = false;
  return data.items; // Assuming API returns an object with an items array
}

// Function to add new items to the DOM
function addItemsToDOM(items) {
  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-card");
    itemDiv.textContent = `Item ${item.id}`; // Adjust as per your data structure
    container.appendChild(itemDiv);
  });
}

// Set up Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      page++;
      fetchData(page).then((items) => {
        if (items.length > 0) {
          addItemsToDOM(items);
        } else {
          // No more items, stop observing
          observer.unobserve(loader);
          loader.textContent = "No more items to load.";
        }
      });
    }
  },
  {
    root: null, // observe against the viewport
    threshold: 0.1, // Trigger when 10% of the loader is visible
  },
);

// Start observing the loader element
observer.observe(loader);

// Initial load
fetchData(page).then(addItemsToDOM);
