<template>
  <div class="bg-white">
    <!-- 加载中状态 -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {{ aboutData.hero.title || '关于云智汇' }}
            </h1>
            <p class="mt-6 max-w-xl mx-auto text-xl text-primary-100">
              {{ aboutData.hero.subtitle || '引领数字化转型，赋能智慧未来' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Company Introduction -->
      <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {{ aboutData.introduction.title || '公司简介' }}
            </h2>
            <p class="mt-4 text-lg leading-6 text-gray-500">
              {{ aboutData.introduction.subtitle || '了解我们的故事和使命' }}
            </p>
          </div>
          <div class="mt-12 prose prose-lg mx-auto text-gray-500">
            <div v-html="aboutData.introduction.content"></div>
          </div>
        </div>
      </div>

      <!-- Company Values -->
      <div class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {{ aboutData.values.title || '企业文化' }}
            </h2>
            <p class="mt-4 text-lg leading-6 text-gray-500">
              {{ aboutData.values.subtitle || '我们的价值观和理念' }}
            </p>
          </div>

          <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="(value, index) in aboutData.values.items" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div :class="`h-2 bg-${value.color || 'primary'}-500`"></div>
              <div class="px-6 py-8">
                <div :class="`inline-flex items-center justify-center p-2 rounded-md bg-${value.color || 'primary'}-100 text-${value.color || 'primary'}-600 mb-4`">
                  <svg v-if="value.icon === 'innovation'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <svg v-else-if="value.icon === 'teamwork'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <svg v-else-if="value.icon === 'excellence'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <svg v-else-if="value.icon === 'integrity'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="text-xl font-medium text-gray-900 mb-2">{{ value.title }}</h3>
                <p class="text-base text-gray-600">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Company History -->
      <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {{ aboutData.history.title || '发展历程' }}
            </h2>
            <p class="mt-4 text-lg leading-6 text-gray-500">
              {{ aboutData.history.subtitle || '我们的成长足迹' }}
            </p>
          </div>

          <div class="mt-12 relative">
            <!-- Timeline -->
            <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            <div class="space-y-16">
              <div v-for="(milestone, index) in aboutData.history.milestones" :key="index" class="relative">
                <div class="md:flex items-center">
                  <div class="md:w-1/2 pr-8 md:text-right" :class="{'md:order-last md:pl-8 md:pr-0 md:text-left': index % 2 !== 0}">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                      <h3 class="text-lg font-medium text-primary-600">{{ milestone.year }}</h3>
                      <h4 class="text-xl font-semibold text-gray-900 mt-2">{{ milestone.title }}</h4>
                      <p class="text-gray-600 mt-2">{{ milestone.description }}</p>
                    </div>
                  </div>
                  
                  <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div class="w-6 h-6 rounded-full bg-primary-500 border-4 border-white"></div>
                  </div>
                  
                  <div v-if="index % 2 === 0" class="md:w-1/2 pl-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leadership Team -->
      <div class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {{ aboutData.team.title || '领导团队' }}
            </h2>
            <p class="mt-4 text-lg leading-6 text-gray-500">
              {{ aboutData.team.subtitle || '我们的专业团队' }}
            </p>
          </div>

          <div class="mt-12 grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(member, index) in aboutData.team.members" :key="index" class="flex flex-col items-center">
              <div class="w-40 h-40 rounded-full overflow-hidden bg-gray-100">
                <img v-if="member.avatar" :src="member.avatar" :alt="member.name" class="w-full h-full object-cover">
                <div v-else class="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 text-4xl font-bold">
                  {{ member.name ? member.name.charAt(0) : 'U' }}
                </div>
              </div>
              <h3 class="mt-6 text-xl font-medium text-gray-900">{{ member.name }}</h3>
              <p class="text-primary-600">{{ member.title }}</p>
              <p class="mt-3 text-base text-gray-500 text-center">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { settingService } from '../api';

export default {
  setup() {
    const loading = ref(true);
    const aboutData = reactive({
      hero: {
        title: '',
        subtitle: ''
      },
      introduction: {
        title: '',
        subtitle: '',
        content: ''
      },
      values: {
        title: '',
        subtitle: '',
        items: []
      },
      history: {
        title: '',
        subtitle: '',
        milestones: []
      },
      team: {
        title: '',
        subtitle: '',
        members: []
      }
    });

    // 加载关于页面数据
    const loadAboutData = async () => {
      loading.value = true;
      try {
        // 防止缓存，添加时间戳
        const timestamp = new Date().getTime();
        const response = await settingService.getAllSettings(`?public=true&t=${timestamp}`);

        // 处理设置数据
        if (response.data && response.data.success) {
          const settings = response.data.data;
          
          // 处理关于页面设置
          if (settings.about) {
            const aboutSettings = settings.about;
            aboutSettings.forEach(setting => {
              if (setting.key === 'about_hero') {
                try {
                  const heroData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  aboutData.hero = {
                    title: heroData.title || '关于云智汇',
                    subtitle: heroData.subtitle || '引领数字化转型，赋能智慧未来'
                  };
                } catch (e) {
                  console.error('解析关于页面英雄区数据失败:', e);
                }
              } else if (setting.key === 'about_introduction') {
                try {
                  const introData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  aboutData.introduction = {
                    title: introData.title || '公司简介',
                    subtitle: introData.subtitle || '了解我们的故事和使命',
                    content: introData.content || `
                      <p>
                        云智汇科技有限公司成立于2018年，是一家专注于为企业提供智能云平台解决方案的高科技企业。我们由一群来自顶尖科技公司的工程师和产品专家创立，致力于通过云计算、大数据和人工智能技术，帮助企业实现数字化转型。
                      </p>
                      <p class="mt-4">
                        自成立以来，云智汇已经服务了超过500家企业客户，涵盖金融、医疗、零售、制造等多个行业。我们的产品和解决方案获得了市场广泛认可，先后获得"年度最佳云服务提供商"、"最具创新力企业"等多项荣誉。
                      </p>
                      <p class="mt-4">
                        我们坚信，技术的价值在于为企业创造实际效益。云智汇始终以客户需求为中心，不断创新和优化产品，为企业提供安全、高效、易用的智能云服务，助力企业在数字时代取得成功。
                      </p>
                    `
                  };
                } catch (e) {
                  console.error('解析关于页面介绍数据失败:', e);
                }
              } else if (setting.key === 'about_values') {
                try {
                  const valuesData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  aboutData.values = {
                    title: valuesData.title || '企业文化',
                    subtitle: valuesData.subtitle || '我们的价值观和理念',
                    items: valuesData.items || []
                  };
                } catch (e) {
                  console.error('解析关于页面价值观数据失败:', e);
                }
              } else if (setting.key === 'about_history') {
                try {
                  const historyData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  aboutData.history = {
                    title: historyData.title || '发展历程',
                    subtitle: historyData.subtitle || '我们的成长足迹',
                    milestones: historyData.milestones || []
                  };
                } catch (e) {
                  console.error('解析关于页面历史数据失败:', e);
                }
              } else if (setting.key === 'about_team') {
                try {
                  const teamData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  aboutData.team = {
                    title: teamData.title || '领导团队',
                    subtitle: teamData.subtitle || '我们的专业团队',
                    members: teamData.members || []
                  };
                } catch (e) {
                  console.error('解析关于页面团队数据失败:', e);
                }
              }
            });
          }
          
          // 如果没有数据，设置默认数据
          if (aboutData.values.items.length === 0) {
            aboutData.values.items = [
              {
                title: '创新精神',
                icon: 'innovation',
                color: 'primary',
                description: '不断探索新技术和新方法，为客户创造更大价值'
              },
              {
                title: '团队协作',
                icon: 'teamwork',
                color: 'secondary',
                description: '发挥集体智慧，共同解决问题，创造卓越成果'
              },
              {
                title: '追求卓越',
                icon: 'excellence',
                color: 'accent',
                description: '不断提高标准，精益求精，追求完美'
              },
              {
                title: '诚信正直',
                icon: 'integrity',
                color: 'primary',
                description: '坚持诚实守信，以正直之心对待客户和同事'
              }
            ];
          }
          
          if (aboutData.history.milestones.length === 0) {
            aboutData.history.milestones = [
              {
                year: '2018',
                title: '公司成立',
                description: '云智汇科技有限公司在北京成立，开始研发云平台核心技术'
              },
              {
                year: '2019',
                title: '产品发布',
                description: '第一代云数据平台正式发布，获得第一批企业客户'
              },
              {
                year: '2020',
                title: '业务扩展',
                description: '推出智能协作系统和安全中心，产品线全面扩展'
              },
              {
                year: '2023',
                title: '全球化布局',
                description: '开始国际化战略，产品服务覆盖亚太地区主要市场'
              }
            ];
          }
          
          if (aboutData.team.members.length === 0) {
            aboutData.team.members = [
              {
                name: '张志远',
                title: '创始人兼CEO',
                bio: '前某知名科技公司技术副总裁，拥有20年软件开发和团队管理经验，带领团队开发了多个行业领先产品。'
              },
              {
                name: '李梦华',
                title: '技术总监',
                bio: '人工智能和大数据领域专家，曾参与多个国家级研究项目，拥有多项技术专利。'
              },
              {
                name: '王建国',
                title: '产品副总裁',
                bio: '拥有丰富的产品管理经验，精通用户体验设计，曾成功打造多个爆款企业级产品。'
              }
            ];
          }
        }
      } catch (error) {
        console.error('加载关于页面数据失败:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadAboutData();
    });

    return {
      loading,
      aboutData
    };
  }
};
</script>
