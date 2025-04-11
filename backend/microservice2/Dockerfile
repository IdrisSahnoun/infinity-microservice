FROM openjdk:17
#utilise le meme port que le fichier application.properties
EXPOSE 8082
ADD target/microservice2-0.0.1-SNAPSHOT.jar microservice2.jar
ENTRYPOINT ["java", "-jar","microservice2.jar"]
