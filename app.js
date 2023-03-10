const auth = "aSyom5Q9S1ygbwspennYD4RAwal8LfZk8YIDYwbyDfVRAJoKeLRrss2S"
const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.search-form')
const more = document.querySelector('.more')
let page = 1;
let searchValue;
let fetchLink
let currentSearch;


function updateInput(e) {
    searchValue = e.target.value
}
async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "Get",
        headers: {
            Accept: "application/json",
            Authorization: auth
        }
    })
    const data = await dataFetch.json();
    return data;
}
function generatePicture(data){
    data.photos.forEach(photo => {
        // console.log(photo)
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Dowload</a>
        </div>
        <img src=${photo.src.large}></img>
        
        
        
        `;
        gallery.appendChild(galleryImg)
       });
}

async function curatedPhotos(){
   fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data =  await fetchApi(fetchLink);
   generatePicture(data)
  
// Evvent Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener('submit', (e)=> {
   e.preventDefault();
   currentSearch = searchValue;
    searchPhotos(searchValue);
})

more.addEventListener('click', loadMore);


async function searchPhotos(query){
  clear()
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePicture(data)
}
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}

async function loadMore() {
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`

    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }
    const data = await fetchApi(fetchLink);
    generatePicture(data);
}

curatedPhotos()

