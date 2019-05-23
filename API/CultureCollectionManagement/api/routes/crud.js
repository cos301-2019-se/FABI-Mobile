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

// [START config]
const ds = new Datastore();

const kind = 'User';
// [END config]

// Translates from Datastore's entity format to
// the format expected by the application.
//
// Datastore format:
//   {
//     key: [kind, id],
//     data: {
//       property: value
//     }
//   }
//
// Application format:
//   {
//     id: id,
//     property: value
//   }
function fromDatastore(obj) {
    obj.id = obj[Datastore.KEY].id;
    return obj;
}

// Translates from the application's format to the datastore's
// extended entity property format. It also handles marking any
// specified properties as non-indexed. Does not translate the key.
//
// Application format:
//   {
//     id: id,
//     property: value,
//     unindexedProperty: value
//   }
//
// Datastore extended format:
//   [
//     {
//       name: property,
//       value: value
//     },
//     {
//       name: unindexedProperty,
//       value: value,
//       excludeFromIndexes: true
//     }
//   ]
function toDatastore(obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach(k => {
        if (obj[k] === undefined) {
            return;
        }
        results.push({
            name: k,
            value: obj[k],
            excludeFromIndexes: nonIndexed.indexOf(k) !== -1,
        });
    });
    return results;
}

// Lists all books in the Datastore sorted alphabetically by title.
// The ``limit`` argument determines the maximum amount of results to
// return per page. The ``token`` argument allows requesting additional
// pages. The callback is invoked with ``(err, books, nextPageToken)``.
// [START list]
function list(limit, token, cb) {
    const q = ds
        .createQuery([kind])
        .limit(limit)
        .order('title')
        .start(token);

    ds.runQuery(q, (err, entities, nextQuery) => {
        if (err) {
            cb(err);
            return;
        }
        const hasMore =
            nextQuery.moreResults !== Datastore.NO_MORE_RESULTS
                ? nextQuery.endCursor
                : false;
        cb(null, entities.map(fromDatastore), hasMore);
    });
}
// [END list]

// Creates a new book or updates an existing book with new data. The provided
// data is automatically translated into Datastore format. The book will be
// queued for background processing.
// [START update]
function update(id, data, cb) {
    let key;
    if (id) {
        key = ds.key([kind, parseInt(id, 10)]);
    } else {
        key = ds.key(kind);
    }

    const entity = {
        key: key,
        data: toDatastore(data, ['description']),
    };

    ds.save(entity, err => {
        data.id = entity.key.id;
        cb(err, err ? null : data);
    });
}
// [END update]

function create(data, cb) {
    update(null, data, cb);
}

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
module.exports = {
    create,
    read,
    update,
    delete: _delete,
    list,
};
// [END exports]
