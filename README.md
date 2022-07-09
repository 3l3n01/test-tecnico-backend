# test-tecnico-backend
El proyecto consta de 2 elemmentos, los cuales son un api para la generacion de los datos, y otra que consume el api anterior, los datos son generados de forma aleatoria
al momento de iniciar el servicio.

## Descripcion

Organización de ayuda humanitaria
Una organización de ayuda humanitaria trabaja principalmente en Sudán. Has sido
contratado para desarrollar una aplicación que muestre la ayuda monetaria enviada a
Sudán desde último año hasta 5 años atrás por todas las diferentes organizaciones,
agencias y gobiernos, agrupadas por año y ordenadas desde la que más haya contribuido
en total hasta la que menos. La aplicación debe devolver un JSON, no necesita de ninguna
interfaz. Dicho JSON será usado por otro website para mostrar los datos.

La información requerida por la aplicación puede ser extraída de
https://iatidatastore.iatistandard.org/documentation (en inglés). Openaid tiene una API
abierta que puede devolver información en XML o JSON. Para poder obtener los datos de
ayuda monetaria puede consultarse mediante el código de país, SD corresponde a Sudán.
Consiste en escribir una aplicación que en cada solicitud obtenga los datos de la API de
Openaid y los agregue en el formato especificado. La respuesta necesita estar cacheada o
guardada de alguna forma, no importa el método. La organización necesita esto para evitar
que usuarios malintencionados puedan usar la API de Openaid de mala manera. Dado un
código de país la aplicación debe ajustarse a la estructura JSON que se especifica a
continuación.

Ejemplo
Iraq tiene el código de país IQ, el año es 2012. La respuesta generada podría ser:
```
{
  "2011": {
    "Sida": 181469583
  },
  "2010": {
    "Sida": 149667518,
    "UD": 6105000
  },
  "2009": {
    "Sida": 122295311,
    "UD": 30291000
  },
  "2008": {
    "Sida": 128969145,
    "UD": 33851000,
    "Folke Bernadotte Academy": 173000,
    "Svenska institutet": 125000
  },
  "2007": {
    "Sida": 101561481,
    "UD": 7399000,
    "Folke Bernadotte Academy": 6000
  }
}
```

## Dependncias

El proyecto cuenta con las siguientes dependencias, las cuales son:

- Redis
- Postgresql

## Ambiente

Para su ejecucion se requiere tener las siguientes dependencias:

- Node ^v14.19.1
- Npm ^6.14.16

## Iniciar el proyecto

Para iniciar el proyecto se puede realizar por medio de docker, utilizando composer, o realizar a mano, solo teniendo encuenta las dependencias como lo son redis y postgres.

## Configuracion

*Nota*: las variables son requeridas si el proyecto es iniciado a mano.

#### Api

- NODE_ENV=production
- DB_DATABASE=db // Nombre de la base de datos
- DB_HOST=postgres // Host del servidor
- DB_PASSWORD=password // Password
- DB_USERNAME=usuario // Usuario de la db

#### Reto (Nestjs)

- REDIS_HOST=redis
- REDIS_PORT=6379
- API_HOST=http://api_data:3000
- FORMAT_DATE=DD-MM-YYYY

## Docker-composer

Para iniciar utilizando docker, basta con ejecutar el siguiente comando en la raiz del proyecto, sin requerir entrar a una carpeta especifica (api, reto).

```
docker-compose up --remove-orphans
```

una vez echo esto, se iniciaran todas las dependencias como servicios, basta con esperar a que se finalice la carga.

![Consola](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/terminal.png)

## Manual

En caso de no contar con docker o no querer realizar el inicio del proyecto de esta manera, se puede cargar de igual manera de forma manual, para ello, primero se
debe cumplir con las dependencias previas.

#### Migracion

En la carpeta *api* ejecutar el siguiente comando para iniciar la migracion a la base de datos
```
npx sequelize-cli db:migrate
```

si todo es correcto, debe mostrarse en la termina el siguiente contenido.

![Migracion](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/migrations.png)


#### Seeds

Para generar el contenido en la misma carpeta de api ejecutamos los siguientes comandos, con sus respectivas salidas a la terminal.

```
npx sequelize-cli db:seed --seed 20220602000505-currency
```
![Seed](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/seed-currency.png)


```
npx sequelize-cli db:seed --seed 20220602000551-country
```
![Seed](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/seed-country.png)


```
npx sequelize-cli db:seed --seed 20220602000601-organization
```
![Seed](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/seed-organizations.png)


```
npx sequelize-cli db:seed --seed 20220602020844-donations
```
![Seed](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/seed-donations.png)


### Iniciar el Api

Dentro de la carpeta api, ejecutar el siguiente comando para iniciar el servicio.

```
npm run start
```
el api debe estar ejecutandose en http://localhost:3000

El siguiente comando se debe ejecutar dentro de la carpeta *reto*, el cual seria:

```
npm run start
```

si todo es correcto deberiamos ver el siguiente contenido en la terminal.
![Migracion](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/nestjs-run.png)

Una vez este activo debe estar corriendo en http://localhost:3001/

## Documentacion

Ambas apis, se encuentran documentadas utilizando openapi (swagger)

Api: http://localhost:3000/docs
![api](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/api-data.png)

Reto: http://localhost:3001/doc
![api](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/api-nestjs.png)

## Ejemplos de consultas

Api
![api](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/request-data.png)

Reto
![api](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/request-nestjs.png)


## Status

En el api data se agrego una pagina para ver el status de la misma, la cual se encuentra en: http://localhost:3000/health/status
![api](https://raw.githubusercontent.com/3l3n01/test-tecnico-backend/main/docs/status.png)
