// scripts/setup-db.js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && !key.startsWith('#') && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/"/g, '');
        process.env[key] = value;
      }
    });
  }
}

function copySchema(type) {
  const sourceSchema = path.join(__dirname, '..', 'templates', 'prisma', `schema.${type}.template`);
  const targetSchema = path.join(__dirname, '..', 'prisma', 'schema.prisma');
  
  try {
    if (fs.existsSync(sourceSchema)) {
      const schemaContent = fs.readFileSync(sourceSchema, 'utf8');
      fs.writeFileSync(targetSchema, schemaContent);
      console.log(`✅ Using ${type} database schema`);
      return true;
    } else {
      console.error(`❌ Schema template not found: ${sourceSchema}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error copying ${type} schema:`, error.message);
    return false;
  }
}

// Load environment variables first
loadEnvFile();

// Determine which database to use based on environment
function setupDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  
  // Check if DATABASE_URL is set to a valid PostgreSQL URL
  if (databaseUrl && 
      databaseUrl.startsWith('postgresql://') && 
      !databaseUrl.includes('username:password@localhost')) {
    console.log('✅ PostgreSQL URL detected - using PostgreSQL schema');
    return copySchema('postgresql') ? 'postgresql' : 'sqlite';
  } else {
    console.log('⚠️  No valid PostgreSQL URL - falling back to SQLite');
    return copySchema('sqlite') ? 'sqlite' : null;
  }
}

// Run the setup
const dbType = setupDatabase();

if (!dbType) {
  console.error('❌ Database setup failed');
  process.exit(1);
}

console.log(`🚀 Database setup complete - using ${dbType}`);

// Run prisma generate to update the client
exec('npx prisma generate', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error generating Prisma client:', error.message);
    process.exit(1);
  }
  console.log('✅ Prisma client generated successfully');
  
  // If using SQLite, ensure the database exists
  if (dbType === 'sqlite') {
    exec('npx prisma db push', (error, stdout, stderr) => {
      if (error) {
        console.warn('⚠️  Warning: Could not push SQLite schema, but this is okay for development');
      } else {
        console.log('✅ SQLite database ready');
      }
    });
  }
});
