const fs = require('fs')

fs.copyFileSync('.env', './packages/server/.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
