<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar
      :color="colors.primary"
      dark
      elevate-on-scroll
      height="72"
    >
      <v-container class="d-flex align-center">
        <div class="d-flex align-center">
          <v-icon size="32" class="mr-3">mdi-book-open-page-variant</v-icon>
          <h1 class="text-h5 font-weight-bold">EDMODO</h1>
        </div>
        
        <v-spacer></v-spacer>
        
        <!-- User Menu - VERSIÓN FUNCIONAL -->
        <v-menu 
          v-model="menuUsuario"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="colors.accent"
              rounded
              v-bind="attrs"
              v-on="on"
              class="text-none"
              elevation="2"
              @click="toggleMenu"
            >
              <v-icon left>mdi-account</v-icon>
              {{ usuario.nombre }}
              <v-icon right :class="{ 'rotate-180': menuUsuario }">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          
          <v-card>
            <v-list dense>
              <v-list-item @click="irADashboard" class="menu-item">
                <v-list-item-icon>
                  <v-icon :color="colors.primary">mdi-chart-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Reporte de evaluación</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-divider></v-divider>
              
              <v-list-item @click="cerrarSesion" class="menu-item">
                <v-list-item-icon>
                  <v-icon :color="colors.error">mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="red--text">Cerrar sesión</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <!-- Navigation Tabs -->
    <v-card flat :color="colors.surface" class="border-bottom">
      <v-container>
        <v-tabs
          v-model="vistaActual"
          :color="colors.primary"
          :slider-color="colors.primary"
          height="60"
        >
          <v-tab value="explorar" class="text-none font-weight-medium">
            <v-icon left>mdi-compass</v-icon>
            Explorar Cursos
          </v-tab>
          <v-tab value="crear" class="text-none font-weight-medium">
            <v-icon left>mdi-plus</v-icon>
            Crear Curso
          </v-tab>
        </v-tabs>
      </v-container>
    </v-card>

    <v-main :style="{ backgroundColor: colors.background }">
      <v-container class="py-8">
        <!-- Vista Explorar -->
        <v-window v-model="vistaActual">
          <v-window-item value="explorar">
            <!-- Search and Filter Section -->
            <v-row class="mb-6">
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="busqueda"
                  :color="colors.primary"
                  label="Buscar cursos..."
                  prepend-inner-icon="mdi-magnify"
                  outlined
                  hide-details
                  class="rounded-lg"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="categoriaFiltro"
                  :items="categorias"
                  :color="colors.primary"
                  label="Categoría"
                  outlined
                  hide-details
                  class="rounded-lg"
                />
              </v-col>
            </v-row>

            <!-- Courses Grid -->
            <v-row>
              <v-col
                v-for="curso in cursosFiltrados"
                :key="curso.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card
                  class="course-card"
                  elevation="4"
                  :style="{ backgroundColor: colors.surface }"
                  @mouseenter="elevateCard"
                  @mouseleave="resetElevation"
                >
                  <v-img
                    :src="curso.imagen"
                    height="200"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
                  >
                    <v-card-title class="white--text">
                      <v-chip
                        small
                        :color="colors.accent"
                        class="mr-2"
                      >
                        {{ curso.categoria }}
                      </v-chip>
                      <v-chip
                        small
                        :color="colors.success"
                        outlined
                      >
                        {{ curso.nivel }}
                      </v-chip>
                    </v-card-title>
                  </v-img>
                  
                  <v-card-text class="pb-0">
                    <h3 class="text-h6 font-weight-bold mb-2">{{ curso.titulo }}</h3>
                    <p class="text-body-2 grey--text text--darken-1 mb-3">
                      {{ curso.descripcion }}
                    </p>
                    
                    <div class="d-flex align-center mb-4">
                      <v-chip small outlined class="mr-2">
                        <v-icon left size="16">mdi-clock-outline</v-icon>
                        {{ curso.duracion }}
                      </v-chip>
                      <v-chip small outlined class="mr-2">
                        <v-icon left size="16">mdi-account-group</v-icon>
                        {{ curso.estudiantes }}
                      </v-chip>
                      <v-chip small outlined>
                        <v-icon left size="16" color="amber">mdi-star</v-icon>
                        {{ curso.rating }}
                      </v-chip>
                    </div>
                  </v-card-text>
                  
                  <v-card-actions class="px-4 pb-4">
                    <div>
                      <div class="text-h5 font-weight-bold" :style="{ color: colors.primary }">
                        {{ curso.precio }}
                      </div>
                      <div class="text-body-2 grey--text">
                        por {{ curso.instructor }}
                      </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn
                      :color="colors.primary"
                      rounded
                      @click="inscribirseACurso(curso.id)"
                      class="text-none font-weight-medium"
                    >
                      Inscribirse
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Vista Crear Curso -->
          <v-window-item value="crear">
            <v-row justify="center">
              <v-col cols="12" md="8" lg="6">
                <v-card
                  elevation="8"
                  :style="{ backgroundColor: colors.surface }"
                  class="rounded-xl"
                >
                  <v-card-title class="pa-6">
                    <v-icon :color="colors.primary" size="32" class="mr-3">
                      mdi-plus-circle
                    </v-icon>
                    <h2 class="text-h5 font-weight-bold">Crear Nuevo Curso</h2>
                  </v-card-title>
                  
                  <v-card-text class="px-6 pb-6">
                    <v-form ref="form" v-model="formularioValido">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="nuevoCurso.titulo"
                            :color="colors.primary"
                            label="Título del curso *"
                            outlined
                            :rules="[rules.required]"
                            placeholder="Ej: Introducción a React"
                          />
                        </v-col>
                        
                        <v-col cols="12">
                          <v-textarea
                            v-model="nuevoCurso.descripcion"
                            :color="colors.primary"
                            label="Descripción *"
                            outlined
                            rows="4"
                            :rules="[rules.required]"
                            placeholder="Describe de qué trata tu curso..."
                          />
                        </v-col>
                        
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="nuevoCurso.duracion"
                            :color="colors.primary"
                            label="Duración"
                            outlined
                            placeholder="Ej: 8 semanas"
                          />
                        </v-col>
                        
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="nuevoCurso.precio"
                            :color="colors.primary"
                            label="Precio"
                            outlined
                            placeholder="Ej: $99"
                          />
                        </v-col>
                        
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="nuevoCurso.categoria"
                            :items="categorias.slice(1)"
                            :color="colors.primary"
                            label="Categoría"
                            outlined
                          />
                        </v-col>
                        
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="nuevoCurso.nivel"
                            :items="['Principiante', 'Intermedio', 'Avanzado']"
                            :color="colors.primary"
                            label="Nivel"
                            outlined
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  
                  <v-card-actions class="px-6 pb-6">
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      class="text-none mr-3"
                      @click="vistaActual = 'explorar'"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      :color="colors.primary"
                      rounded
                      class="text-none font-weight-medium"
                      @click="crearCurso"
                    >
                      Crear Curso
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>

    <!-- Snackbar para notificaciones -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      bottom
      right
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'CourseManagementInterface',
  data() {
    return {
      // Colores inspirados en ChatGPT
      colors: {
        primary: '#10a37f',
        accent: '#19c37d',
        secondary: '#f7f7f8',
        background: '#f7f7f8',
        surface: '#ffffff',
        success: '#10a37f',
        warning: '#ff9500',
        error: '#ef4444'
      },
      usuario: {
        nombre: 'Juan Pérez'
      },
      // AGREGADO: Control del menú de usuario
      menuUsuario: false,
      vistaActual: 'explorar',
      formularioValido: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      },
      cursos: [
        {
          id: 1,
          titulo: 'Introducción a JavaScript',
          descripcion: 'Aprende los fundamentos de JavaScript desde cero',
          instructor: 'María García',
          duracion: '8 semanas',
          estudiantes: 234,
          rating: 4.8,
          precio: '$99',
          categoria: 'Programación',
          imagen: 'https://via.placeholder.com/300x200/10a37f/ffffff?text=JavaScript',
          nivel: 'Principiante'
        },
        {
          id: 2,
          titulo: 'Diseño UX/UI Avanzado',
          descripcion: 'Domina las técnicas avanzadas de diseño de experiencia de usuario',
          instructor: 'Carlos Ruiz',
          duracion: '12 semanas',
          estudiantes: 189,
          rating: 4.9,
          precio: '$149',
          categoria: 'Diseño',
          imagen: 'https://via.placeholder.com/300x200/19c37d/ffffff?text=UX%2FUI',
          nivel: 'Avanzado'
        },
        {
          id: 3,
          titulo: 'Marketing Digital 2025',
          descripcion: 'Estrategias modernas de marketing digital y redes sociales',
          instructor: 'Ana López',
          duracion: '6 semanas',
          estudiantes: 456,
          rating: 4.7,
          precio: '$79',
          categoria: 'Marketing',
          imagen: 'https://via.placeholder.com/300x200/ff9500/ffffff?text=Marketing',
          nivel: 'Intermedio'
        },
        {
          id: 4,
          titulo: 'Python para Data Science',
          descripcion: 'Análisis de datos y machine learning con Python',
          instructor: 'Roberto Silva',
          duracion: '10 semanas',
          estudiantes: 312,
          rating: 4.8,
          precio: '$129',
          categoria: 'Programación',
          imagen: 'https://via.placeholder.com/300x200/10a37f/ffffff?text=Python',
          nivel: 'Intermedio'
        }
      ],
      busqueda: '',
      categoriaFiltro: 'Todas',
      nuevoCurso: {
        titulo: '',
        descripcion: '',
        duracion: '',
        precio: '',
        categoria: 'Programación',
        nivel: 'Principiante'
      },
      categorias: ['Todas', 'Programación', 'Diseño', 'Marketing', 'Negocios', 'Idiomas'],
      rules: {
        required: value => !!value || 'Este campo es requerido'
      }
    }
  },
  computed: {
    cursosFiltrados() {
      return this.cursos.filter(curso => {
        const coincideBusqueda = curso.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                               curso.descripcion.toLowerCase().includes(this.busqueda.toLowerCase());
        const coincideCategoria = this.categoriaFiltro === 'Todas' || curso.categoria === this.categoriaFiltro;
        return coincideBusqueda && coincideCategoria;
      });
    }
  },
  methods: {
    toggleMenu() {
      this.menuUsuario = !this.menuUsuario;
    },
    irADashboard() {
      // Cerrar el menú primero
      this.menuUsuario = false;
      // Redirección al dashboard
      if (this.$router) {
        this.$router.push('/dashboard');
      }
      this.showSnackbar('Redirigiendo al dashboard...', 'info');
    },
    cerrarSesion() {
      // Cerrar el menú primero
      this.menuUsuario = false;
      // Redirección a Home
      if (this.$router) {
        this.$router.push('/index');
      }
      this.showSnackbar('Cerrando sesión...', 'warning');
    },
    crearCurso() {
      if (this.nuevoCurso.titulo && this.nuevoCurso.descripcion) {
        const curso = {
          id: this.cursos.length + 1,
          ...this.nuevoCurso,
          instructor: this.usuario.nombre,
          estudiantes: 0,
          rating: 0,
          imagen: 'https://via.placeholder.com/300x200/10a37f/ffffff?text=Nuevo+Curso'
        };
        this.cursos.push(curso);
        this.nuevoCurso = {
          titulo: '',
          descripcion: '',
          duracion: '',
          precio: '',
          categoria: 'Programación',
          nivel: 'Principiante'
        };
        this.showSnackbar('¡Curso creado exitosamente!', 'success');
        this.vistaActual = 'explorar';
      } else {
        this.showSnackbar('Por favor completa los campos obligatorios', 'error');
      }
    },
    inscribirseACurso(cursoId) {
      const cursoIndex = this.cursos.findIndex(curso => curso.id === cursoId);
      if (cursoIndex !== -1) {
        this.cursos[cursoIndex].estudiantes += 1;
        this.showSnackbar('¡Te has inscrito exitosamente al curso!', 'success');
      }
    },
    showSnackbar(text, color = 'success') {
      this.snackbar = {
        show: true,
        text,
        color
      };
    },
    elevateCard(event) {
      event.currentTarget.style.transform = 'translateY(-4px)';
      event.currentTarget.style.transition = 'all 0.3s ease';
    },
    resetElevation(event) {
      event.currentTarget.style.transform = 'translateY(0)';
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.menu-item {
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.course-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}

.rounded-lg {
  border-radius: 12px;
}

.rounded-xl {
  border-radius: 16px;
}
</style>