# node-2021

[![](https://img.shields.io/badge/Node.js-14.16.0-yellowgreen.svg)](https://nodejs.org/en/)

node-2021-refresh.

This removes `body-parser` module.

> Note: This necessitates setting `Content-Type` to `JSON` in your PUT requests (previously, you could send over anything in the body as a String too).

> Note: See security comment below for "injection-like" directory traversal protections.

> This is not production-worthy but is a helpful scaffold for boilerplate.

## Use

```zsh
npm i
npm run start
npm run stop-unix
npm run stop-win
```

To run tests:
```zsh
npm run start
npm run tests
```

You will see:
```cmd
GET /data/cats/ 404 4.267 ms - 149
PUT /data/cats 201 20.348 ms - 69
GET /data/cats/c922e669-c677-4bb3-aa8d-52d78dbcb0c7 200 3.600 ms - 45
DELETE /data/cats/c922e669-c677-4bb3-aa8d-52d78dbcb0c7 200 1.378 ms - 14
```

```cmd
======= GET request made to http:localhost:7777/data/cats/

STATUS: 404

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /data/cats/</pre>
</body>
</html>

======= PUT request made to http:localhost:7777/data/cats

STATUS: 201

{"status":201,"oid":"c922e669-c677-4bb3-aa8d-52d78dbcb0c7","size":17}

======= GET request made to http:localhost:7777/data/cats/c922e669-c677-4bb3-aa8d-52d78dbcb0c7

STATUS: 200

{"status":200,"data":"{\"name\":\"hello!\"}"}

======= DELETE request made to http:localhost:7777/data/cats/c922e669-c677-4bb3-aa8d-52d78dbcb0c7

STATUS: 200

{"status":200}
```

Some PNG's illustrating this and Postman setup are in [images](./images).

## API Endpoints

1. The main app runs off port `8888`.
1. The Express app (and routes) / API is on `7777`.
1. These can be configured in `config.js`.
1. The API creates, removes, and retrieves simple blob-like object files (un-encrypted) within a defined repository (enclosing dir).
1. Express request params (`req.params`) is "smart enough" (read: secure-enough out of the box) to also remove injection-attack-like symbols/chars from your PUT request. In other words, `localhost:7777/data/..catas/` will simply created a directory with String name `..catas` rather than traversing the directory tree up. Likewise, `localhost:7777/data/../../catas/` will simply return an error.

### Upload an Object

```URL
PUT localhost:7777/data/12312fy7yi
```

```Body
{
	"object": "Test!"
}
```

#### Response

```
{
    "status": 201,
    "oid": "7db07cc0-6588-4320-9da6-f0f6deffc860",
    "size": 7
}
```

### Download an Object

```
GET localhost:7777/data/123h89hahf2324/132132321312
```

#### Response

```
{
    "status": 200,
    "data": "Hello!"
}
```

Objects that are not on the server will return a `404 Not Found`.

### Delete an Object

```
DELETE localhost:7777/data/12312fy7yi/ee766e89-e6c9-4eec-a78e-88d7baf657d7
```

#### Response

```
{
    "status": 200
}
```
