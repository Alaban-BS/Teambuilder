const bcrypt = require('bcryptjs');

async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function main() {
  const adminPassword = '463100';
  const antjanPassword = '036900';

  const adminHash = await generateHash(adminPassword);
  const antjanHash = await generateHash(antjanPassword);

  console.log('Admin password hash:', adminHash);
  console.log('Antjan password hash:', antjanHash);
}

main().catch(console.error); 