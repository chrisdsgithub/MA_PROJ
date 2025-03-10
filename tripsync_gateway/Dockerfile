FROM openjdk:23-jdk-slim

WORKDIR /tripsync_ma_proj

COPY target/tripsync_gateway-0.0.1-SNAPSHOT.jar tripsync_gateway.jar

EXPOSE 9090

ENTRYPOINT ["java","-jar","tripsync_gateway.jar"]

