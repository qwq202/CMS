<template>
  <footer class="bg-gray-800 text-gray-300">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and company info -->
        <div class="md:col-span-1">
          <div class="flex items-center">
            <img src="../assets/logo.svg" alt="Logo" class="h-8 w-auto">
            <h2 class="ml-2 text-xl font-bold text-white">云智汇</h2>
          </div>
          <p class="mt-4 text-sm text-gray-400">
            专注于为企业提供智能云平台解决方案，助力数字化转型
          </p>
          <div class="mt-4 flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">微信</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                <path d="M9 10a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0zm1 4c0 2.21-2.686 4-6 4s-6-1.79-6-4c0-.252.224-.644.95-.954A.5.5 0 115.5 12c-.553 0-1-.448-1-1a1 1 0 012 0 .5.5 0 01-.5.5c.326.195.55.345.55.5z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">微博</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06l13.5 13.5a.75.75 0 101.06-1.06L6.28 5.22z"/>
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 7a1 1 0 00-1-1h-4a1 1 0 000 2h4a1 1 0 001-1zm-9 4a1 1 0 011-1h8a1 1 0 110 2H9a1 1 0 01-1-1z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h3 class="text-base font-medium text-white">产品</h3>
          <ul class="mt-4 space-y-2">
            <li>
              <a href="/products" class="text-gray-400 hover:text-white text-sm">云数据平台</a>
            </li>
            <li>
              <a href="/products" class="text-gray-400 hover:text-white text-sm">智能协作系统</a>
            </li>
            <li>
              <a href="/products" class="text-gray-400 hover:text-white text-sm">智能安全中心</a>
            </li>
          </ul>
        </div>
        
        <!-- Company links -->
        <div>
          <h3 class="text-base font-medium text-white">公司</h3>
          <ul class="mt-4 space-y-2">
            <li>
              <a href="/about" class="text-gray-400 hover:text-white text-sm">关于我们</a>
            </li>
            <li>
              <a href="/about" class="text-gray-400 hover:text-white text-sm">公司新闻</a>
            </li>
            <li>
              <a href="/solutions" class="text-gray-400 hover:text-white text-sm">解决方案</a>
            </li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div>
          <h3 class="text-base font-medium text-white">联系我们</h3>
          <ul class="mt-4 space-y-2 text-sm text-gray-400">
            <li class="flex items-start">
              <span class="flex-shrink-0">地址：</span>
              <span class="ml-1">北京市海淀区科技园区88号</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0">电话：</span>
              <span class="ml-1">010-88888888</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0">邮箱：</span>
              <span class="ml-1">contact@yunzhihui.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 border-t border-gray-700 pt-8">
        <p class="text-sm text-gray-400 text-center">
          © {{ new Date().getFullYear() }} 云智汇科技有限公司. 保留所有权利.
        </p>
      </div>
    </div>
  </footer>
</template>
