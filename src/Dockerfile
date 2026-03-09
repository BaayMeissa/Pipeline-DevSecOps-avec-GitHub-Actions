FROM node:25-alpine
WORKDIR /app

# ✅ On copie les fichiers de dépendances (présents dans le même dossier que le Dockerfile)
COPY package.json ./
# On utilise une astuce pour copier le lock s'il existe, sans faire planter si absent
COPY package-lock.json* ./

# ✅ On remplace "npm ci" par "npm install" pour éviter l'erreur de lockfile
RUN npm install --omit=dev && npm cache clean --force

# ✅ On copie le reste du code (server.js, etc.)
COPY . .

# ✅ Sécurité : Utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

# ✅ Healthcheck corrigé
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "server.js"]