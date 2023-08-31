function clickBlog() {
  window.location.href = "blog.html";
}

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
  videoCards.innerHTML = "";

  allCard.forEach((eachCard) => {
   
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <img src="${eachCard.thumbnail
    }">
    `;
    videoCards.appendChild(videoCard)
  });
};
displayVideos();

loadCategory();
