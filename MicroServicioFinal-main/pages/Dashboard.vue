<!-- App.vue -->
<template>
  <v-app class="bg-background text-white">
    <!-- Barra de navegación -->
    <AppBar />

    <!-- Contenido principal -->
    <v-main>
      <v-container>
        <h1 class="text-h4 text-center mb-6 text-chatgpt-green">Sistema de Reportes de Cursos</h1>

        <v-tabs 
          v-model="activeTab" 
          centered
          :color="colors.primary"
          :slider-color="colors.primary"
          class="mb-6"
        >
          <v-tab 
            value="estudiante"
            :style="{ color: activeTab === 'estudiante' ? colors.primary : '#666' }"
            class="font-weight-medium"
          >
            <v-icon left :color="activeTab === 'estudiante' ? colors.primary : '#666'">
              mdi-account-school
            </v-icon>
            Estudiante
          </v-tab>
          <v-tab 
            value="instructor"
            :style="{ color: activeTab === 'instructor' ? colors.primary : '#666' }"
            class="font-weight-medium"
          >
            <v-icon left :color="activeTab === 'instructor' ? colors.primary : '#666'">
              mdi-account-tie
            </v-icon>
            Instructor
          </v-tab>
          <v-tab 
            value="administrador"
            :style="{ color: activeTab === 'administrador' ? colors.primary : '#666' }"
            class="font-weight-medium"
          >
            <v-icon left :color="activeTab === 'administrador' ? colors.primary : '#666'">
              mdi-shield-account
            </v-icon>
            Administrador
          </v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="mt-6">
          <v-window-item value="estudiante">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-card 
                  elevation="8" 
                  class="rounded-xl"
                  :style="{ 
                    backgroundColor: colors.surface,
                    border: `2px solid ${colors.primary}15`
                  }"
                >
                  <v-card-title class="pa-6">
                    <v-icon :color="colors.primary" size="32" class="mr-3">
                      mdi-chart-line-variant
                    </v-icon>
                    <h2 class="text-h5 font-weight-bold" :style="{ color: colors.primary }">
                      Reporte Estudiante
                    </h2>
                  </v-card-title>
                  <v-card-text class="px-6 pb-6">
                    <ReporteCard
                      userType="estudiante"
                      cursoId="curso123"
                      estudianteId="est456"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="instructor">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-card 
                  elevation="8" 
                  class="rounded-xl"
                  :style="{ 
                    backgroundColor: colors.surface,
                    border: `2px solid ${colors.primary}15`
                  }"
                >
                  <v-card-title class="pa-6">
                    <v-icon :color="colors.primary" size="32" class="mr-3">
                      mdi-teach
                    </v-icon>
                    <h2 class="text-h5 font-weight-bold" :style="{ color: colors.primary }">
                      Reporte Instructor
                    </h2>
                  </v-card-title>
                  <v-card-text class="px-6 pb-6">
                    <ReporteCard
                      userType="instructor"
                      cursoId="curso123"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <v-window-item value="administrador">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-card 
                  elevation="8" 
                  class="rounded-xl"
                  :style="{ 
                    backgroundColor: colors.surface,
                    border: `2px solid ${colors.primary}15`
                  }"
                >
                  <v-card-title class="pa-6">
                    <v-icon :color="colors.primary" size="32" class="mr-3">
                      mdi-cog
                    </v-icon>
                    <h2 class="text-h5 font-weight-bold" :style="{ color: colors.primary }">
                      Reporte Administrador
                    </h2>
                  </v-card-title>
                  <v-card-text class="px-6 pb-6">
                    <ReporteCard
                      userType="administrador"
                      cursoId="curso123"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer 
      app 
      :color="colors.primary" 
      class="text-center d-flex justify-center"
    >
      <div class="text-white font-weight-medium">
        {{ new Date().getFullYear() }} — <strong>EDMODO</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ReporteCard from '../components/Card.vue';

const activeTab = ref('estudiante');

// Colores inspirados en ChatGPT
const colors = reactive({
  primary: '#10a37f',        // Verde principal ChatGPT
  accent: '#19c37d',         // Verde más claro
  secondary: '#f7f7f8',      // Gris muy claro
  background: '#f7f7f8',     // Fondo principal
  surface: '#ffffff',        // Superficies (cards, etc.)
  success: '#10a37f',        // Verde de éxito
  warning: '#ff9500',        // Naranja de advertencia
  error: '#ef4444',          // Rojo de error
  info: '#3b82f6'           // Azul de información
});

// Instancias del router y la ruta actual
const router = useRouter();
const route = useRoute();

// Cambiar pestaña con efectos adicionales
function handleTabChange(tab) {
  activeTab.value = tab;
  console.log('Tab actual:', tab);
  
  // Opcional: navegar a rutas específicas
  // router.push(`/dashboard/${tab}`);
}

// Watcher para detectar cambios de tab
import { watch } from 'vue';
watch(activeTab, (newTab) => {
  handleTabChange(newTab);
});
</script>

<style scoped>
/* Clases personalizadas para colores ChatGPT */
.text-chatgpt-green {
  color: #10a37f !important;
}

.bg-chatgpt-green {
  background-color: #10a37f !important;
}

.bg-background {
  background-color: #f7f7f8;
}

/* Estilos para las tabs */
.v-tab {
  transition: all 0.3s ease;
}

.v-tab:hover {
  background-color: rgba(16, 163, 127, 0.1);
}

/* Cards con hover effect */
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(16, 163, 127, 0.15) !important;
}

/* Bordes redondeados */
.rounded-xl {
  border-radius: 16px !important;
}

/* Footer con gradiente sutil */
.v-footer {
  background: linear-gradient(135deg, #10a37f 0%, #19c37d 100%) !important;
}

/* Iconos con hover effect */
.v-icon {
  transition: all 0.3s ease;
}

.v-icon:hover {
  transform: scale(1.1);
}
</style>