# Guía de Postman - Sistema Universitario

## Pasos para configurar Postman

### 1. **Importar la Colección y Entorno**
   - Abre Postman
   - Ve a **File → Import**
   - Selecciona el archivo `Sistema-Universitario.postman_collection.json`
   - Importa el archivo `Sistema-Universitario.postman_environment.json` de la misma manera

### 2. **Seleccionar el Entorno**
   - En la parte superior derecha de Postman, verifica que esté seleccionado **"Sistema Universitario"**
   - Esto asegura que se usen las variables correctas (base_url, token, etc.)

### 3. **Flujo Recomendado de Pruebas**

#### **Paso 1: Registro de Usuario**
1. Ve a **Auth → Register**
2. Modifica los datos de email y password si es necesario
3. Haz clic en **Send**
4. Deberías recibir un código 201 o 200

#### **Paso 2: Login**
1. Ve a **Auth → Login**
2. Usa el mismo email y password del registro
3. Haz clic en **Send**
4. El token se guardará automáticamente en la variable `{{token}}` gracias al script de test

#### **Paso 3: Verificar Perfil**
1. Ve a **Auth → Get Profile**
2. Haz clic en **Send**
3. Deberías ver tu información de usuario

#### **Paso 4: Crear una Carrera**
1. Ve a **Carreras → Create Carrera**
2. Modifica los datos si es necesario
3. Haz clic en **Send**
4. Guarda el ID de la carrera en la variable `carrera_id`

#### **Paso 5: Crear Estudiante**
1. Ve a **Estudiantes → Create Estudiante**
2. Modifica los datos del estudiante
3. Haz clic en **Send**
4. Guarda el ID en la variable `estudiante_id`

#### **Paso 6: Crear Docente**
1. Ve a **Docentes → Create Docente**
2. Modifica los datos del docente
3. Haz clic en **Send**
4. Guarda el ID en la variable `docente_id`

#### **Paso 7: Crear Materia**
1. Ve a **Materias → Create Materia**
2. Modifica los datos de la materia
3. Haz clic en **Send**
4. Guarda el ID en la variable `materia_id`

#### **Paso 8: Crear Ciclo**
1. Ve a **Ciclos → Create Ciclo**
2. Modifica los datos del ciclo
3. Haz clic en **Send**
4. Guarda el ID en la variable `ciclo_id`

#### **Paso 9: Crear Matrícula**
1. Ve a **Matriculas → Create Matricula**
2. Usa los IDs guardados de estudiante, ciclo y materia
3. Haz clic en **Send**

### 4. **Otras Operaciones**

#### **Obtener Todos los Registros**
- **Carreras → Get All Carreras**
- **Estudiantes → Get All Estudiantes**
- **Docentes → Get All Docentes**
- **Materias → Get All Materias**
- **Ciclos → Get All Ciclos**
- **Matriculas → Get All Matriculas**

#### **Obtener un Registro por ID**
- Usa los endpoints "Get by ID" con los IDs guardados

#### **Actualizar Registros**
- Usa los endpoints "Update" (PATCH) para modificar datos
- Asegúrate de incluir el token en el header

#### **Eliminar Registros**
- Usa los endpoints "Delete" (DELETE) para eliminar
- Asegúrate de incluir el token en el header

## Variables de Entorno

Las siguientes variables se actualizan automáticamente o pueden modificarse:

| Variable | Valor Inicial | Descripción |
|----------|--------------|-------------|
| `base_url` | `http://localhost:3000` | URL base de la API |
| `token` | (vacío) | Token JWT (se llena automáticamente al hacer login) |
| `usuario_id` | (vacío) | ID del usuario (se llena al hacer login) |
| `carrera_id` | `1` | ID de la carrera (actualiza después de crear) |
| `estudiante_id` | `1` | ID del estudiante (actualiza después de crear) |
| `docente_id` | `1` | ID del docente (actualiza después de crear) |
| `materia_id` | `1` | ID de la materia (actualiza después de crear) |
| `ciclo_id` | `1` | ID del ciclo (actualiza después de crear) |

## Cómo Actualizar Variables de Entorno

### Opción 1: Manualmente
1. Haz clic en el botón de **ambiente** (arriba a la derecha)
2. Selecciona **Sistema Universitario**
3. Edita el valor de la variable

### Opción 2: Con Scripts (Automático)
- El endpoint de Login ya tiene un script que actualiza `{{token}}` y `{{usuario_id}}` automáticamente
- Puedes agregar scripts similares a otros endpoints si lo deseas

## Notas Importantes

⚠️ **Asegúrate de:**
- Tener tu servidor NestJS ejecutándose en `http://localhost:3000`
- Usar las variables de entorno correctas en tu `.env`
- Hacer login antes de usar endpoints que requieren autenticación
- Guardar los IDs de los registros creados para usarlos en siguientes operaciones

## Solución de Problemas

### Error 401 (Unauthorized)
- El token ha expirado o es inválido
- Ejecuta nuevamente **Auth → Login**

### Error 404 (Not Found)
- El recurso no existe
- Verifica que el ID sea correcto y que el registro haya sido creado

### Error 500 (Internal Server Error)
- Hay un problema en el servidor
- Revisa los logs de tu aplicación NestJS

### Error de Conexión
- Verifica que el servidor esté ejecutándose
- Comprueba que `base_url` sea correcto
