FROM openjdk:17
#utilise le meme port que le fichier application.properties
EXPOSE 8085
ADD target/microservice5-0.0.1-SNAPSHOT.jar microservice5.jar
ENTRYPOINT ["java", "-jar","microservice5.jar"]
