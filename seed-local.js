import pkg from 'pg';
const { Pool } = pkg;
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import 'dotenv/config';

const scryptAsync = promisify(scrypt);

// Hash password function
async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function seed() {
  try {
    console.log("Starting database seed...");
    
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        "firstName" TEXT,
        "lastName" TEXT,
        role TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        "patientId" TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        "bloodType" TEXT NOT NULL,
        weight INTEGER,
        "organType" TEXT,
        status TEXT NOT NULL,
        "compatibilityScore" INTEGER,
        "rejectionRisk" INTEGER,
        "registrationDate" TEXT,
        "scheduledDate" TEXT,
        "transplantDate" TEXT,
        "primaryPhysician" TEXT,
        notes TEXT,
        "medicalHistory" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Check if users exist
    const userResult = await pool.query('SELECT COUNT(*) FROM users');
    const userCount = parseInt(userResult.rows[0].count);
    
    if (userCount === 0) {
      console.log("Seeding user accounts...");
      
      // Create demo doctor account
      const hashedPassword = await hashPassword("password123");
      
      await pool.query(`
        INSERT INTO users (username, password, "firstName", "lastName", role)
        VALUES 
          ('doctor', $1, 'Sarah', 'Reynolds', 'doctor'),
          ('surgeon', $1, 'Michael', 'Wong', 'surgeon')
      `, [hashedPassword]);
      
      console.log("Users seeded successfully!");
    } else {
      console.log(`Found ${userCount} existing users, skipping user seed.`);
    }
    
    // Check if patients exist
    const patientResult = await pool.query('SELECT COUNT(*) FROM patients');
    const patientCount = parseInt(patientResult.rows[0].count);
    
    if (patientCount === 0) {
      console.log("Seeding patients data...");
      
      // Pending transplant patients
      await pool.query(`
        INSERT INTO patients 
          ("patientId", name, age, "bloodType", weight, "organType", status, 
           "compatibilityScore", "rejectionRisk", "registrationDate", "scheduledDate", 
           "transplantDate", "primaryPhysician", notes, "medicalHistory")
        VALUES 
          ('#PT-7842', 'Robert Chen', 54, 'O+', 78, 'Kidney', 'pending', 
           86, 0, 'May 15, 2023', 'September 18, 2023', 
           NULL, 'Dr. Sarah Reynolds', 'Patient has consistent blood work results and is responding well to dialysis treatment.', $1),
          
          ('#PT-5621', 'Maria Gonzalez', 42, 'A-', 65, 'Heart', 'pending', 
           72, 0, 'June 3, 2023', 'October 5, 2023',
           NULL, 'Dr. Michael Wong', 'Patient showing moderate symptoms of heart failure.', NULL),
           
          ('#PT-3984', 'James Wilson', 61, 'B+', 82, 'Liver', 'pending', 
           58, 0, 'July 12, 2023', 'September 22, 2023',
           NULL, 'Dr. Sarah Reynolds', 'Patient has advanced cirrhosis.', NULL)
      `, [JSON.stringify([
        {
          date: "Feb 12, 2023",
          event: "Kidney failure diagnosis",
          details: "End-Stage Renal Disease - Creatinine 5.2 mg/dL"
        },
        {
          date: "Mar 1, 2023",
          event: "Started Hemodialysis treatment",
          details: "3 times weekly, 4-hour sessions"
        }
      ])]);
      
      // Post-transplant patients
      await pool.query(`
        INSERT INTO patients 
          ("patientId", name, age, "bloodType", weight, "organType", status, 
           "compatibilityScore", "rejectionRisk", "registrationDate", "scheduledDate", 
           "transplantDate", "primaryPhysician", notes, "medicalHistory")
        VALUES 
          ('#PT-2356', 'Sarah Johnson', 48, 'AB+', 62, 'Kidney', 'post-transplant', 
           94, 12, 'March 5, 2023', NULL, 
           'June 12, 2023', 'Dr. Sarah Reynolds', 'Patient recovering well after transplant.', NULL),
          
          ('#PT-4182', 'David Kim', 39, 'O-', 75, 'Lung', 'post-transplant', 
           78, 38, 'April 22, 2023', NULL, 
           'July 30, 2023', 'Dr. Michael Wong', 'Some signs of mild infection.', NULL),
           
          ('#PT-1935', 'Emily Parker', 52, 'A+', 68, 'Heart', 'post-transplant', 
           65, 74, 'May 10, 2023', NULL, 
           'August 15, 2023', 'Dr. Sarah Reynolds', 'Evidence of potential rejection noted.', NULL)
      `);
      
      console.log("Patients seeded successfully!");
    } else {
      console.log(`Found ${patientCount} existing patients, skipping patient seed.`);
    }
    
    console.log("Database seed completed successfully!");
  
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close the pool connection when done
    await pool.end();
  }
}

seed();