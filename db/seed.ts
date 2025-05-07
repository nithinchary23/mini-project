import { db } from "./index";
import * as schema from "@shared/schema";
import { faker } from "@faker-js/faker";
import { hash } from "../server/auth/password";

async function seed() {
  try {
    console.log("🌱 Starting seed process...");

    await seedUsers();
    await seedPatients();

    const patients = await db.select().from(schema.patients);
    const patientMap = new Map(patients.map(p => [p.patientId, p.id]));

    await seedTransplantCases(patientMap);
    await seedMonitoringPatients(patientMap);
    await seedMonitoringData();
    await seedPredictionFactors();

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

async function seedUsers() {
  const existingUsers = await db.select().from(schema.users);
  if (existingUsers.length > 0) {
    console.log("👨‍⚕️ Users already exist. Skipping user seeding.");
    return;
  }

  console.log("👨‍⚕️ Seeding users...");
  await db.insert(schema.users).values([
    {
      username: "doctor",
      password: await hash("password"),
      name: "Dr. Sarah Chen",
      title: "Transplant Specialist",
      role: "doctor",
      email: "sarah.chen@xenotransplant.org",
    },
    {
      username: "admin",
      password: await hash("admin123"),
      name: "Admin User",
      title: "System Administrator",
      role: "admin",
      email: "admin@xenotransplant.org",
    },
  ]);
}

async function seedPatients() {
  const existing = await db.select().from(schema.patients);
  if (existing.length > 0) {
    console.log("🧬 Patients already exist. Skipping.");
    return;
  }

  console.log("🧬 Seeding patients...");
  await db.insert(schema.patients).values([
    {
      patientId: "XP-2023-0371",
      name: "John Doe",
      dateOfBirth: "1985-03-15",
      gender: "Male",
      bloodType: "A+",
      medicalHistory: JSON.stringify(["Hypertension", "Type 2 Diabetes"]),
      createdAt: "2023-05-10",
    },
    {
      patientId: "XP-2023-0368",
      name: "Robert Smith",
      dateOfBirth: "1978-11-22",
      gender: "Male",
      bloodType: "O-",
      medicalHistory: JSON.stringify(["Chronic Kidney Disease", "Anemia"]),
      createdAt: "2023-05-08",
    },
    {
      patientId: "XP-2023-0362",
      name: "Alice Parker",
      dateOfBirth: "1990-07-30",
      gender: "Female",
      bloodType: "B+",
      medicalHistory: JSON.stringify(["Hepatitis C", "Fatty Liver Disease"]),
      createdAt: "2023-05-01",
    },
    {
      patientId: "XP-2023-0355",
      name: "Lisa Johnson",
      dateOfBirth: "1982-09-18",
      gender: "Female",
      bloodType: "AB+",
      medicalHistory: JSON.stringify(["COPD", "Former Smoker"]),
      createdAt: "2023-04-25",
    },
    {
      patientId: "XP-2023-0312",
      name: "Maria Garcia",
      dateOfBirth: "1975-05-20",
      gender: "Female",
      bloodType: "A-",
      medicalHistory: JSON.stringify(["Heart Failure", "Arrhythmia"]),
      createdAt: "2023-03-15",
    },
    {
      patientId: "XP-2023-0298",
      name: "Thomas Wilson",
      dateOfBirth: "1968-12-10",
      gender: "Male",
      bloodType: "O+",
      medicalHistory: JSON.stringify(["End-stage Renal Disease", "Hypertension"]),
      createdAt: "2023-03-05",
    },
    {
      patientId: "XP-2023-0287",
      name: "Keisha Johnson",
      dateOfBirth: "1988-02-28",
      gender: "Female",
      bloodType: "AB-",
      medicalHistory: JSON.stringify(["Cirrhosis", "Hepatitis B"]),
      createdAt: "2023-02-20",
    },
  ]);
}

async function seedTransplantCases(patientMap: Map<string, number>) {
  const existing = await db.select().from(schema.transplantCases);
  if (existing.length > 0) {
    console.log("🫀 Transplant cases already exist. Skipping.");
    return;
  }

  console.log("🫀 Seeding transplant cases...");
  await db.insert(schema.transplantCases).values([
    {
      patientId: patientMap.get("XP-2023-0371")!,
      organType: "Heart",
      compatibilityScore: 85,
      status: "Pending Review",
      successful: false,
      createdAt: new Date("2023-06-10"),
    },
    {
      patientId: patientMap.get("XP-2023-0368")!,
      organType: "Kidney",
      compatibilityScore: 72,
      status: "Pending Review",
      successful: false,
      createdAt: new Date("2023-06-05"),
    },
    {
      patientId: patientMap.get("XP-2023-0362")!,
      organType: "Liver",
      compatibilityScore: 91,
      status: "Ready for Surgery",
      successful: false,
      createdAt: new Date("2023-05-28"),
    },
    {
      patientId: patientMap.get("XP-2023-0355")!,
      organType: "Lung",
      compatibilityScore: 63,
      status: "Pending Review",
      successful: false,
      createdAt: new Date("2023-05-20"),
    },
  ]);
}

async function seedMonitoringPatients(patientMap: Map<string, number>) {
  const existing = await db.select().from(schema.monitoringPatients);
  if (existing.length > 0) {
    console.log("📊 Monitoring patients already exist. Skipping.");
    return;
  }

  console.log("📊 Seeding monitoring patients...");
  await db.insert(schema.monitoringPatients).values([
    {
      patientId: patientMap.get("XP-2023-0312")!,
      transplantDate: new Date("2023-05-03"),
      organType: "Heart",
      organFunctionValue: 94,
      immuneStatus: "Stable",
      createdAt: new Date("2023-05-03"),
    },
    {
      patientId: patientMap.get("XP-2023-0298")!,
      transplantDate: new Date("2023-04-18"),
      organType: "Kidney",
      organFunctionValue: 82,
      immuneStatus: "Mild Response",
      createdAt: new Date("2023-04-18"),
    },
    {
      patientId: patientMap.get("XP-2023-0287")!,
      transplantDate: new Date("2023-04-05"),
      organType: "Liver",
      organFunctionValue: 68,
      immuneStatus: "Elevated Response",
      createdAt: new Date("2023-04-05"),
    },
  ]);
}

async function seedMonitoringData() {
  const existing = await db.select().from(schema.monitoringData);
  if (existing.length > 0) {
    console.log("📈 Monitoring data already seeded. Skipping.");
    return;
  }

  console.log("📈 Seeding monitoring data...");
  const patients = await db.select().from(schema.monitoringPatients);
  const values: any[] = [];
  const today = new Date();

  for (const patient of patients) {
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - (30 - i));

      let organFunction = 0;
      let immuneResponse = 0;
      let recoveryIndex = 0;

      if (patient.organType === "Heart") {
        organFunction = 85 + i * 0.3 + (Math.random() * 6 - 3);
        immuneResponse = 4 - i * 0.05 + (Math.random() * 1 - 0.5);
        recoveryIndex = 70 + i * 0.6 + (Math.random() * 4 - 2);
      } else if (patient.organType === "Kidney") {
        organFunction = 75 + i * 0.25 + (Math.random() * 5 - 2.5);
        immuneResponse = 5 - i * 0.08 + (Math.random() * 1.2 - 0.6);
        recoveryIndex = 65 + i * 0.5 + (Math.random() * 5 - 2.5);
      } else {
        organFunction = 75 - i * 0.2 + (Math.random() * 4 - 2);
        immuneResponse = 5 + i * 0.1 + (Math.random() * 1 - 0.5);
        recoveryIndex = 60 + i * 0.2 + (Math.random() * 3 - 1.5);
      }

      values.push({
        patientId: patient.id,
        date,
        organFunctionValue: Math.max(40, Math.min(100, +organFunction.toFixed(1))),
        immuneResponseValue: Math.max(0, Math.min(10, +immuneResponse.toFixed(1))),
        recoveryIndexValue: Math.max(40, Math.min(100, +recoveryIndex.toFixed(1))),
        notes: i % 7 === 0 ? "Regular checkup performed" : undefined,
        createdAt: date,
      });
    }
  }

  const batchSize = 50;
  for (let i = 0; i < values.length; i += batchSize) {
    const batch = values.slice(i, i + batchSize);
    await db.insert(schema.monitoringData).values(batch);
  }
}

async function seedPredictionFactors() {
  const existing = await db.select().from(schema.predictionFactors);
  if (existing.length > 0) {
    console.log("📊 Prediction factors already exist. Skipping.");
    return;
  }

  console.log("📊 Seeding prediction factors...");
  await db.insert(schema.predictionFactors).values([
    { name: "Genetic Compatibility", importance: 34, createdAt: new Date() },
    { name: "Immune Response Profile", importance: 28, createdAt: new Date() },
    { name: "Organ Vitality Score", importance: 22, createdAt: new Date() },
    { name: "Pre-Op Risk Score", importance: 16, createdAt: new Date() },
  ]);
}

seed();
