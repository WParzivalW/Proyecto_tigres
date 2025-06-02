<template>
  <v-container class="fill-height bg-grey-lighten-4">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="px-6 py-8 rounded-lg">
          <!-- Logo y título -->
          <div class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold mb-2">Edmodo</h1>
            <h2 class="text-h6 font-weight-medium text-grey-darken-1">Iniciar sesión</h2>
          </div>
          
          <!-- Alertas de error -->
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            class="mb-4"
            density="compact"
          >
            {{ error }}
          </v-alert>
          
          <!-- Formulario de login -->
          <v-form @submit.prevent="iniciarSesion">
            <v-text-field
              v-model="correo"
              label="Correo electrónico"
              variant="outlined"
              placeholder="nombre@ejemplo.com"
              type="email"
              :rules="[
                v => !!v || 'El correo es requerido',
                v => /.+@.+\..+/.test(v) || 'Correo inválido'
              ]"
              class="mb-2"
            ></v-text-field>
            
            <v-text-field
              v-model="contraseña"
              label="Contraseña"
              variant="outlined"
              placeholder="Ingresa tu contraseña"
              :append-inner-icon="mostrarContraseña ? 'mdi-eye-off' : 'mdi-eye'"
              :type="mostrarContraseña ? 'text' : 'password'"
              @click:append-inner="mostrarContraseña = !mostrarContraseña"
              :rules="[v => !!v || 'La contraseña es requerida']"
              class="mb-3"
            ></v-text-field>
            
            <!-- Botón de inicio de sesión -->
            <v-btn
              type="submit"
              color="#10a37f" 
              size="large"
              block
              class="mt-4 mb-3 text-white font-weight-medium"
              :loading="cargando"
            >
              Iniciar sesión
            </v-btn>
            
            <!-- Opciones adicionales -->
            <div class="d-flex justify-space-between align-center my-3">
              <v-checkbox
                v-model="recordarme"
                label="Recordarme"
                density="compact"
                hide-details
              ></v-checkbox>
              
              <v-btn
                variant="text"
                color="#10a37f"
                class="text-none"
                density="comfortable"
              >
                ¿Olvidaste tu contraseña?
              </v-btn>
            </div>
            
            <!-- Separador -->
            <v-divider class="my-4"></v-divider>
            
            <!-- Botón para crear cuenta -->
            <div class="text-center">
              <p class="text-body-2 text-grey-darken-1 mb-3">
                ¿No tienes una cuenta?
              </p>
              <v-btn
                variant="outlined"
                color="#10a37f"
                block
                class="font-weight-medium"
                @click="$router.push('/register')"
              >
                Crear cuenta
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const correo = ref('');
const contraseña = ref('');
const mostrarContraseña = ref(false);
const recordarme = ref(false);
const cargando = ref(false);
const error = ref('');
const usuarios = ref([]);

onMounted(() => {
  const storedUsers = JSON.parse(localStorage.getItem('usuarios') || '[]');
  usuarios.value = storedUsers;
  console.log('Usuarios guardados:', usuarios.value);
});

function iniciarSesion() {
  if (!correo.value || !contraseña.value) {
    error.value = 'Por favor ingresa tu correo y contraseña';
    return;
  }
  
  cargando.value = true;
  error.value = '';
  
  setTimeout(() => {
    const usuarioEncontrado = usuarios.value.find(usuario => 
      usuario.correo === correo.value && usuario.contraseña === contraseña.value
    );

    if (usuarioEncontrado) {
      localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
      router.push('/home'); 
    } else {
      router.push('/home'); 
    }
    
    cargando.value = false;
  }, 800);
}
</script>

<style scoped>
/* El color verde característico de ChatGPT */
:deep(.v-btn.text-white) {
  background-color: #10a37f !important;
}
:deep(.v-btn.text-white:hover) {
  background-color: #0d8c6e !important;
}
</style>