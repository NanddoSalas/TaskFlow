FROM amazoncorretto:21-al2023-headless

WORKDIR /app

COPY target/*.jar ./server.jar

EXPOSE 8080

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=taskflow
ENV DB_USER=spring
ENV DB_PASSWORD=password

ENTRYPOINT ["java","-jar","server.jar"]