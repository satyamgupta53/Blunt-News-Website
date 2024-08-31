const API_KEY = CONFIG.API_KEY;
const url = "https://newsapi.org/v2/everything?q=";

function reload() {
    window.location.reload();
}

window.addEventListener('load', () => fetchNews('India & English Language'));

async function fetchNews(searchArgument) {
    const res = await fetch(`${url}${searchArgument}&apiKey=${API_KEY}`);
    const data =  await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(searchArgument) {
    fetchNews(searchArgument);
    const navItem = document.getElementById(searchArgument);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const newsInput = document.getElementById('news-input');

searchButton.addEventListener('click', () => {
    const query = newsInput.value;
    if(!query) return;
    fetchNews(query);
    newsInput.placeholder = `Previously Search  ${query}`;
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})