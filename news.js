const loadNewsCatagory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaycatagory(data.data.news_category));
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
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (news) => {
  console.log(news);
  news.forEach((data) => {
    console.log(data);
  });
};

loadNewsCatagory();
