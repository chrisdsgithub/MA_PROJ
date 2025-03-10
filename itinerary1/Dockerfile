FROM openjdk:23-jdk-slim

WORKDIR /tripsync_ma_proj

COPY target/itinerary1-0.0.1-SNAPSHOT.jar itinerary-microservice.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","itinerary-microservice.jar"]

