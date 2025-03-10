FROM openjdk:23-jdk-slim

WORKDIR /tripsync_ma_proj

COPY target/user1-0.0.1-SNAPSHOT.jar user-microservice.jar

EXPOSE 4000

ENTRYPOINT ["java","-jar","user-microservice.jar"]

