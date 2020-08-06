# IndexedDB

The purpose of this prototype is to learn how to use IndexedDB. We would used this instead of localStorage on projects that are bigger than 5MB in size or projects that we want to save on our local machine. 
During this project I've learnt that IndexedDB has three main events: 
1. `onupgradeneeded`
2. `onsuccess`
3. `onerror`

Each of these events have the same argument, which is the response we get from our request on opening a new database. 
After the request, the answer gets first passed as argument to `onupgradeneeded` to setup our database. The same argument is then passed to `onsuccess` if the database was created successfully or to `onerror` if the database creation failed. 

Other methods that I've came across in this project include: 
* `transaction` to create a transaction. We have to tell where we want our transaction to take place and what kind of transaction it will be 'readwrite' or 'readonly'
* `createObjectStore` to create tables. We need to specify the name of the table and the `{keyPath}` which is just a filter that stores only the information we want based on our input
* `objectStore` to access the table's we've created.
* `openCursor` allows us to set the cursor at the beginning of table. Then we can use `cursor.continue()` to parse data.
