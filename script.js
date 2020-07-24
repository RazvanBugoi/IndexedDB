const databaseName = document.getElementById('dbName');
const databaseVersion = document.getElementById('dbVersion');
const btn = document.getElementById('createDB');
const insert = document.getElementById('insert');
let database = null;

btn.onclick = createDataBase;
insert.onclick = insertPost;




function insertPost() {
    post =  {
        title: "post1",
        text: "my first post"
    }

    let tx = database.transaction('personal_posts', 'readwrite');
    let myPost = tx.objectStore('personal_posts')
    myPost.add(post);
}

function createDataBase() {
    if(databaseVersion.value.length == 0) databaseVersion.value = 1;
const request = indexedDB.open(`${databaseName.value}`, databaseVersion.value);





request.onupgradeneeded = function(e) {
    database = e.target.result
    console.log(database);


    const personalPosts = database.createObjectStore("personal_posts", {keyPath: "title"})
    const favouriteMovies = database.createObjectStore('favourite_movies', {keyPath: 'action'});
    alert(`Upgrade database to ${database.name} version ${database.version}`);
}
request.onsuccess = function(e) {
    database = e.target.result;
    alert(`Success on ${database.name} ${database.version}`);
}
request.onerror = function(err) {
    alert('Oups, make sure you select the right version.');
}
}
