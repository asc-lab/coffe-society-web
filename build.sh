set -e
npm install
npm run build
docker build -t csms/coffee-society-web:latest .
