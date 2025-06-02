<!-- Layout principal que incluye la barra de navegación -->

<template>
    <v-app>
      <!-- Barra de navegación global -->
      <AppBar />
      
      <!-- Contenido principal que cambia según la ruta -->
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
      
      <!-- Footer global -->
      <v-footer app color="primary" class="px-4 py-2">
        <div class="text-white text-caption">
          {{ new Date().getFullYear() }} — <strong>EDMODO</strong> — Plataforma educativa
        </div>
        <v-spacer></v-spacer>
        <div class="text-white text-caption">
          <router-link to="/terminos" class="text-white text-decoration-none mr-4">Términos</router-link>
          <router-link to="/privacidad" class="text-white text-decoration-none mr-4">Privacidad</router-link>
          <router-link to="/ayuda" class="text-white text-decoration-none">Ayuda</router-link>
        </div>
      </v-footer>
      
      <!-- Snackbar para notificaciones del sistema -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.text }}
        
        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="snackbar.show = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </template>
  
  <script setup>
  import { ref, provide } from 'vue';
  import AppBar from './components/AppBar.vue';
  
  // Estado del snackbar para notificaciones
  const snackbar = ref({
    show: false,
    text: '',
    color: 'info',
    timeout: 3000
  });
  
  // Función para mostrar notificaciones en toda la aplicación
  const mostrarNotificacion = (texto, tipo = 'info', duracion = 3000) => {
    snackbar.value.text = texto;
    snackbar.value.color = tipo;
    snackbar.value.timeout = duracion;
    snackbar.value.show = true;
  };
  
  // Proporcionar la función de notificación a todos los componentes hijos
  provide('mostrarNotificacion', mostrarNotificacion);
  </script>
  
  <style>
  /* Estilos globales de la aplicación */
  .v-application {
    font-family: 'Roboto', sans-serif;
  }
  
  /* Estilo para links en el footer */
  .v-footer a:hover {
    text-decoration: underline !important;
    opacity: 0.8;
  }
  </style>