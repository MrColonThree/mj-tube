let views = [];
const loadCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  // console.log(data);
  const categories = data.data;
  // console.log(categories);

  categories.forEach((category) => {
    // console.log(category.category)
    const categoryContainer = document.getElementById("category-container");
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button onclick="displayVideos('${category.category_id}')" class="bg-gray-300 px-5 py-3 rounded-lg text-lg font-medium hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};

const displayVideos = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  console.log(data);
  const allCard = data.data;
  console.log(allCard);
  const videoCards = document.getElementById("video-cards");
  const drawingImage = document.getElementById("drawing-image");
  allCard.length === 0
    ? drawingImage.classList.remove("hidden")
    : drawingImage.classList.add("hidden");
  videoCards.innerHTML = "";
  allCard.forEach((eachCard) => {
    // converting seconds into hrs and mins
    const postedDate = parseInt(eachCard.others?.posted_date);
    const hours = Math.floor(postedDate / 3600);
    const minutes = Math.floor(hours / 60);
    const videoCard = document.createElement("div");
    videoCard.classList = "p-5 rounded-lg shadow-lg border-2";
    videoCard.innerHTML = `
    <div class="relative"><img class="w-full h-48 rounded-lg " src="${
      eachCard.thumbnail
    }"><div id="publish-time" class="absolute bottom-2 right-2 bg-black/50 text-gray-200 p-2 rounded-lg">${hours}hrs ${minutes}min ago</div></div>
    <h2 class="text-2xl font-semibold my-5">${eachCard.title}</h2>
    <div class="flex gap-4 items-center">
      <img class="w-16 h-16 rounded-full" src="${
        eachCard.authors[0].profile_picture
      }">
     <div>
     <div class="flex gap-2">
     <p class="text-lg text-gray-500 ">${eachCard.authors[0].profile_name} </p> 
     <img class="" src="${
       eachCard.authors[0].verified ? "images/verify.png" : ""
     }">
     </div>
     <p> ${eachCard.others.views} views</p>
     </div>
    </div>
    `;

    videoCards.appendChild(videoCard);
    views.push(eachCard.others.views);
  });
};

const handleClickSortByView = () => {
  const sortedViews = [...views];
  const sortedViewsNumber = sortedViews.map((n) => n.replace("K", ""));
  sortedViewsNumber.sort((a, b) => {
    return b - a;
  });
  displayVideos(sortedViewsNumber);
};
displayVideos("1000");
loadCategory();
