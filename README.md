# Microservice4 - Gestion des Plans d'Entraînement et Progressions

![Build](https://img.shields.io/badge/build-passing-brightgreen) 
![License](https://img.shields.io/badge/license-MIT-blue)

Ce microservice fait partie d'une architecture distribuée et gère les plans d'entraînement ainsi que les progressions des utilisateurs.  
Il communique avec d'autres microservices via des appels HTTP (par exemple, avec le user-microservice pour valider les utilisateurs).

---

## 📚 Table des Matières
- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints API](#endpoints-api)
- [Tests](#tests)
- [Contributions](#contributions)
- [Licence](#licence)

---

## 🧾 Présentation

Ce microservice permet de :
- Créer, mettre à jour et supprimer des plans d'entraînement.
- Démarrer une progression pour un utilisateur spécifique.
- Marquer les séances comme terminées.
- Récupérer les détails d'une progression ou d'un plan d'entraînement.

Il est conçu pour fonctionner dans une architecture microservices, où chaque microservice est responsable d'une fonctionnalité spécifique.

---

## ⚙️ Fonctionnalités

### ✅ Gestion des Plans d'Entraînement
- Ajouter, modifier, supprimer et lister des plans d'entraînement.

### 📈 Gestion des Progressions
- Démarrer une progression pour un utilisateur.
- Marquer une séance comme terminée.
- Récupérer les détails d'une progression.

### 🔐 Validation des Utilisateurs
- Appels au `user-microservice` pour vérifier l'existence d'un utilisateur avant de démarrer une progression.

---

## 🧰 Technologies Utilisées
- **Langage** : Java 17  
- **Framework** : Spring Boot  
- **Base de Données** : MySQL / H2 (pour les tests)  
- **Communication** : RestTemplate (ou WebClient si nécessaire)  
- **Documentation API** : Swagger/OpenAPI  
- **Tests** : JUnit, Mockito, MockMvc  
- **CI/CD (optionnel)** : GitHub Actions

---

## 🚀 Installation

### Prérequis
- JDK 17 ou supérieur  
- Maven 3.x  
- MySQL (ou une autre base compatible)  
- Un IDE (IntelliJ IDEA, VS Code…)

### Étapes
```bash
git clone https://github.com/ton-username/microservice4.git
cd microservice4
mvn spring-boot:run
```

---

## ⚙️ Configuration

### Exemple de `application.properties`
```properties
# Nom de l'application
spring.application.name=microservice4

# Configuration du serveur
server.servlet.context-path=/plans
server.port=8084

# Configuration de la base de données
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.datasource.url=jdbc:mysql://localhost:3306/plans?&createDatabaseIfNotExist=true&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=

# JPA / Hibernate
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

# Configuration Eureka Client
eureka.client.service-url.defaultZone=http://localhost:8761/eureka
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
```

---

## 📡 Endpoints API

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/plans/api/plans` | Récupérer tous les plans |
| POST   | `/plans/api/plans` | Créer un nouveau plan |
| PUT    | `/plans/api/plans/{id}` | Mettre à jour un plan existant |
| DELETE | `/plans/api/plans/{id}` | Supprimer un plan |
| POST   | `/plans/api/progressions/start` | Démarrer une progression |
| PATCH  | `/plans/api/progressions/{id}/complete-session` | Marquer une séance comme terminée |

---

## ✅ Tests

Tests réalisés avec :
- **JUnit 5**
- **Mockito**
- **MockMvc**

### Lancer les tests
```bash
mvn test
```

---

## 🤝 Contributions

Les contributions sont les bienvenues !
N’hésitez pas à :

- Ouvrir une issue 🐛
- Soumettre une pull request 💡

---

## ❓ FAQ

**Q : Que faire si je reçois une erreur liée à Eureka ?**  
R : Assurez-vous que le serveur Eureka est en cours d'exécution et accessible à l'adresse spécifiée dans `application.properties`.

**Q : Comment puis-je tester l'API ?**  
R : Utilisez Postman ou accédez à la documentation Swagger pour tester les endpoints.

---

## 📄 Licence

Ce projet est sous licence **MIT**.  
Consultez le fichier `LICENSE` pour plus d’informations.
