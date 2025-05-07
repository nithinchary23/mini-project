// Simple script to reset the database schema and run seed data
const { execSync } = require('child_process');

console.log('Dropping database tables...');
try {
  // For local development - drop and recreate tables based on schema
  execSync('npx drizzle-kit drop --force', { stdio: 'inherit' });
  console.log('Tables dropped successfully.');
  
  console.log('Pushing updated schema...');
  execSync('npx drizzle-kit push', { stdio: 'inherit' });
  console.log('Schema updated successfully.');
  
  console.log('Seeding database...');
  execSync('node db/local-seed.js', { stdio: 'inherit' });
  console.log('Database seeded successfully!');

} catch (error) {
  console.error('Error in database operations:', error);
  process.exit(1);
}