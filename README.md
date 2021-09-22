# Burger Queen - API con Node.js

## Prueba

## Índice

* [1. Preámbulo](#1-pre%C3%A1mbulo)
* [2. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptaci%C3%B3n-m%C3%ADnimos-del-proyecto)
* [3. Pistas, tips y lecturas complementarias](#6-pistas-tips-y-lecturas-complementarias)
* [4. HTTP API Checklist](#7-http-api-checklist)

## 1. Preámbulo

![Node.js logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)

Un pequeño restaurante de hamburguesas, que está creciendo, necesita un
sistema a través del cual puedan tomar pedidos usando una _tablet_, y enviarlos
a la cocina para que se preparen ordenada y eficientemente.

Este proyecto tiene dos áreas: interfaz web (cliente) y API (servidor). Nuestra
clienta nos ha solicitado desarrollar la API que se debe integra con la
interfaz, que otro equipo de desarrolladoras está trabajando simultáneamente.

Con una API en este caso nos referimos a un _servidor web_, que es
básicamente un programa que _escucha_ en un puerto de red, a través del cual
podemos enviarle _consultas_ (_request_) y obtener _respuestas_ (_response_)
usando el protocolo HTTP (o HTTPS).

Un servidor web debe _manejar_ consultas entrantes y producir respuestas a esas
consultas que serán enviadas de vuelta al _cliente_. Cuando hablamos de
_aplicaciones de servidor_, esto implica una arquitectura de _cliente/servidor_,
donde el cliente es un programa que hace consultas a través de una red (por
ejemplo el navegador, cURL, ...), y el _servidor_ es el programa que recibe
estas consultas y las responde.

## 2. Criterios de aceptación del proyecto

### 2.1 API

Según lo establecido por la [documentación](https://laboratoria.github.io/burger-queen-api/)
entregada por nuestra clienta, la API debe exponer los siguientes endpoints (se les comparte algunos e):

> #### 2.1.1 `/`

* `GET /`

```
      {
      "name": "burger-queen-api",
      "version": "1.0.0"
      }
```

> #### 2.1.2 `/auth`

* `POST /auth`

```
Body request:
      {
          "email": "admin@localhost.com",
          "password": "changeme"
      }

Body response:
      {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTI5MWVlOThhNDdhMDFkZDJmMWZhZTYiLCJlbWFpbCI6ImFkbWluQGxvY2FsaG9zdC5jb20iLCJyb2xlcyI6eyJhZG1pbiI6dHJ1ZX0sImlhdCI6MTYzMjE2NDE3MiwiZXhwIjoxNjMyMTY3MTcyfQ.pTgSGNjzs3YIScMgHFDwj8cl0JegQAZsk2rq-_-FLkI"
      }

```

> #### 2.1.3 `/users`

* `GET /users`

```
Body response:
      [
          {
              "roles": {
                  "admin": true
              },
              "_id": "61291ee98a47a01dd2f1fae6",
              "email": "admin@localhost.com"
          },
          {
              "roles": {
                  "admin": false
              },
              "_id": "6148db5bb49c7b17a7274ab1",
              "email": "waiter@gmail.com",
              "createdAt": "2021-09-20T19:04:59.815Z",
              "updatedAt": "2021-09-20T19:04:59.815Z"
          },
          {
              "roles": {
                  "admin": true
              },
              "_id": "6148db9fb49c7b17a7274ab5",
              "email": "manager@gmail.com",
              "createdAt": "2021-09-20T19:06:07.721Z",
              "updatedAt": "2021-09-20T19:06:07.721Z"
          },
          {
              "roles": {
                  "admin": false
              },
              "_id": "6148dc02b49c7b17a7274abf",
              "email": "kitchen@gmail.com",
              "createdAt": "2021-09-20T19:07:46.349Z",
              "updatedAt": "2021-09-20T19:07:46.349Z"
          }
      ]
```

* `GET /users/:uid`

```
Body response:
      {
          "roles": {
              "admin": false
          },
          "_id": "6148db5bb49c7b17a7274ab1",
          "email": "waiter@gmail.com",
          "createdAt": "2021-09-20T19:04:59.815Z",
          "updatedAt": "2021-09-20T19:04:59.815Z"
      }
```

* `POST /users`

```
Body request:
      {
          "email": "waiter@gmail.com",
          "password": "QWERT123456",
          "roles" :  {
            "admin": false
          } 
      }

Body response:
      {
          "_id": "6148db5bb49c7b17a7274ab1",
          "email": "waiter@gmail.com",
          "roles": {
              "admin": false
          },
          "createdAt": "2021-09-20T19:04:59.815Z",
          "updatedAt": "2021-09-20T19:04:59.815Z"
      }
```

* `PUT /users/:uid`

```
Body request:

Body response:

```

* `DELETE /users/:uid`

```
Body request:
        {
            "email": "waiter@gmail.com",
            "password": "QWERT123456",
            "roles" :  {
            "admin": false
            } 
        }      

Body response:
      {
          "roles": {
              "admin": false
          },
          "_id": "6148db5bb49c7b17a7274ab1",
          "email": "waiter@gmail.com",
          "createdAt": "2021-09-20T19:04:59.815Z",
          "updatedAt": "2021-09-20T19:04:59.815Z"
      }
```


> #### 2.1.4 `/products`

* `GET /products`

```
https://nodejs-bq-api.herokuapp.com/products?limit=2&page=1
https://nodejs-bq-api.herokuapp.com/products (Default: limit = 10 and page = 1)
(Requiere solo Authenthicación (token))

Body response:
      [
          {
              "price": 15,
              "_id": "612566b53167920e8599fbee",
              "name": "burger simple",
              "image": "img",
              "type": "burger",
              "dateEntry": "2021-08-11T05:00:00.000Z",
              "__v": 0
          },
          {
              "price": 5,
              "_id": "614950d204c85e49919063c1",
              "name": "soda",
              "image": "img",
              "type": "drink",
              "dateEntry": "2021-09-21T03:26:10.818Z",
              "__v": 0
          },
          {
              "price": 10,
              "_id": "6149515404c85e49919063c7",
              "name": "ice-cream",
              "image": "img",
              "type": "side dishes",
              "dateEntry": "2021-09-21T03:28:20.647Z",
              "__v": 0
          }
      ]
```

 `GET /products/:productid`

```

Body response:
      {
          "price": 5,
          "_id": "614950d204c85e49919063c1",
          "name": "soda",
          "image": "img",
          "type": "drink",
          "dateEntry": "2021-09-21T03:26:10.818Z",
          "__v": 0
      }

```

* `POST /products`

```
Body request:
      {
          "price": 10,
          "name": "ice-cream",
          "image": "img",
          "type": "side dishes",
          "dateEntry": "2021-09-21T03:28:20.647Z",
      }

Body response:
      {
          "price": 10,
          "_id": "6149515404c85e49919063c7",
          "name": "ice-cream",
          "image": "img",
          "type": "side dishes",
          "dateEntry": "2021-09-21T03:28:20.647Z",
          "__v": 0
      }
```

* `PUT /products/:productid`

```
Body request:

Body response:
```

* `DELETE /products/:productid`

```
Body response:
    {
        "message": "The product {\n  price: 30,\n  _id: 6149515404c85e49919063c7,\n  name: 'side dishes',\n  image: 'img',\n  type: 'ice-cream',\n  dateEntry: 2021-08-11T05:00:00.000Z,\n  __v: 0\n} has been removed succesfully."
    }
```

> #### 2.1.5 `/orders`

* `GET /orders`

```
Body response:

```

* `GET /orders/:orderId`

```
Body request:

Body response:
```

* `POST /orders`}

```
Body request:

Body response:
```

* `PUT /orders/:orderId`

```
Body request:

Body response:
```

* `DELETE /orders/:orderId`

```
Body request:

Body response:
```


### 2.2 CLI

La clienta nos ha solicitado que la aplicación cuente un comando **`npm start`**
que se debe encargar de ejecutar nuestra aplicación node y que además pueda
recibir información de configuración, como el puerto en el que escuchar, a qué
base datos conectarse, etc. Estos datos de configuración serán distintos entre
diferentes entornos (desarrollo, producción, ...). El _boilerplate_ ya implementa
[el código necesario](config.js) para leer esta información de los
[argumentos de invocación](https://nodejs.org/docs/latest/api/process.html#process_process_argv)
y el
[entorno](https://nodejs.org/docs/latest/api/process.html#process_process_env).

#### 2.2.1 Argumentos de línea de comando

Podemos especificar el puerto en el que debe arrancar la aplicación pasando un
argumento a la hora de invocar nuestro programa:

```sh
# Arranca la aplicación el puerto 8888 usando npm
npm start 8888
```

#### 2.2.2 Variables de entorno

Nuestra aplicación usa las siguientes variables de entorno:

* `PORT`: Si no se ha especificado un puerto como argumento de lína de comando,
  podemos usar la variable de entorno `PORT` para especificar el puerto. Valor
  por defecto `8080`.
* `DB_URL`: El _string_ de conexión de _MongoDB_ o _MySQL_. Cuando ejecutemos la
  aplicación en nuestra computadora (en entorno de desarrollo), podemos usar el
  una base de datos local, pero en producción deberemos utilizar las instancias
  configuradas con `docker-compose` (mas sobre esto en la siguiente sección de
  **Deployment**)
* `JWT_SECRET`: Nuestra aplicación implementa autenticación usando JWT (JSON
  Web Tokens). Para poder firmar (cifrar) y verificar (descifrar) los tokens,
  nuestra aplicación necesita un secreto. En local puedes usar el valor por
  defecto (`xxxxxxxx`), pero es muy importante que uses un _secreto_ de verdad
  en producción.
* `ADMIN_EMAIL`: Opcionalmente podemos especificar un email y password para
  el usuario admin (root). Si estos detalles están presentes la aplicación se
  asegurará que exista el usuario y que tenga permisos de administrador. Valor
  por defecto `admin@localhost`.
* `ADMIN_PASSWORD`: Si hemos especificado un `ADMIN_EMAIL`, debemos pasar
  también una contraseña para el usuario admin. Valor por defecto: `changeme`.

### 2.3 Despliegue (Deployment)

Nuestra clienta nos ha manifestado que su equipo de _devops_ está siempre con
muchas tareas, por por lo que nos pide como requerimiento que la aplicación esté
configurada con `docker-compose` para que pueda ser desplegada sin dificultades
en cualquier entorno.

El _boilerplate_ ya cuenta con una configuración incial de `docker-compose` para
la aplicación de node, tu tarea será extender esa configuración para incluir la
configuración de base de datos que hayas elegido. Ten en cuenta que como vas a
tener dos servidores corriendo sobre una misma configuración, deberás exponer
los servicios en diferentes puertos.

Para este proyecto te recomendamos usar `docker-compose` localmente (en tu
computadora) para ejecutar la aplicación junto con la base de datos
seleccionada. Por otro lado, con respecto al despliegue, no es obligatorio usar
`docker-compose`, puedes elegir el proveedor (o proveedores) que prefieras junto
con el mecanismo de despligue y estrategia de alojamiento. Te recomendamos
explorar las siguientes opciones:

* [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) es
  probablemente la opción más _sencilla_ (la que requiere menos configuración) y
  nos permite alojar tanto el servidor web como la base de datos (PostgreSQL) en
  el mismo sitio con pocos clicks.
* Si quieres explorar opciones más personalizadas y ver docker del lado del
  servidor puedes cosiderar proveedores como
  [AWS (Amazon Web Services)](https://aws.amazon.com/) o
  [GCP (Google Cloud Platform)](https://cloud.google.com/), ambos tienen algún
  tipo de _free tier_ así como tanto _instancias_ de _servidores virtuales_
  (VPS) donde configurar nuestro propio Docker o servicios para desplegar
  aplicaciones en contenedores (por ejemplo [Compute Engine](https://cloud.google.com/compute/docs/containers)
  de GCP o [Elastic Container Service](https://aws.amazon.com/ecs/) de AWS).
* Si quieres trabajar con MongoDB, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  es una muy buena opción para alojar nuestra base datos de producción, la cuál
  podemos usar en conjunción con cualquiera de las opciones mencionadas arriba.

Si tienes dudas sobre las diferentes (y múltiples) opciones de despliegue no
dudes en consultar con tus pares y tus coaches.

