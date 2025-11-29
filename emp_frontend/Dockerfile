# Étape 1 : Étape de construction

# Utilise la version 16.20 de Node.js comme image de base pour l'étape de construction.
FROM node:16.20 AS build

# Définit le répertoire de travail à /app à l'intérieur du conteneur.
WORKDIR /app         

# Copie package.json et package-lock.json dans le répertoire de travail.
COPY package.json package-lock.json . 

# Installe les dépendances npm définies dans le fichier package.json.
RUN npm install       

# Copie le reste du code source du répertoire courant vers le répertoire de travail dans le conteneur.
COPY . .              

# Exécute la construction en production de l'application (env k8s).
RUN npm run build:prod-k8s

# Étape 2 : Étape d'exécution

# Utilise la dernière version de nginx comme image de base pour l'étape d'exécution.
FROM nginx:latest     

# Copie l'application construite de l'étape de construction vers le répertoire de service nginx.
COPY --from=build /app/dist/frontend/ /usr/share/nginx/html/