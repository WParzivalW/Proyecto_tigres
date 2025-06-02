<!-- Card.vue -->
<template>
    <v-card 
      class="mx-auto my-4" 
      max-width="400" 
      :variant="cardVariant" 
      :color="cardColor"
    >
      <v-card-title>{{ cardTitle }}</v-card-title>
      <v-card-subtitle>{{ cardSubtitle }}</v-card-subtitle>
      
      <v-card-text>
        <div v-if="userType === 'estudiante'">
          <v-progress-linear
            v-model="progressValue"
            color="primary"
            height="25"
          >
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}% completado</strong>
            </template>
          </v-progress-linear>
          
          <v-list class="mt-4">
            <v-list-item v-for="(actividad, index) in actividades" :key="index">
              <v-list-item-title>{{ actividad.nombre }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip :color="getStatusColor(actividad.estado)" size="small">
                  {{ actividad.estado }}
                </v-chip>
                <span class="ml-2" v-if="actividad.calificacion">{{ actividad.calificacion }}/100</span>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>
        
        <div v-else-if="userType === 'administrador'">
          <v-sheet class="pa-4 mb-4">
            <h3 class="mb-2">Estadísticas del curso</h3>
            <div class="d-flex justify-space-between align-center mb-2">
              <span>Tasa de aprobación:</span>
              <span class="font-weight-bold">{{ estadisticasCurso.tasaAprobacion }}%</span>
            </div>
            <div class="d-flex justify-space-between align-center mb-2">
              <span>Promedio general:</span>
              <span class="font-weight-bold">{{ estadisticasCurso.promedioGeneral }}/100</span>
            </div>
            <div class="d-flex justify-space-between align-center mb-2">
              <span>Actividades completadas:</span>
              <span class="font-weight-bold">{{ estadisticasCurso.actividadesCompletadas }}%</span>
            </div>
          </v-sheet>
          
          <v-progress-circular
            :model-value="estadisticasCurso.tasaAprobacion"
            color="success"
            size="100"
            width="10"
            class="ma-2"
          >
            {{ estadisticasCurso.tasaAprobacion }}%
          </v-progress-circular>
        </div>
        
        <div v-else-if="userType === 'instructor'">
          <v-list>
            <v-list-subheader>Estudiantes con actividades pendientes</v-list-subheader>
            <v-list-item v-for="(estudiante, index) in estudiantesPendientes" :key="index">
              <v-list-item-title>{{ estudiante.nombre }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ estudiante.actividadesPendientes }} actividades pendientes
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          
          <v-divider class="my-2"></v-divider>
          
          <div class="d-flex justify-space-between mt-2">
            <div>
              <div class="text-subtitle-1">Promedio del grupo</div>
              <div class="text-h6">{{ promedioGrupo }}/100</div>
            </div>
            <div>
              <div class="text-subtitle-1">Tasa de completitud</div>
              <div class="text-h6">{{ tasaCompletitud }}%</div>
            </div>
          </div>
        </div>
      </v-card-text>
      
      <v-card-actions>
        <v-btn
          block
          :color="buttonColor"
          @click="generarReporte"
        >
          {{ buttonText }}
          <v-icon class="ml-2">mdi-file-pdf-box</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
    userType: {
      type: String,
      required: true,
      validator: (value) => ['estudiante', 'administrador', 'instructor'].includes(value)
    },
    cursoId: {
      type: String,
      default: ''
    },
    estudianteId: {
      type: String,
      default: ''
    }
  });
  
  const router = useRouter();
  
  // Datos simulados (en producción estos vendrían de una API)
  const progressValue = ref(68);
  const actividades = ref([
    { nombre: 'Módulo 1: Introducción', estado: 'Completado', calificacion: 85 },
    { nombre: 'Módulo 2: Fundamentos', estado: 'Completado', calificacion: 92 },
    { nombre: 'Módulo 3: Aplicación', estado: 'En progreso', calificacion: null },
    { nombre: 'Módulo 4: Avanzado', estado: 'Pendiente', calificacion: null },
  ]);
  
  const estadisticasCurso = ref({
    tasaAprobacion: 76,
    promedioGeneral: 82,
    actividadesCompletadas: 65
  });
  
  const estudiantesPendientes = ref([
    { nombre: 'Ana García', actividadesPendientes: 3 },
    { nombre: 'Luis Pérez', actividadesPendientes: 2 },
    { nombre: 'María Rodríguez', actividadesPendientes: 4 }
  ]);
  
  const promedioGrupo = ref(78);
  const tasaCompletitud = ref(62);
  
  // Valores computados según el tipo de usuario
  const cardVariant = computed(() => {
    switch (props.userType) {
      case 'estudiante': return 'elevated';
      case 'administrador': return 'tonal';
      case 'instructor': return 'outlined';
      default: return 'flat';
    }
  });
  
  const cardColor = computed(() => {
    switch (props.userType) {
      case 'estudiante': return 'primary-container';
      case 'administrador': return 'secondary-container';
      case 'instructor': return 'tertiary-container';
      default: return 'surface-variant';
    }
  });
  
  const cardTitle = computed(() => {
    switch (props.userType) {
      case 'estudiante': return 'Mi Progreso del Curso';
      case 'administrador': return 'Reporte General del Curso';
      case 'instructor': return 'Seguimiento de Estudiantes';
      default: return 'Reporte del Curso';
    }
  });
  
  const cardSubtitle = computed(() => {
    switch (props.userType) {
      case 'estudiante': return 'Visualiza tu avance y calificaciones';
      case 'administrador': return 'Estadísticas y métricas generales';
      case 'instructor': return 'Monitoreo de actividades y evaluaciones';
      default: return '';
    }
  });
  
  const buttonText = computed(() => {
    switch (props.userType) {
      case 'estudiante': return 'Generar mi reporte de avance';
      case 'administrador': return 'Generar reporte completo del curso';
      case 'instructor': return 'Generar reportes individuales';
      default: return 'Generar reporte';
    }
  });
  
  const buttonColor = computed(() => {
    switch (props.userType) {
      case 'estudiante': return 'primary';
      case 'administrador': return 'secondary';
      case 'instructor': return 'tertiary';
      default: return 'primary';
    }
  });
  
  // Funciones
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Completado': return 'success';
      case 'En progreso': return 'info';
      case 'Pendiente': return 'warning';
      default: return 'grey';
    }
  };
  
  const generarReporte = () => {
    // Aquí dirigimos a la página que contiene la IA generadora de reportes PDF
    router.push({
      name: 'generador-reportes',
      params: { 
        tipo: props.userType,
        cursoId: props.cursoId,
        estudianteId: props.estudianteId 
      }
    });
  };
  
  // En un caso real, aquí cargaríamos los datos desde una API
  onMounted(async () => {
    // Ejemplo de código que podría usarse para cargar datos reales
    // try {
    //   if (props.userType === 'estudiante') {
    //     const response = await fetch(`/api/estudiantes/${props.estudianteId}/progreso/${props.cursoId}`);
    //     const data = await response.json();
    //     progressValue.value = data.progresoTotal;
    //     actividades.value = data.actividades;
    //   } else if (props.userType === 'administrador') {
    //     const response = await fetch(`/api/cursos/${props.cursoId}/estadisticas`);
    //     estadisticasCurso.value = await response.json();
    //   } else if (props.userType === 'instructor') {
    //     const response = await fetch(`/api/cursos/${props.cursoId}/estudiantes-pendientes`);
    //     estudiantesPendientes.value = await response.json();
    //     const statsResponse = await fetch(`/api/cursos/${props.cursoId}/metricas`);
    //     const stats = await statsResponse.json();
    //     promedioGrupo.value = stats.promedio;
    //     tasaCompletitud.value = stats.completitud;
    //   }
    // } catch (error) {
    //   console.error('Error al cargar los datos:', error);
    // }
  });
  </script>