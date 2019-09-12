const API_KEY = "8b42a0c0-d56a-11e9-86e9-6733b6ff9504";
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
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((gallery) => {
      if (gallery.id == id)
      {
        //display ByteLengthQueuingStrategy
        break;
      }
    });

    if (data.info.next) {
      showGalleries(data.info.next);
    }
  })
}

showGalleries(url);
