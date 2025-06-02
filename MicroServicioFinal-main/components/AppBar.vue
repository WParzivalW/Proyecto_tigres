<!-- AppBar.vue -->
<template>
  <v-app-bar :elevation="2" color="primary">
    <!-- Botón de navegación -->
    <v-app-bar-nav-icon @click="toggleDrawer" aria-label="Abrir menú"></v-app-bar-nav-icon>

    <!-- Título -->
    <v-app-bar-title class="font-weight-bold">EDMODO</v-app-bar-title>

    <v-spacer />

    <!-- Notificaciones -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="mr-2" aria-label="Ver notificaciones">
          <v-badge :content="notificaciones.length" color="error" :model-value="notificaciones.length > 0">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list width="300">
        <v-list-subheader>Notificaciones</v-list-subheader>
        <v-list-item
          v-for="(n, i) in notificaciones"
          :key="i"
          :value="n"
          density="comfortable"
        >
          <v-list-item-title>{{ n.titulo }}</v-list-item-title>
          <v-list-item-subtitle>{{ n.mensaje }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item v-if="notificaciones.length === 0">
          <v-list-item-title>No tienes notificaciones</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Menú de usuario -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" class="d-flex align-center" aria-label="Menú de usuario">
          <v-avatar size="32" class="mr-2" color="grey-lighten-4">
            <v-icon v-if="!usuario.avatar">mdi-account</v-icon>
            <v-img v-else :src="usuario.avatar" alt="Avatar del usuario" />
          </v-avatar>
          <span class="text-white font-weight-medium">{{ usuario.nombre }}</span>
          <v-icon right class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item :prepend-icon="userTypeIcon" :title="userTypeTitle" />
        <v-divider />

        <v-list-item prepend-icon="mdi-account-outline" title="Mi Perfil" @click="irAPerfil" />
        <v-list-item prepend-icon="mdi-cog-outline" title="Configuración" @click="irAConfiguracion" />
        <v-divider />
        <v-list-item prepend-icon="mdi-logout" title="Cerrar Sesión" @click="cerrarSesion" />
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- Drawer lateral -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list-item>
      <template #prepend>
        <v-avatar color="primary">
          <v-icon color="white">mdi-account</v-icon>
        </v-avatar>
      </template>
      <v-list-item-title>{{ usuario.nombre }}</v-list-item-title>
      <v-list-item-subtitle>{{ usuario.email }}</v-list-item-subtitle>
    </v-list-item>

    <v-divider />

    <v-list nav density="compact">
      <v-list-item prepend-icon="mdi-home-outline" title="Inicio" @click="irAInicio" />
      <v-list-item prepend-icon="mdi-book-outline" title="Mis Cursos" @click="irACursos" />

      <template v-if="usuario.tipo === 'estudiante'">
        <v-list-item prepend-icon="mdi-calendar-check-outline" title="Mis Tareas" @click="irATareas" />
        <v-list-item prepend-icon="mdi-chart-line" title="Mi Progreso" @click="irAProgreso" />
      </template>

      <template v-if="usuario.tipo === 'instructor'">
        <v-list-item prepend-icon="mdi-clipboard-text-outline" title="Evaluaciones" @click="irAEvaluaciones" />
        <v-list-item prepend-icon="mdi-account-group-outline" title="Mis Alumnos" @click="irAAlumnos" />
      </template>

      <template v-if="usuario.tipo === 'administrador'">
        <v-list-item prepend-icon="mdi-view-dashboard-outline" title="Panel Admin" @click="irAAdmin" />
        <v-list-item prepend-icon="mdi-file-chart-outline" title="Reportes" @click="irAReportes" />
      </template>

      <v-divider />

      <v-list-item prepend-icon="mdi-help-circle-outline" title="Ayuda" @click="irAAyuda" />
      <v-list-item prepend-icon="mdi-logout" title="Cerrar Sesión" @click="cerrarSesion" />
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn block color="primary" @click="drawer = false">
          Cerrar menú
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <!-- Diálogo de confirmación para cerrar sesión -->
  <v-dialog v-model="dialogoCerrarSesion" max-width="400">
    <v-card>
      <v-card-title class="text-h5">Cerrar sesión</v-card-title>
      <v-card-text>¿Estás seguro de que deseas cerrar tu sesión en EDMODO?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey-darken-1" variant="text" @click="dialogoCerrarSesion = false">Cancelar</v-btn>
        <v-btn color="error" variant="flat" @click="confirmarCerrarSesion">Cerrar sesión</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const drawer = ref(false);
const dialogoCerrarSesion = ref(false);

// Usuario de ejemplo
const usuario = ref({
  nombre: 'Usuario Demo',
  email: 'usuario@edmodo.com',
  tipo: 'estudiante', // 'instructor' | 'administrador'
  avatar: null
});

// Notificaciones
const notificaciones = ref([
  { titulo: 'Nueva tarea', mensaje: 'Se ha publicado una nueva tarea en el curso de Vue.js' },
  { titulo: 'Calificación disponible', mensaje: 'Tu instructor ha calificado tu última entrega' }
]);

// Computed para icono y rol
const userTypeIcon = computed(() => {
  const map = {
    estudiante: 'mdi-school',
    instructor: 'mdi-teach',
    administrador: 'mdi-shield-account'
  };
  return map[usuario.value.tipo] || 'mdi-account';
});

const userTypeTitle = computed(() => {
  const map = {
    estudiante: 'Estudiante',
    instructor: 'Instructor',
    administrador: 'Administrador'
  };
  return map[usuario.value.tipo] || 'Usuario';
});

// Métodos de navegación
const toggleDrawer = () => (drawer.value = !drawer.value);
const irAInicio = () => router.push('/');
const irACursos = () => router.push('/cursos');
const irATareas = () => router.push('/tareas');
const irAProgreso = () => router.push('/progreso');
const irAEvaluaciones = () => router.push('/evaluaciones');
const irAAlumnos = () => router.push('/alumnos');
const irAAdmin = () => router.push('/admin');
const irAReportes = () => router.push('/reportes');
const irAAyuda = () => router.push('/ayuda');
const irAPerfil = () => router.push('/perfil');
const irAConfiguracion = () => router.push('/configuracion');
const cerrarSesion = () => (dialogoCerrarSesion.value = true);
const confirmarCerrarSesion = () => {
  router.push('/login');
  dialogoCerrarSesion.value = false;
};
</script>

<style scoped>
.text-white {
  color: white !important;
}
</style>
