# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json si existe)
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install --production

# Luego copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]
