FROM eclipse-temurin:23-jdk

# Copy jar into container
COPY target/eureka-server-0.0.1-SNAPSHOT.jar app.jar

# Expose Eureka server port
EXPOSE 8761

# Start the service
ENTRYPOINT ["java", "-jar", "/app.jar"]
