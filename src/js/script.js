const databaseName = document.getElementById("dbName");
const databaseVersion = document.getElementById("dbVersion");
const btn = document.getElementById("createDB");
const insert = document.getElementById("insert");
const view = document.getElementById("view");
let database = null;

btn.onclick = createDataBase;
insert.onclick = insertPost;
view.onclick = viewPost;

function viewPost() {
  let tx = database.transaction("personal_posts", "readonly");
  let post = tx.objectStore("personal_posts");
  let request = post.openCursor();
  request.onsuccess = (e) => {
    let cursor = e.target.result;
    if (cursor) {
      cursor.continue();
    }
  };
}

function insertPost() {
  post = {
    title: "post1",
    text: "my first post",
  };

  let tx = database.transaction("personal_posts", "readwrite");
  console.log(tx); // Error : DOMException: Key already exists in the object store
  tx.onerror = (err) => {
    alert(err.target.error);
  };
  let myPost = tx.objectStore("personal_posts");
  myPost.add(post);
}

function createDataBase() {
  if (databaseVersion.value.length == 0) databaseVersion.value = 1;
  const request = indexedDB.open(
    `${databaseName.value}`,
    databaseVersion.value
  );

  request.onupgradeneeded = function (e) {
    database = e.target.result;

    const personalPosts = database.createObjectStore("personal_posts", {
      keyPath: "title",
    });
    const favouriteMovies = database.createObjectStore("favourite_movies", {
      keyPath: "action",
    });
    alert(`Upgrade database to ${database.name} version ${database.version}`);
  };
  request.onsuccess = function (e) {
    database = e.target.result;
    alert(`Success on ${database.name} ${database.version}`);
  };
  request.onerror = function (err) {
    alert("Oups, make sure you select the right version.");
  };
}
