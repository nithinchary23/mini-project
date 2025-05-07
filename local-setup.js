// local-setup.js (ESM-compatible)
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the .env content
const envContent = `DATABASE_URL=postgres://postgres:password123@localhost:5432/xenotransplant
SESSION_SECRET=xenotransplant-secret-key`;

// Write to .env in the project root
const envPath = join(__dirname, '.env');
writeFileSync(envPath, envContent);

console.log('✅ Created .env file with required environment variables');
