FROM openjdk:17
#utilise le meme port que le fichier application.properties
EXPOSE 8081
ADD target/microservice1-0.0.1-SNAPSHOT.jar microservice1.jar
ENTRYPOINT ["java", "-jar","microservice1.jar"]
