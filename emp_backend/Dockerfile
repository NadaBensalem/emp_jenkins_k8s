# Utiliser l'image officielle Maven-openjdk comme étape de construction
FROM maven:3.8.4-openjdk-17 AS build

# Définir le répertoire de travail à /app dans le conteneur
WORKDIR /app

# Copier le fichier pom.xml et le répertoire src dans le conteneur
COPY pom.xml .
COPY src ./src

# Construire l'application
# 'mvn clean install' nettoie le projet et installe les dépendances
# création du fichier .jar 
# '-DskipTests' est utilisé pour ignorer les tests pendant la construction
RUN mvn clean install -DskipTests


# Utiliser l'image officielle OpenJDK comme étape d'exécution
#FROM openjdk:17-jdk-alpine
FROM eclipse-temurin:17-jdk-jammy
# Définir le répertoire de travail à /app dans le conteneur
WORKDIR /app

# Copier le fichier JAR exécutable de l'étape de construction à l'étape d'exécution
# '/app/target/emp_backend-0.0.1-SNAPSHOT.jar' est le fichier JAR généré par Maven
COPY --from=build /app/target/emp_backend-0.0.1-SNAPSHOT.jar .

# Exposer le port sur lequel l'application sera à l'écoute (documentation)
# '8050' 
EXPOSE 8050

# Définir la variable d'environnement pour activer le profil 'docker'
ENV SPRING_PROFILES_ACTIVE=docker

# Définir la commande pour exécuter l'application
# 'java -jar' est utilisé pour lancer l'application JAR
CMD ["java", "-jar", "emp_backend-0.0.1-SNAPSHOT.jar"]

