# Pharos Backend on Raspberry Pi

Backend on Raspberry Pi to control calendar on Pharos LPC

## Initialisation :

pm2 kill
cd --
rm -r pharos_backend
git clone https://github.com/ATCBGroup/pharos_backend.git
cd pharos_backend
npm i
pm2 start index.js
pm2 startup systemd
