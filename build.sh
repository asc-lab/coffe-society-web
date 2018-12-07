set -e
npm install
npm run build
docker build -t coffee-society-web:latest .
