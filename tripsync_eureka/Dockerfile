FROM openjdk:25-jdk-slim
WORKDIR /tripsync_ma_proj

COPY target/tripsync_eureka-0.0.1-SNAPSHOT.jar tripsync-eureka.jar

EXPOSE 8761

ENTRYPOINT ["java","-jar","tripsync-eureka.jar"]

