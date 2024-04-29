# Use the official Maven image to create a build artifact
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src src
# Package the application
RUN mvn clean package -DskipTests

# Use OpenJDK for running the application
FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/fanatic-backend-*.jar /app/fanatic-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "fanatic-backend.jar"]
