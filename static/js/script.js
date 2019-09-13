const API_KEY = "8b42a0c0-d56a-11e9-86e9-6733b6ff9504";
const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;

const galleries = document.querySelector("#galleries");
const allObjects = document.querySelector("#all-objects");
const allGalleries = document.querySelector("#all-galleries");
const objects = document.querySelector("#objects");

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
  fetch(`https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${id}`)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((object) => {
      console.log("lol");
      objects.innerHTML += `
      <tr>
        <td>${object.title}</td>
        <td><img src=${object.primaryimageurl} width=50px height=60px></td>
        <td>${object.people.map(x => x.name)}</td>
        <td><a href="${object.url}" target="_blank">Click to visit page</a></td>
      </tr>
    `;
    });
  });
}

function viewObject(objectId) {
  //fetch object info
  //display it in div with id "object-view"
}

showGalleries(url);
