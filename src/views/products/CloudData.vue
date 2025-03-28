<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="lg:w-1/2">
            <h1 class="text-3xl font-extrabold text-white sm:text-4xl">
              云数据平台
            </h1>
            <p class="mt-3 max-w-md text-lg text-primary-100">
              海量数据存储与分析的智能云平台
            </p>
          </div>
          <div class="mt-8 lg:mt-0 lg:w-1/2">
            <div class="flex justify-end">
              <div class="inline-flex rounded-md shadow">
                <a href="/contact" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-300">
                  申请演示
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div class="lg:col-span-8">
            <div class="mb-10">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">产品概述</h2>
              <p class="text-gray-600 mb-6 text-lg">
                云数据平台是一款面向企业级用户的全方位数据处理与分析平台，采用先进的分布式架构设计，
                能够满足PB级数据存储、实时处理与智能分析的需求。平台集成了数据采集、存储、处理、分析、
                可视化等全链路能力，帮助企业从海量数据中挖掘价值，驱动数字化转型。
              </p>
              <div class="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                <div class="w-full h-full flex items-center justify-center bg-primary-50">
                  <span class="text-primary-700 text-xl font-semibold">云数据平台架构图</span>
                </div>
              </div>
            </div>

            <div class="mb-10">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">核心功能</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 class="text-lg font-semibold text-primary-700 mb-2">海量数据存储</h3>
                  <p class="text-gray-600">
                    支持结构化、半结构化和非结构化数据存储，提供PB级扩展能力和高可用性保障，
                    数据冗余备份确保数据安全。
                  </p>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 class="text-lg font-semibold text-primary-700 mb-2">实时数据处理</h3>
                  <p class="text-gray-600">
                    毫秒级响应的流式数据处理引擎，支持复杂事件处理和实时计算，
                    满足高并发场景下的实时业务需求。
                  </p>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 class="text-lg font-semibold text-primary-700 mb-2">智能数据分析</h3>
                  <p class="text-gray-600">
                    内置多种机器学习算法和预测模型，支持自动化数据分析、异常检测和趋势预测，
                    帮助企业从数据中获取洞察。
                  </p>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 class="text-lg font-semibold text-primary-700 mb-2">可视化报表</h3>
                  <p class="text-gray-600">
                    拖拽式自定义报表设计器，丰富的图表组件和交互分析功能，让数据更直观，
                    分析更高效。
                  </p>
                </div>
              </div>
            </div>

            <div class="mb-10">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">技术特点</h2>
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-lg font-medium text-gray-900">分布式架构</h3>
                    <p class="mt-1 text-gray-600">采用微服务架构设计，支持水平扩展和负载均衡，确保高可用性和稳定性。</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-lg font-medium text-gray-900">高性能计算</h3>
                    <p class="mt-1 text-gray-600">基于内存计算和GPU加速技术，提供极致的数据处理速度和高效的资源利用。</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-lg font-medium text-gray-900">智能弹性扩展</h3>
                    <p class="mt-1 text-gray-600">根据业务负载智能调整资源配置，确保性能的同时优化成本。</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-lg font-medium text-gray-900">安全与合规</h3>
                    <p class="mt-1 text-gray-600">全面的数据加密、访问控制和审计机制，满足国家和行业数据安全合规要求。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 mt-10 lg:mt-0">
            <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4">适用场景</h3>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <span class="flex-shrink-0 h-5 w-5 text-primary-500">✓</span>
                  <span class="ml-2 text-gray-600">大规模数据仓库</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 h-5 w-5 text-primary-500">✓</span>
                  <span class="ml-2 text-gray-600">实时数据分析</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 h-5 w-5 text-primary-500">✓</span>
                  <span class="ml-2 text-gray-600">智能决策支持</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 h-5 w-5 text-primary-500">✓</span>
                  <span class="ml-2 text-gray-600">业务预测分析</span>
                </li>
                <li class="flex items-start">
                  <span class="flex-shrink-0 h-5 w-5 text-primary-500">✓</span>
                  <span class="ml-2 text-gray-600">数据资产管理</span>
                </li>
              </ul>

              <div class="mt-8">
                <h3 class="text-lg font-bold text-gray-900 mb-4">相关资源</h3>
                <ul class="space-y-3">
                  <li>
                    <a href="#" class="flex items-center text-primary-600 hover:text-primary-800">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      产品白皮书
                    </a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center text-primary-600 hover:text-primary-800">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      产品演示视频
                    </a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center text-primary-600 hover:text-primary-800">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      技术规格说明
                    </a>
                  </li>
                </ul>
              </div>

              <div class="mt-8">
                <a href="/contact" class="block w-full bg-primary-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors duration-300">
                  咨询解决方案专家
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl overflow-hidden shadow-xl">
          <div class="px-6 py-12 md:py-16 md:px-12 text-center">
            <h2 class="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              开始您的智能数据之旅
            </h2>
            <p class="mt-6 max-w-3xl mx-auto text-lg text-primary-100">
              立即体验云数据平台的强大功能，助力企业数据驱动转型
            </p>
            <div class="mt-8 flex justify-center space-x-4">
              <a href="#pricing" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 transition-colors duration-300">
                查看价格
              </a>
              <a href="/contact" class="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-700 transition-colors duration-300">
                预约演示
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
