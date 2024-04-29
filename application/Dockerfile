FROM ubuntu:latest
LABEL authors="ceylanberktola"
FROM maven:3.8.4-jdk-17 as backend-build
WORKDIR /application
COPY ./fanatic-backend/pom.xml ./backend/
COPY ./fanatic-backend/src ./backend/src
RUN mvn -f ./backend/pom.xml clean package

FROM node:14 as frontend-build
WORKDIR /application
COPY ./frontend/package.json ./frontend/
COPY ./frontend/package-lock.json ./frontend/
RUN npm --prefix ./frontend install
COPY ./frontend/ ./frontend/
RUN npm --prefix ./frontend build

#FROM openjdk:17-jre-slim
WORKDIR /application
#COPY --from=backend-build /application/backend/target/*.jar ./app.jar
COPY --from=frontend-build /application/frontend/build ./public
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
