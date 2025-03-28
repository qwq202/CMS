const { Setting } = require('../models');

/**
 * 初始化默认设置
 * 这个函数会在服务器启动时运行，确保数据库中有必要的默认设置
 */
async function initDefaultSettings() {
  console.log('正在初始化默认设置...');
  
  try {
    // 关于页面默认设置
    const aboutSettings = [
      {
        key: 'about_hero',
        value: JSON.stringify({
          title: '关于云智汇',
          subtitle: '引领数字化转型，赋能智慧未来'
        }),
        group: 'about',
        type: 'json',
        label: '关于页面 - 英雄区',
        description: '关于页面顶部英雄区的标题和副标题',
        isPublic: true
      },
      {
        key: 'about_introduction',
        value: JSON.stringify({
          title: '公司简介',
          subtitle: '了解我们的故事和使命',
          content: `
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
        }),
        group: 'about',
        type: 'json',
        label: '关于页面 - 公司简介',
        description: '公司简介部分的标题、副标题和内容',
        isPublic: true
      },
      {
        key: 'about_values',
        value: JSON.stringify({
          title: '企业文化',
          subtitle: '我们的价值观和理念',
          items: [
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
          ]
        }),
        group: 'about',
        type: 'json',
        label: '关于页面 - 企业文化',
        description: '企业文化和价值观设置',
        isPublic: true
      },
      {
        key: 'about_history',
        value: JSON.stringify({
          title: '发展历程',
          subtitle: '我们的成长足迹',
          milestones: [
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
          ]
        }),
        group: 'about',
        type: 'json',
        label: '关于页面 - 发展历程',
        description: '公司发展历程时间线设置',
        isPublic: true
      },
      {
        key: 'about_team',
        value: JSON.stringify({
          title: '领导团队',
          subtitle: '我们的专业团队',
          members: [
            {
              name: '张志远',
              title: '创始人兼CEO',
              bio: '前某知名科技公司技术副总裁，拥有20年软件开发和团队管理经验，带领团队开发了多个行业领先产品。',
              avatar: ''
            },
            {
              name: '李梦华',
              title: '技术总监',
              bio: '人工智能和大数据领域专家，曾参与多个国家级研究项目，拥有多项技术专利。',
              avatar: ''
            },
            {
              name: '王建国',
              title: '产品副总裁',
              bio: '拥有丰富的产品管理经验，精通用户体验设计，曾成功打造多个爆款企业级产品。',
              avatar: ''
            }
          ]
        }),
        group: 'about',
        type: 'json',
        label: '关于页面 - 领导团队',
        description: '领导团队成员信息设置',
        isPublic: true
      }
    ];

    // 联系页面默认设置
    const contactSettings = [
      {
        key: 'contact_hero',
        value: JSON.stringify({
          title: '联系我们',
          subtitle: '我们期待听到您的声音'
        }),
        group: 'contact',
        type: 'json',
        label: '联系页面 - 英雄区',
        description: '联系页面顶部英雄区的标题和副标题',
        isPublic: true
      },
      {
        key: 'contact_info',
        value: JSON.stringify({
          phone: {
            title: '电话咨询',
            description: '工作时间：周一至周五 9:00-18:00',
            value: '010-88888888'
          },
          email: {
            title: '电子邮件',
            description: '7*24小时接收您的咨询',
            value: 'contact@yunzhihui.com'
          },
          address: {
            title: '公司地址',
            description: '欢迎前来参观',
            value: '北京市海淀区科技园区88号'
          }
        }),
        group: 'contact',
        type: 'json',
        label: '联系页面 - 联系信息',
        description: '联系页面上显示的联系方式信息',
        isPublic: true
      },
      {
        key: 'contact_form_products',
        value: JSON.stringify([
          { label: '云数据平台', value: '云数据平台' },
          { label: '智能协作系统', value: '智能协作系统' },
          { label: '智能安全中心', value: '智能安全中心' },
          { label: '金融行业解决方案', value: '金融行业解决方案' },
          { label: '医疗健康解决方案', value: '医疗健康解决方案' },
          { label: '零售行业解决方案', value: '零售行业解决方案' },
          { label: '其他', value: '其他' }
        ]),
        group: 'contact',
        type: 'json',
        label: '联系页面 - 产品选项',
        description: '联系表单中产品/解决方案下拉选项',
        isPublic: true
      }
    ];

    // 首页默认设置(假设已经存在，这里只是作为补充)
    const homeSettings = [
      {
        key: 'home_hero',
        value: JSON.stringify({
          title: '云智汇 - 智能云平台解决方案',
          subtitle: '助力企业数字化转型，提升效率与创新',
          buttonText: '了解更多',
          buttonLink: '/products'
        }),
        group: 'home',
        type: 'json',
        label: '首页 - 英雄区',
        description: '首页顶部英雄区的标题、副标题和按钮设置',
        isPublic: true
      }
    ];

    // 合并所有设置
    const allSettings = [...aboutSettings, ...contactSettings, ...homeSettings];

    // 逐个检查和创建设置
    for (const setting of allSettings) {
      const [existingSetting, created] = await Setting.findOrCreate({
        where: { key: setting.key },
        defaults: setting
      });

      if (!created) {
        console.log(`设置 ${setting.key} 已存在，跳过创建`);
      } else {
        console.log(`成功创建设置 ${setting.key}`);
      }
    }

    console.log('默认设置初始化完成！');
  } catch (error) {
    console.error('初始化默认设置时出错:', error);
  }
}

module.exports = initDefaultSettings;
