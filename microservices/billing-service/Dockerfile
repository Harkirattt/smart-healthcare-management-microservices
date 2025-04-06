FROM openjdk:17-jdk-slim
COPY target/billing-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "/app.jar"]
