const accessKey = "rFgPbNphzyJfLPuLEoIbWrziQ2IochMKhEWAwodxCriEL8jQ2TLyDkam";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
let page = 1;

async function searchImages() {
    const keyword = searchBox.value;
    const url = `https://api.pexels.com/v1/search?query=${keyword}&page=${page}&per_page=12`;

    const response = await fetch(url, {
        headers: {
            Authorization: accessKey
        }
    });

    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = '';
    }

    const results = data.photos;

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.src.medium;
        const imageLink = document.createElement("a");
        imageLink.href = result.url;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
