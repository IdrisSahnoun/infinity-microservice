
# 🏋️ Microservice - Gestion des Plans d'Entraînement

![Build](https://img.shields.io/badge/build-passing-brightgreen) 
![License](https://img.shields.io/badge/license-MIT-blue)

Ce microservice fait partie d'une architecture distribuée et gère uniquement les **plans d'entraînement**.  
Il permet la création, la modification, la suppression et la consultation des plans.  
Une interface Angular permet de manipuler les données côté front-office et back-office.

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
- Gérer les plans d'entraînement (titre, description, durée, état actif/inactif).
- Trier, filtrer et rechercher des plans.
- Accéder à des statistiques (nombre total, durée moyenne, min, max).

---

## ⚙️ Fonctionnalités

### ✅ Gestion des Plans d'Entraînement
- Ajouter, modifier, supprimer, activer/désactiver un plan.
- Affichage sous forme de tableau avec tri et recherche.
- Statistiques dynamiques calculées côté backend.

---

## 🧰 Technologies Utilisées

### Back-End
- **Langage** : Java 17  
- **Framework** : Spring Boot  
- **Base de Données** : MySQL / H2 (tests)  
- **Documentation API** : Swagger/OpenAPI  
- **Tests** : JUnit, Mockito, MockMvc  
- **Communication** : REST  

### Front-End
- **Framework** : Angular  
- **Outils** : NgModel, HttpClient, Component Services  
- **Style** : SCSS

---

## 🚀 Installation

### Prérequis
- JDK 17 ou supérieur  
- Maven 3.x  
- MySQL  
- Node.js + Angular CLI  
- Un IDE (IntelliJ IDEA, VS Code…)

### Lancer le Back-End
```bash
git clone https://github.com/ton-username/microservice-plans.git
cd microservice-plans
mvn spring-boot:run
```

### Lancer le Front-End
```bash
cd front-office
npm install
ng serve
```

---

## ⚙️ Configuration

### Exemple de `application.properties`
```properties
# Application
spring.application.name=microservice-plans
server.servlet.context-path=/plans
server.port=8084

# Base de données
spring.datasource.url=jdbc:mysql://localhost:3306/plans?createDatabaseIfNotExist=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# (facultatif) Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka
eureka.client.register-with-eureka=true
```

---

## 📡 Endpoints API

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/plans/api/plans` | Récupérer tous les plans |
| POST   | `/plans/api/plans` | Créer un nouveau plan |
| PUT    | `/plans/api/plans/{id}` | Mettre à jour un plan |
| DELETE | `/plans/api/plans/{id}` | Supprimer un plan |
| PATCH  | `/plans/api/plans/{id}/toggle-actif` | Activer / désactiver un plan |
| GET    | `/plans/api/plans/search?keyword=xxx` | Rechercher par mot-clé |
| GET    | `/plans/api/plans/sort?sortBy=titre|duree` | Trier par champ |
| GET    | `/plans/api/plans/stats` | Obtenir les statistiques |

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
Vous pouvez :
- Proposer une amélioration ✨
- Signaler un bug 🐛
- Soumettre une Pull Request 🚀

---

## 📄 Licence

Ce projet est sous licence **MIT**.  
Consultez le fichier `LICENSE` pour plus d’informations.
