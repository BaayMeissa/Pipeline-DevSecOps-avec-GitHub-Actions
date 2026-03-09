FROM node:22-alpine
WORKDIR /app

# Ajuste ici : si tes fichiers sont à la racine, enlève "src/"
COPY package*.json ./

# Si ça plante toujours, essaie "npm install --omit=dev" 
# au lieu de "npm ci" pour tester
RUN npm ci --only=production && npm cache clean --force

# Copie le reste du code
COPY . . 

# Gestion de l'utilisateur
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs
EXPOSE 3000

# Correction de la syntaxe Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "server.js"]