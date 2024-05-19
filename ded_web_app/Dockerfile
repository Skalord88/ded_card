# Usa l'immagine ufficiale di Node.js
FROM node:16-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file dell'applicazione
COPY . .

# Esponi la porta 3000
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["npm", "start"]