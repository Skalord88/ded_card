# FROM openjdk:17-jdk-alpine
# ARG JAR_FILE=target/dadcard-0.0.1-SNAPSHOTjar
# COPY ./target/dadcard-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "app.jar"]

# Usa l'immagine base OpenJDK 17 su Alpine Linux
FROM openjdk:17-jdk-alpine

# Definisci l'argomento per il file JAR, se necessario
ARG JAR_FILE=target/dadcard-0.0.1-SNAPSHOT.jar

# Copia il file JAR nel contenitore come app.jar
COPY ${JAR_FILE} app.jar

# Espone la porta 8080
EXPOSE 8080

# Definisci il comando di avvio dell'applicazione
ENTRYPOINT ["java", "-jar", "app.jar"]
