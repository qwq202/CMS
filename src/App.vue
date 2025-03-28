<template>
  <SettingsProvider>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <img src="./assets/logo.svg" alt="Logo" class="h-8 w-auto">
                <h1 class="ml-2 text-xl font-bold text-primary-600">{{ siteInfo.name }}</h1>
                <span class="ml-2 text-sm text-gray-500">{{ siteInfo.description }}</span>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="inline-flex items-center px-1 pt-1 border-b-2"
                  :class="[
                    $route.path === item.href
                      ? 'border-primary-500 text-primary-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  ]"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </div>
            <div class="hidden sm:flex items-center">
              <a href="/contact" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300">
                免费试用
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-grow">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <Footer />
    </div>
  </SettingsProvider>
</template>

<script setup>
import Footer from './components/Footer.vue';
import SettingsProvider from './components/global/SettingsProvider.vue';
import useSettings from './composables/useSettings';

const { siteInfo } = useSettings();

const navigation = [
  { name: '首页', href: '/' },
  { name: '产品', href: '/products' },
  { name: '解决方案', href: '/solutions' },
  { name: '关于我们', href: '/about' },
  { name: '联系我们', href: '/contact' },
]
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
