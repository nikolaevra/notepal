/**
 * Created by Ruslan on 11/7/2017.
 */
"use strict";


const db = require('./server/db');

let result  = db.getAllFiles('e94d509c-437b-434d-81d8-e762d635a734');
result.then((data) => {
    console.log(data);
});

// a.then(console.log(a));
