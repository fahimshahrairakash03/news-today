const loadNewsCatagory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaycatagory(data.data.news_category))
    .catch((error) => console.log(error));
};

const displaycatagory = (datas) => {
  const catagoryField = document.getElementById("news-catagory");
  datas.forEach((data) => {
    console.log(data);
    const catagoryName = document.createElement("div");
    catagoryName.innerHTML = `
    <h6 onclick = "catagoryNews('${data.category_id}')" >${data.category_name}</h6>
    `;
    catagoryField.appendChild(catagoryName);
  });
};

const catagoryNews = (id) => {
  toggleSpinner(true);
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
};

const displayNews = (news) => {
  // console.log(news);
  const newsNumber = document.getElementById("news-number");
  if (news.length > 0) {
    newsNumber.innerText = ` ${news.length} News found `;
  } else {
    newsNumber.innerText = ` No News found `;
  }
  const newsField = document.getElementById("news-con");
  newsField.innerHTML = "";
  news.forEach((data) => {
    console.log(data);
    const newsData = document.createElement("div");
    newsData.classList.add("col");
    newsData.innerHTML = `
    <div class="card p-4">
            <img src="${data.thumbnail_url}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${data.title.slice(0, 50)}...</h5>
              <p class="card-text">
                ${data.details.slice(0, 200)} ...
              </p>
              <div class="d-flex align-items-center mb-3">
                <img
                  src= "${data.author.name ? data.author.img : `No Image`}"
                  class="rounded-circle w-25 me-2"
                  alt="..."
                />
                <div>
                  <h6>${data.author.name ? data.author.name : "Anonymous"}</h6>
                  <h6 class="text-muted">${data.author.published_date}</h6>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <div>
                  <i class="fa-solid fa-eye text-muted"></i>
                  <p class="d-inline ms-2">${data.total_view}</p>
                </div>
                <div>
                  <i class="fa-solid fa-star-half-stroke"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
              </div>
              <button class ="btn btn-primary mt-2" onclick= "newsDetails('${
                data._id
              }')"  data-bs-toggle="modal"
              data-bs-target="#newsModal" > Details </button>
            </div>
          </div>
    `;

    newsField.appendChild(newsData);
  });
  toggleSpinner(false);
};

const newsDetails = async (data) => {
  const url = `https://openapi.programming-hero.com/api/news/${data}`;
  try {
    const res = await fetch(url);
    const news = await res.json();
    displayModal(news.data);
  } catch (error) {
    console.log(error);
  }
};

const displayModal = (newsmodals) => {
  newsmodals.forEach((modal) => {
    const modalTitle = document.getElementById("newsModalLabel");
    modalTitle.innerText = modal.title;
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
    <h5> Author: ${
      modal.author.name ? modal.author.name : "No Author Found"
    }</h5>
    <h5> Publish date: ${
      modal.author.published_date
        ? modal.author.published_date
        : "No date found"
    }</h5>
    <h6> View: ${modal.total_view ? modal.total_view : "No viewers"}
    `;
  });
};

const toggleSpinner = (isloading) => {
  const loaderSection = document.getElementById("loader");
  if (isloading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

loadNewsCatagory();
