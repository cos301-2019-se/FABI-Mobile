// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {Datastore} = require('@google-cloud/datastore');
const bcrypt = require('bcrypt-nodejs');
const admin = require('firebase-admin');




// [START config]
admin.initializeApp(
);
const db = admin.firestore();

// [END config]


function read(qs, res, next) {
    var docRef = ds.createQuery([kind]).filter('email', '=', qs.email);
    //console.log(docRef);

    ds.runQuery(docRef, (err, doc) => {
        console.log(doc);
        if (typeof doc[0] === "undefined") {
            res.setHeader('Content-Type', 'application/problem+json');
            res.setHeader('Content-Language', 'en');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(400).json({                                  // ******* RESPONSE STATUS? ************
                success: false,
                error: {
                    code: 401,
                    title: "UNAUTHORIZED",
                    message: "Not-Authenticated : Could not find user email"
                }
            })
        } else {
            var plainPass = qs.password;
            let hash = doc[0].password;
            let passMatch = bcrypt.compareSync(plainPass, hash);

            if (passMatch === false) {
                res.setHeader('Content-Type', 'application/problem+json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(400).json({
                    success: false,
                    error: {
                        code: 401,
                        title: "UNAUTHORIZED",
                        message: "Not-Authenticated : Incorrect Password"
                    }
                });
                res.locals.email = qs.email;
                res.locals.description = "Not-Authenticated : Incorrect Password";
                res.locals.success = false;
                next();

            } else {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Language', 'en');
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                    success: true,
                    data: {
                        code: 200,
                        title: "AUTHORIZED",
                        message: "Authenticated"
                    }
                });
                res.locals.email = qs.email;
                res.locals.description = "Authenticated";
                res.locals.success = true;
                next();
            }
        }
    });

}

function _delete(id, cb) {
    const key = ds.key([kind, parseInt(id, 10)]);
    ds.delete(key, cb);
}

// [START exports]
// [END exports]
