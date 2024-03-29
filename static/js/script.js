const API_KEY = "8b42a0c0-d56a-11e9-86e9-6733b6ff9504";
const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;

const galleries = document.querySelector("#galleries");
const allObjects = document.querySelector("#all-objects");
const allGalleries = document.querySelector("#all-galleries");
const objects = document.querySelector("#objects");
const objectview = document.querySelector("#object-view");
const objectinfo = document.querySelector("#objectinfo");
const button = document.querySelector("#gobackbutton");
const button1 = document.querySelector("#objecttablebackbutton");
const button2 = document.querySelector("#objectviewbackbutton");
const floorOption = document.querySelector("#floorList");

function load() {
  let hash = (window.location.hash).replace('#', '');
  if (hash.length == 0) {
      showGalleries(url);
  }
}

window.onload = load;

function showGalleries(url) {
  allObjects.style.display = "none";
  allGalleries.style.display = "block";
  objectview.style.display = "none";
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((gallery) => {
      galleries.innerHTML += `
        <li class="list-group-item">
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

function showGalleryFloor(url) {
  allObjects.style.display = "none";
  allGalleries.style.display = "block";
  objectview.style.display = "none";
  let e = document.getElementById("floorList");
  let floor = e.options[e.selectedIndex].value;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((gallery) => {
      if(floor == "all" || gallery.floor == floor) {
      galleries.innerHTML += `
      <li class="list-group-item">
        <a href="#${gallery.id}" onclick="showObjectsTable(${gallery.id})">
          Gallery #${gallery.id}: ${gallery.name} (Floor ${gallery.floor})
        </a>
      </li>
      `;
      }
    });

    if (data.info.next) {
      showGalleryFloor(data.info.next);
    }
  });
}

function clearHtml() {
  galleries.innerHTML = "";
}

function showObjectsTable(id) {
  allObjects.style.display = "block";
  allGalleries.style.display = "none";
  objectview.style.display = "none";
  fetch(`https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${id}`)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((object) => {
      objects.innerHTML += `
      <tr>
      <td><a href="#${object.objectnumber}" onclick="showObjectInfo('${object.objectnumber}');">${object.title}</a></td>
        <td><img src=${object.primaryimageurl}></td>
        <td>${object.people ? object.people.map(x => x.name): "Unknown"}</td>
        <td><a href="${object.url}" target="_blank">Click to visit page</a></td>
      </tr>
    `;
    });
    button1.innerHTML += `<input type="button" class = "btn btn-outline-success ml-3" value="Go Back" onclick="window.location.href='index.html'">`
  });
}

function showObjectInfo(id) {
  allObjects.style.display = "none";
  allGalleries.style.display = "none";
  objectview.style.display = "block";
  fetch(`https://api.harvardartmuseums.org/object?apikey=${API_KEY}&objectnumber=${id}`)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((info) => {
      objectinfo.innerHTML += `
      <tr>
        <td>${info.title}</td>
        <td>${info.description}</td>
        <td>${info.provenance}</td>
        <td>${info.accessionyear}</td>
        <td><img src=${info.primaryimageurl}></td>
      </tr>
    `;
    });
    button2.innerHTML += `<input type="button" class = "btn btn-outline-success ml-3" value="Go Back" onclick="window.location.href='index.html'">`
  });
}

