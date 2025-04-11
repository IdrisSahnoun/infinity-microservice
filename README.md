# Microservice1 - Gestion des Sports et Salles de Sport

## Description
Microservice1 est un service Spring Boot qui gère la gestion des sports et des salles de sport, ainsi que leurs relations. Il fait partie d'une architecture microservices plus large et utilise Spring Cloud Config pour sa configuration.

## Fonctionnalités
- Gestion CRUD des sports
- Gestion CRUD des salles de sport
- Gestion des relations entre sports et salles de sport
- Configuration centralisée via Spring Cloud Config
- Monitoring via les endpoints de santé
- Statistiques et analyses avancées
- Système de recommandation personnalisé

## Prérequis
- Java 17 ou supérieur
- Maven 3.6 ou supérieur
- Spring Boot 3.x
- Base de données (configurée via le serveur de configuration)
- Serveur de configuration Spring Cloud Config (port 8888)
- Serveur Eureka (port 8761)

## Structure du Projet
```
microservice1/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── tn/esprit/microservice1/
│   │   │       ├── controllers/
│   │   │       │   ├── SportController.java
│   │   │       │   ├── SalleDeSportController.java
│   │   │       │   └── StatistiqueController.java
│   │   │       ├── entities/
│   │   │       │   ├── Sport.java
│   │   │       │   └── SalleDeSport.java
│   │   │       ├── repositories/
│   │   │       │   ├── SportRepository.java
│   │   │       │   └── SalleDeSportRepository.java
│   │   │       ├── services/
│   │   │       │   ├── SportService.java
│   │   │       │   ├── SalleDeSportService.java
│   │   │       │   └── StatistiqueService.java
│   │   │       └── Microservice1Application.java
│   │   └── resources/
│   │       └── application.properties
└── pom.xml
```

## API Endpoints

### Sports (`/api/sports`)
- `GET /api/sports` - Liste tous les sports
- `GET /api/sports/{id}` - Récupère un sport par ID
- `POST /api/sports` - Crée un nouveau sport
- `PUT /api/sports/{id}` - Met à jour un sport
- `DELETE /api/sports/{id}` - Supprime un sport
- `POST /api/sports/{sportId}/salles/{salleId}` - Associe un sport à une salle
- `DELETE /api/sports/{sportId}/salles/{salleId}` - Supprime l'association entre un sport et une salle
- `GET /api/sports/{sportId}/salles` - Récupère les salles associées à un sport

### Salles de Sport (`/api/salles`)
- `GET /api/salles` - Liste toutes les salles de sport
- `GET /api/salles/{id}` - Récupère une salle par ID
- `POST /api/salles` - Crée une nouvelle salle
- `PUT /api/salles/{id}` - Met à jour une salle
- `DELETE /api/salles/{id}` - Supprime une salle

### Statistiques et Analyses (`/api/statistiques`)
- `GET /api/statistiques/salles` - Statistiques générales des salles
  ```json
  {
      "nombreTotalSalles": 10,
      "moyenneCapacite": 50,
      "moyennePrixAbonnement": 150.0,
      "topSports": [
          {"nom": "Yoga", "nombreSalles": 8},
          {"nom": "Fitness", "nombreSalles": 6}
      ]
  }
  ```

- `GET /api/statistiques/recommandations?ville={ville}&prixMax={prix}&sportsPreferes={sports}` - Recommandations personnalisées
  - Paramètres :
    - ville : Ville de recherche (ex: "Tunis")
    - prixMax : Budget maximum (ex: 200)
    - sportsPreferes : Liste des sports préférés (ex: "Yoga,Fitness")

- `GET /api/statistiques/tendances` - Tendances des sports par ville
  ```json
  {
      "Tunis": [
          {"nom": "Yoga", "nombreSalles": 5},
          {"nom": "Fitness", "nombreSalles": 4}
      ],
      "Sousse": [
          {"nom": "Natation", "nombreSalles": 3},
          {"nom": "Tennis", "nombreSalles": 2}
      ]
  }
  ```

## Configuration
Le service utilise Spring Cloud Config pour sa configuration. Les propriétés principales sont définies dans `application.properties`:

```properties
spring.application.name=microservice1
server.port=8081

#configServer
spring.cloud.config.enabled=true
spring.config.import=optional:configserver:http://localhost:8888

management.endpoints.web.exposure.include=refresh,health,info

# Eureka registration
eureka.client.service-url.defaultZone=http://localhost:8761/eureka
eureka.client.register-with-eureka=true
```

## Installation et Exécution

1. Clonez le repository
2. Assurez-vous que le serveur de configuration est en cours d'exécution sur le port 8888
3. Assurez-vous que le serveur Eureka est en cours d'exécution sur le port 8761
4. Exécutez les commandes suivantes :

```bash
# Compilation
mvn clean install

# Exécution
mvn spring-boot:run
```

## Tests
Pour exécuter les tests :

```bash
mvn test
```

## Monitoring
Le service expose les endpoints suivants pour le monitoring :
- `/actuator/health` - État de santé du service
- `/actuator/info` - Informations sur le service
- `/actuator/refresh` - Rafraîchissement de la configuration

## Dépendances Principales
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

## Contribution
1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
