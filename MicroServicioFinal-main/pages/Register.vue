<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="px-6 py-8 rounded-lg">
          <div class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold mb-2">Edmodo</h1>
            <h2 class="text-h6 font-weight-medium text-grey-darken-1">Crear una cuenta</h2>
          </div>
          
          <v-form @submit.prevent="registrarCuenta">
            <v-alert
              v-if="error"
              type="error"
              variant="tonal"
              class="mb-4"
              density="compact"
            >
              {{ error }}
            </v-alert>
            
            <v-text-field
              v-model="nombre"
              label="Nombre completo"
              variant="outlined"
              placeholder="Ingresa tu nombre completo"
              :rules="[v => !!v || 'El nombre es requerido']"
              class="mb-2"
            ></v-text-field>
            
            <v-text-field
              v-model="correo"
              label="Correo electrónico"
              variant="outlined"
              placeholder="nombre@ejemplo.com"
              :rules="[
                v => !!v || 'El correo es requerido',
                v => /.+@.+\..+/.test(v) || 'Correo inválido'
              ]"
              class="mb-2"
            ></v-text-field>
            
            <v-select
              v-model="idioma"
              label="Idioma"
              variant="outlined"
              :items="idiomas"
              item-title="text"
              item-value="value"
              class="mb-2"
            ></v-select>
            
            <v-text-field
              v-model="contrasena"
              label="Contraseña"
              variant="outlined"
              placeholder="Crea una contraseña segura"
              :append-inner-icon="mostrarContrasena ? 'mdi-eye-off' : 'mdi-eye'"
              :type="mostrarContrasena ? 'text' : 'password'"
              @click:append-inner="mostrarContrasena = !mostrarContrasena"
              :rules="[v => !!v || 'La contraseña es requerida', v => v.length >= 8 || 'Mínimo 8 caracteres']"
              hint="Mínimo 8 caracteres"
              persistent-hint
              class="mb-3"
            ></v-text-field>
            
            <v-btn
              type="submit"
              color="#10a37f" 
              size="large"
              block
              class="mt-4 mb-3 text-white font-weight-medium"
              :loading="cargando"
            >
              Crear cuenta
            </v-btn>
            
            <div class="text-center mt-4">
              <p class="text-body-2 text-grey-darken-1">
                ¿Ya tienes una cuenta?
                <v-btn
                  variant="text"
                  color="#10a37f"
                  class="px-1 text-none font-weight-medium"
                  density="comfortable"
                  to="/login"
                >
                  Iniciar sesión
                </v-btn>
              </p>
            </div>
            
            <v-divider class="my-4"></v-divider>
            <p class="text-caption text-grey text-center">
              Al registrarte, aceptas nuestros 
              <v-btn variant="text" color="#10a37f" class="px-1 text-none text-caption" density="comfortable">
                Términos y condiciones
              </v-btn>
              y
              <v-btn variant="text" color="#10a37f" class="px-1 text-none text-caption" density="comfortable">
                Política de privacidad
              </v-btn>
            </p>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nombre = ref('');
const correo = ref('');
const idioma = ref('');
const contrasena = ref('');
const mostrarContrasena = ref(false);
const error = ref('');
const cargando = ref(false);
const router = useRouter();

const idiomas = [
  { text: 'Español', value: 'es' },
  { text: 'Inglés', value: 'en' },
  { text: 'Francés', value: 'fr' },
  { text: 'Alemán', value: 'de' }
];

function registrarCuenta() {
  if (!nombre.value || !correo.value || !idioma.value || !contrasena.value) {
    error.value = 'Por favor completa todos los campos';
    return;
  }
  
  cargando.value = true;
  
  setTimeout(() => {
    const datos = {
      nombre: nombre.value,
      correo: correo.value,
      idioma: idioma.value,
      contrasena: contrasena.value
    };
    
    localStorage.setItem('usuario', JSON.stringify(datos));
    console.log('Usuario registrado:', datos);
    
    cargando.value = false;
    router.push('/home');
  }, 1000);
}
</script>

<style scoped>
:deep(.v-btn.text-white) {
  background-color: #10a37f !important;
}
:deep(.v-btn.text-white:hover) {
  background-color: #0d8c6e !important;
}
</style>