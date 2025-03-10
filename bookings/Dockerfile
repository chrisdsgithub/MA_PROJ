FROM openjdk:23-jdk-slim

WORKDIR /tripsync_ma_proj

COPY target/bookings-0.0.1-SNAPSHOT.jar bookings-service.jar

EXPOSE 4050

ENTRYPOINT ["java","-jar","bookings-service.jar"]

