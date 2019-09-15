const API_KEY = "8b42a0c0-d56a-11e9-86e9-6733b6ff9504";
const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;

const galleries = document.querySelector("#galleries");
const allObjects = document.querySelector("#all-objects");
const allGalleries = document.querySelector("#all-galleries");
const objects = document.querySelector("#objects");
const objectview = document.querySelector("#object-view")
const objectinfo = document.querySelector("#objectinfo")
const button1 = document.querySelector("#objecttablebackbutton")
const button2 = document.querySelector("#objectviewbackbutton")



function plsLoad() {
  let hash = (window.location.hash).replace('#', '');
  if (hash.length == 0) {
      showGalleries(url);
  }
}

window.onload = plsLoad;
//window.onhashchange = plsLoad;

/**let enterPressed = 0;
window.onkeydown = function (e) {
  let keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    if (enterPressed === 0) {
      enterPressed = 1;
      e.preventDefault(); 
      console.log("Enter pressed once. enterPressed is " + enterPressed);
    } else if (enterPressed === 1) {
      e.preventDefault(); 
      console.log("Enter pressed twice. enterPressed is " + enterPressed);
    }
   }
 };**/

function showGalleries(url) {
  allObjects.style.display = "none";
  allGalleries.style.display = "block";
  objectview.style.display = "none";
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
  objectview.style.display = "none";
  fetch(`https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${id}`)
  .then((response) => response.json())
  .then((data) => {
    data.records.forEach((object) => {
      console.log(object.objectnumber);
      objects.innerHTML += `
      <tr>
        <td><a href="#${object.objectnumber}" onclick="showObjectInfo(${object.objectnumber})">${object.title}</a></td>
        <td><img src=${object.primaryimageurl} width=50px height=60px></td>
        <td>${object.people ? object.people.map(x => x.name) : "Unknown"}</td>
        <td><a href="${object.url}" target="_blank">Click to visit page</a></td>
      </tr>
    `;
    });
    button1.innerHTML += `<input type="button" value="Go Back" onclick="window.location.href='index.html'">`
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
        <td><img src=${info.primaryimageurl} width=50px height=60px></td>
      </tr>
    `;
    });
    button2.innerHTML += `<input type="button" value="Go Back" onclick="window.location.href='index.html'">`;
  });
}


// function goBack() {
//   showGalleries(url));
//   window.location.href = window.location.href.split('#')[0];
// }

//showGalleries(url);