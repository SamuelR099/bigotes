# Usar imagen de Java 17
FROM openjdk:17-jdk-slim

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo JAR desde la carpeta target (asegúrate de cambiar el nombre si es diferente)
COPY target/website-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto de la aplicación
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
