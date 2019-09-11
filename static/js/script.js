const API_KEY = "API_KEY_GOES_HERE";
const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;

const galleries = document.querySelector("#galleries");
const allObjects = document.querySelector("#all-objects");
const allGalleries = document.querySelector("#all-galleries");

function showGalleries(url) {
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((gallery) => {
      galleries.innerHTML += `
        <li>
          <a href="#${gallery.id}" onclick="showObjectsTable(${gallery.id})">
            Gallery #${gallery.id}: ${gallery.name} (Floor ${gallery.floor})
          </a>
        </li>
      `;
    });

    if (data.info.next) {
      showGalleries(data.info.next);
    }
  })
}

function showObjectsTable(id) {
  allObjects.style.display = "block";
  allGalleries.style.display = "none";
}

showGalleries(url);
