# Architecture

Fanatic consists of three main parts, namely ```./fanatic-backend```, ```./frontend``` and ```./mobile``` that contain the respective codebase for backend,
frontend and mobile modules.

## Development

To build and start the app locally, run:

```
cd bounswe2024group8/application
docker-compose up --build
```

The script above builds and runs the images on the local Docker client to allow developers to develop and test the application simultaneously. If everything goes as intended, the application should be accessible on:

```
http://localhost:3000
```

## Deployment

Google Cloud Run is our choice of platform to deploy containers for this project. We deploy our project with the following steps:

1. Run a postgres instance in the Cloud App and create a database
   
2. To deploy backend, use the URL from 1. and run:
   
   ```
   cd bounswe2024group8/application/fanatic-backend
   gcloud run deploy
   ```

3.  To deploy frontend, use the URL from 2. and run:
   
   ```   
   cd bounswe2024group8/application/frontend
   gcloud run deploy
   ```


If everything goes as intended, the backend should be accessible at:

```
https://fanatic-backend-bjbpof6jaq-oa.a.run.app/
```

Frontend should be accessible at:

```
https://frontend-bjbpof6jaq-oa.a.run.app/
```

