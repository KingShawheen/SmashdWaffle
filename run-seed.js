require('dotenv').config({ path: '.env.local' });
const { seedMenuData } = require('./src/lib/seed.js');

seedMenuData()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
