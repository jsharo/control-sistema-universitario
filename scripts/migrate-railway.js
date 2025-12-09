#!/usr/bin/env node

/**
 * Script de ayuda para migración de Prisma a Railway
 * 
 * Uso:
 *   node scripts/migrate-railway.js --help
 *   node scripts/migrate-railway.js push
 *   node scripts/migrate-railway.js migrate
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) {
        log('❌ Error: Archivo .env no encontrado', 'red');
        log('Por favor crea un archivo .env basado en .env.example', 'yellow');
        log('Ejecuta: cp .env.example .env', 'cyan');
        process.exit(1);
    }

    // Verificar que las variables necesarias existen
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const requiredVars = [
        'DATABASE_URL_AUTH',
        'DATABASE_URL_ACADEMICO',
        'DATABASE_URL_GESTION'
    ];

    const missingVars = requiredVars.filter(varName => {
        return !envContent.includes(`${varName}=`) ||
            envContent.includes(`${varName}=postgresql://user:password`);
    });

    if (missingVars.length > 0) {
        log('❌ Error: Variables de entorno faltantes o no configuradas:', 'red');
        missingVars.forEach(v => log(`  - ${v}`, 'yellow'));
        log('\nPor favor configura estas variables en tu archivo .env', 'yellow');
        process.exit(1);
    }

    log('✅ Archivo .env configurado correctamente', 'green');
}

function runCommand(command, description) {
    log(`\n🔄 ${description}...`, 'cyan');
    try {
        execSync(command, { stdio: 'inherit' });
        log(`✅ ${description} completado`, 'green');
        return true;
    } catch (error) {
        log(`❌ Error en: ${description}`, 'red');
        return false;
    }
}

function pushToRailway() {
    log('\n🚀 Iniciando migración con Prisma DB Push...', 'bright');
    log('Este método sincroniza el schema directamente sin crear archivos de migración.\n', 'yellow');

    checkEnvFile();

    const schemas = ['auth', 'academico', 'gestion'];
    let success = true;

    for (const schema of schemas) {
        if (!runCommand(`npm run prisma:push:${schema}`, `Push de schema ${schema}`)) {
            success = false;
            break;
        }
    }

    if (success) {
        log('\n🎉 ¡Migración completada exitosamente!', 'green');
        log('Ahora genera los clientes de Prisma con: npm run prisma:gen:all', 'cyan');
    } else {
        log('\n❌ La migración falló. Revisa los errores anteriores.', 'red');
        process.exit(1);
    }
}

function migrateToRailway() {
    log('\n🚀 Iniciando migración con Prisma Migrate...', 'bright');
    log('Este método aplica las migraciones existentes a Railway.\n', 'yellow');

    checkEnvFile();

    // Verificar que existen carpetas de migraciones
    const schemas = ['auth', 'academico', 'gestion'];
    const missingMigrations = [];

    for (const schema of schemas) {
        const migrationPath = path.join(__dirname, '..', 'prisma', schema, 'migrations');
        if (!fs.existsSync(migrationPath) || fs.readdirSync(migrationPath).length === 0) {
            missingMigrations.push(schema);
        }
    }

    if (missingMigrations.length > 0) {
        log('⚠️  Advertencia: No se encontraron migraciones para:', 'yellow');
        missingMigrations.forEach(s => log(`  - ${s}`, 'yellow'));
        log('\nDebes crear las migraciones primero con:', 'yellow');
        missingMigrations.forEach(s => {
            log(`  npm run prisma:migrate:dev:${s}`, 'cyan');
        });
        process.exit(1);
    }

    let success = true;
    for (const schema of schemas) {
        if (!runCommand(`npm run prisma:migrate:deploy:${schema}`, `Deploy de migraciones ${schema}`)) {
            success = false;
            break;
        }
    }

    if (success) {
        log('\n🎉 ¡Migración completada exitosamente!', 'green');
        log('Ahora genera los clientes de Prisma con: npm run prisma:gen:all', 'cyan');
    } else {
        log('\n❌ La migración falló. Revisa los errores anteriores.', 'red');
        process.exit(1);
    }
}

function createMigrations() {
    log('\n📝 Creando migraciones de desarrollo...', 'bright');
    log('Se te pedirá un nombre para cada migración.\n', 'yellow');

    checkEnvFile();

    const schemas = ['auth', 'academico', 'gestion'];
    let success = true;

    for (const schema of schemas) {
        log(`\n📋 Creando migración para: ${schema}`, 'cyan');
        if (!runCommand(`npm run prisma:migrate:dev:${schema}`, `Migración de ${schema}`)) {
            success = false;
            break;
        }
    }

    if (success) {
        log('\n🎉 ¡Migraciones creadas exitosamente!', 'green');
        log('Ahora puedes aplicarlas a Railway con: node scripts/migrate-railway.js migrate', 'cyan');
    } else {
        log('\n❌ La creación de migraciones falló.', 'red');
        process.exit(1);
    }
}

function showHelp() {
    log('\n📖 Script de Migración a Railway\n', 'bright');
    log('Uso:', 'cyan');
    log('  node scripts/migrate-railway.js [comando]\n');

    log('Comandos disponibles:', 'cyan');
    log('  push       - Sincroniza schemas directamente (rápido, sin archivos de migración)');
    log('  migrate    - Aplica migraciones existentes (requiere archivos de migración)');
    log('  create     - Crea nuevas migraciones de desarrollo');
    log('  help       - Muestra esta ayuda\n');

    log('Ejemplos:', 'cyan');
    log('  node scripts/migrate-railway.js push');
    log('  node scripts/migrate-railway.js migrate');
    log('  node scripts/migrate-railway.js create\n');

    log('Notas:', 'yellow');
    log('  - Asegúrate de tener configurado tu archivo .env');
    log('  - Para desarrollo rápido, usa "push"');
    log('  - Para producción con control de versiones, usa "migrate"\n');
}

// Procesar argumentos
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'push':
        pushToRailway();
        break;
    case 'migrate':
        migrateToRailway();
        break;
    case 'create':
        createMigrations();
        break;
    case 'help':
    case '--help':
    case '-h':
        showHelp();
        break;
    default:
        log('❌ Comando no reconocido\n', 'red');
        showHelp();
        process.exit(1);
}
