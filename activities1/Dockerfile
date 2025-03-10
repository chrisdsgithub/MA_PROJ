FROM openjdk:23-jdk-slim

WORKDIR /tripsync_ma_proj

COPY target/activities1-0.0.1-SNAPSHOT.jar activity-microservice.jar

EXPOSE 4040

ENTRYPOINT ["java","-jar","activity-microservice.jar"]

