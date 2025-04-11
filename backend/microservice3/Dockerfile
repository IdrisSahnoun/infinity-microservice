FROM openjdk:17
#utilise le meme port que le fichier application.properties
EXPOSE 8090
ADD target/microservice3-0.0.1-SNAPSHOT.jar microservice3.jar
ENTRYPOINT ["java", "-jar","microservice3.jar"]
