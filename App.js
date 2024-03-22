function loadSavedNews() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("saved-news").style.display = "block";
  document.getElementById("new-news").style.display = "none";
  displaySavedNews();
}

function loadNewNews() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("saved-news").style.display = "none";
  document.getElementById("new-news").style.display = "block";
  const category = document.getElementById("category").value;
  if (category === "all") {
    fetchN();
  }
}

const category = document.getElementById("category");
category.addEventListener("change", () => {
  const value = category.options[category.selectedIndex].value;
  if (value === "all") {
    fetchN();
  } else {
    fetchNews(value);
  }
});

function fetchN() {
  fetch(
    "https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews"
  )
    .then((response) => response.json())
    .then((data) => {
      displayNews(data);
    })
    .catch((error) => console.error("Error fetching news:", error));
}

function fetchNews(category) {
  fetch(
    `https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews?category=${category}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayNews(data);
    })
    .catch((error) => console.error("Error fetching news:", error));
}

function displayNews(news) {
  const newsContainer = document.getElementById("new-news-list");
  newsContainer.innerHTML = "";
  news.forEach((item) => {
    const newsCard = `
          <div class= "news-card " >
              <div class="card">
                  <p>BY <b>${item.author}</b></p>
                  <p >Category: ${item.category}</p>
                  <p>${item.content}<a href="${item.url}" target="_blank">READ MORE</a></p>

              </div>
              
              <button onclick="saveNews('${item.author}','${item.category}','${item.content}','${item.url}', this)" class='heart' >Save</button>
          </div>
      `;

    newsContainer.innerHTML += newsCard;
  });
}

function displaySavedNews() {
  const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
  const savedNewsContainer = document.getElementById("saved-news-list");
  savedNewsContainer.innerHTML = "";

  savedNews.forEach((item, index) => {
    const savedNewsCard = `
          <div class="news-card">
              <div class="card">
                  <p>BY <b>${item.author}</b></p>
                  <p >Category: ${item.category}</p>
                  <p>${item.content}<a href="${item.url}" target="_blank">READ MORE</a></p>
                       <button id = "btn">Saved</button>
                  <button onclick="deleteNews(${index})" class='heart'>Delete</button>
              </div>
          </div>
      `;
    savedNewsContainer.innerHTML += savedNewsCard;
  });
}

function deleteNews(index) {
  const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
  savedNews.splice(index, 1);
  localStorage.setItem("savedNews", JSON.stringify(savedNews));
  displaySavedNews();
}

function saveNews(author, category, content, link, btn) {
  const savedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
  const newsItem = { author, category, content, link };
  console.log(newsItem);
  savedNews.push(newsItem);
  localStorage.setItem("savedNews", JSON.stringify(savedNews));
  // alert('News saved successfully!');

  btn.innerText = "Saved";
  btn.style.backgroundColor = "green";
  btn.style.color = "white";
  btn.style.cursor = "pointer";
}

