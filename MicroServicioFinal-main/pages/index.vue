<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo/Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          Bienvenido a
        </h1>
        <p class="text-gray-600 text-lg font-semibold">
          EDMODO
        </p>
      </div>
      
      <!-- Card principal -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
        <!-- Descripción -->
        <div class="text-center">
          <p class="text-gray-600">
            Inicia sesión o crea una cuenta para comenzar
          </p>
        </div>
        
        <!-- Botones -->
        <div class="space-y-4">
          <!-- Botón de Iniciar Sesión - FORZADO VISIBLE -->
          <div class="w-full">
            <NuxtLink
              to="/login"
              style="
                display: block !important;
                width: 100% !important;
                background-color: white !important;
                color: #16a34a !important;
                padding: 12px 16px !important;
                border-radius: 8px !important;
                text-decoration: none !important;
                font-weight: 500 !important;
                text-align: center !important;
                transition: all 0.2s ease !important;
                border: 2px solid #16a34a !important;
                cursor: pointer !important;
                box-sizing: border-box !important;
              "
              @mouseover="$event.target.style.backgroundColor = '#f9fafb'"
              @mouseout="$event.target.style.backgroundColor = 'white'"
            >
              <div style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important;">
                <svg style="width: 20px !important; height: 20px !important;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                <span>Iniciar Sesión</span>
              </div>
            </NuxtLink>
          </div>
          
          <!-- Botón de Registro - TAMBIÉN FORZADO -->
          <div class="w-full">
            <NuxtLink
              to="/register"
              style="
                display: block !important;
                width: 100% !important;
                background-color: white !important;
                color: #16a34a !important;
                padding: 12px 16px !important;
                border-radius: 8px !important;
                text-decoration: none !important;
                font-weight: 500 !important;
                text-align: center !important;
                transition: all 0.2s ease !important;
                border: 2px solid #16a34a !important;
                cursor: pointer !important;
                box-sizing: border-box !important;
              "
              @mouseover="$event.target.style.backgroundColor = '#f9fafb'"
              @mouseout="$event.target.style.backgroundColor = 'white'"
            >
              <div style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important;">
                <svg style="width: 20px !important; height: 20px !important;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span>Crear Cuenta</span>
              </div>
            </NuxtLink>
          </div>

          <!-- NUEVO: Botón de Prueba - Ir directamente al Home -->
          <div class="w-full">
            <NuxtLink
              to="/home"
              style="
                display: block !important;
                width: 100% !important;
                background-color: #f59e0b !important;
                color: white !important;
                padding: 12px 16px !important;
                border-radius: 8px !important;
                text-decoration: none !important;
                font-weight: 500 !important;
                text-align: center !important;
                transition: all 0.2s ease !important;
                border: none !important;
                cursor: pointer !important;
                box-sizing: border-box !important;
              "
              @mouseover="$event.target.style.backgroundColor = '#d97706'"
              @mouseout="$event.target.style.backgroundColor = '#f59e0b'"
            >
              <div style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important;">
                <svg style="width: 20px !important; height: 20px !important;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>🚀 Acceso Rápido (Demo)</span>
              </div>
            </NuxtLink>
          </div>
        </div>
        
        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">¿Primera vez aquí?</span>
          </div>
        </div>
        
        <!-- Información adicional -->
        <div class="text-center">
          <p class="text-sm text-gray-500">
            Al continuar, aceptas nuestros términos y condiciones
          </p>
          <!-- NUEVO: Texto informativo para el botón de prueba -->
          <p class="text-xs text-amber-600 mt-2 font-medium">
            💡 Usa "Acceso Rápido" para probar la plataforma sin registro
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="text-center">
        <p class="text-sm text-gray-400">
          © 2025 EDMODO. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Meta tags para SEO
useHead({
  title: 'Bienvenido - EDMODO',
  meta: [
    { name: 'description', content: 'Página de inicio - Inicia sesión o regístrate en EDMODO' }
  ]
})
</script>

<style scoped>
/* Fuerza la visibilidad de los botones */
a {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Fallback para cuando Tailwind no carga */
.fallback-button {
  display: block !important;
  width: 100% !important;
  padding: 12px 16px !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  font-weight: 500 !important;
  text-align: center !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
}

.fallback-login {
  background-color: #2563eb !important;
  color: white !important;
  border: none !important;
}

.fallback-register {
  background-color: white !important;
  color: #16a34a !important;
  border: 2px solid #16a34a !important;
}

/* NUEVO: Fallback para el botón de prueba */
.fallback-demo {
  background-color: #f59e0b !important;
  color: white !important;
  border: none !important;
}
</style>