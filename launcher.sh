sudo apt-get install redis-server
sudo systemctl enable redis-server.service

cd transactions-client
npm install
npm run serve &

cd ..

cd transactions-server
npm install
npm start &

ENDSSH