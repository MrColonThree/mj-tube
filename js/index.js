// Default view
let isSorted = false;
let isDescending = false;
// Default category
let categoryId = "1000";
// declare global variable
let allCardsData = [];

// Load categories from API using fetch
const loadCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  const categories = data.data;
  // to get each Category
  categories.forEach((category) => {
    const categoryContainer = document.getElementById("category-container");
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button id="${category.category_id}" onclick="selectedCategory('${category.category_id}')" class="all-buttons bg-gray-300 px-5 py-3 rounded-lg text-lg font-medium hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};

// after clicking the other category , to get default views.
const selectedCategory = (activeCategoryId) => {
  // to get all category buttons
  const allButtons = document.getElementsByClassName("all-buttons");
  for (const button of allButtons) {
    button.style.backgroundColor = "";
    button.style.color = "";
  }
  // set background color red and text color white to active button
  const activeButton = document.getElementById(activeCategoryId);
  activeButton.style.backgroundColor = "#FF1F3D";
  activeButton.style.color = "white";
  isSorted = false;
  isDescending = false;
  categoryId = activeCategoryId;
  displayAllCards();
};
// Load  all videos by categories from API
const displayAllCards = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  allCardsData = data.data;
  const videoCards = document.getElementById("video-cards");
  videoCards.innerHTML = "";
  const drawingImage = document.getElementById("drawing-image");
  // calculate views from each card to sort it which is depending on allcardsData length
  if (isSorted && allCardsData.length > 0) {
    allCardsData.sort((first, second) => {
      const small = parseInt(first.others.views.replace("K", "")) * 1000;
      const large = parseInt(second.others.views.replace("K", "")) * 1000;
      return isDescending ? large - small : small - large;
    });
  }
  // Condition for empty category
  allCardsData.length === 0
    ? drawingImage.classList.remove("hidden")
    : drawingImage.classList.add("hidden");
  // To get each video card from a specific category
  allCardsData.forEach((eachCard) => {
    // Converting seconds to hrs and min
    const postedDate = parseInt(eachCard.others?.posted_date);
    const hours = Math.floor(postedDate / 3600);
    const minutes = Math.floor((postedDate % 3600) / 60);
    // Create a div to append here each video card data
    const videoCard = document.createElement("div");
    videoCard.classList = "rounded-lg my-2";
    videoCard.innerHTML = `
        <div class="relative"><img class="w-full h-52 rounded-lg " src="${
          eachCard.thumbnail
        }">${
      eachCard.others.posted_date
        ? `<div id="publish-time" class="absolute text-sm bottom-2 right-2 bg-black/70 text-gray-200 p-2 rounded-lg">${hours}hrs ${minutes}min ago</div>`
        : ""
    }</div>
        <div class="flex gap-4 mt-2 ">
          <img class="w-14 h-14 rounded-full mt-2" src="${
            eachCard.authors[0].profile_picture
          }">
          <div>
          <h2 class="text-xl font-semibold ">${eachCard.title}</h2>
            <div class="flex gap-2">
              <p class="text-lg text-gray-500 ">${
                eachCard.authors[0].profile_name
              } </p> 
              <img class="w-7" src="${
                eachCard.authors[0].verified ? "images/verify.png" : ""
              }">
            </div>
            <p>${eachCard.others.views} views</p>
          </div>
        </div>
      `;
    videoCards.appendChild(videoCard);
  });
};
// when click the sort by view button
const handleClickSortByView = () => {
  isSorted = true;
  // When click sort by view button second time then videos will sorted ascending format.
  isDescending = !isDescending;
  displayAllCards();
};

loadCategory();
displayAllCards();
