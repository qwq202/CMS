<template>
  <div class="bg-white p-6 rounded-lg shadow mb-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">{{ label }}</h3>
    <p v-if="description" class="text-sm text-gray-500 mb-4">{{ description }}</p>
    
    <!-- 根据settingType展示不同编辑器 -->
    <div>
      <!-- 标题和副标题编辑器 -->
      <div v-if="settingType === 'hero'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">标题</label>
          <input
            type="text"
            v-model="localValue.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">副标题</label>
          <input
            type="text"
            v-model="localValue.subtitle"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <!-- 联系信息编辑器 -->
      <div v-else-if="settingType === 'contactInfo'" class="space-y-6">
        <!-- 电话信息 -->
        <div class="p-4 bg-gray-50 rounded-md">
          <h4 class="text-md font-medium text-gray-900 mb-2">电话信息</h4>
          <div class="space-y-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">标题</label>
              <input
                type="text"
                v-model="localValue.phone.title"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">描述</label>
              <input
                type="text"
                v-model="localValue.phone.description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">电话号码</label>
              <input
                type="text"
                v-model="localValue.phone.value"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
        
        <!-- 邮箱信息 -->
        <div class="p-4 bg-gray-50 rounded-md">
          <h4 class="text-md font-medium text-gray-900 mb-2">邮箱信息</h4>
          <div class="space-y-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">标题</label>
              <input
                type="text"
                v-model="localValue.email.title"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">描述</label>
              <input
                type="text"
                v-model="localValue.email.description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">邮箱地址</label>
              <input
                type="text"
                v-model="localValue.email.value"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
        
        <!-- 地址信息 -->
        <div class="p-4 bg-gray-50 rounded-md">
          <h4 class="text-md font-medium text-gray-900 mb-2">地址信息</h4>
          <div class="space-y-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">标题</label>
              <input
                type="text"
                v-model="localValue.address.title"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">描述</label>
              <input
                type="text"
                v-model="localValue.address.description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">地址</label>
              <input
                type="text"
                v-model="localValue.address.value"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 公司简介编辑器 -->
      <div v-else-if="settingType === 'introduction'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">标题</label>
          <input
            type="text"
            v-model="localValue.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">副标题</label>
          <input
            type="text"
            v-model="localValue.subtitle"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">内容</label>
          <textarea
            v-model="localValue.content"
            rows="6"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          ></textarea>
          <p class="mt-1 text-sm text-gray-500">支持HTML标签，如&lt;p&gt;, &lt;strong&gt;等</p>
        </div>
      </div>
      
      <!-- 企业文化编辑器 -->
      <div v-else-if="settingType === 'values'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">标题</label>
          <input
            type="text"
            v-model="localValue.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">副标题</label>
          <input
            type="text"
            v-model="localValue.subtitle"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        
        <!-- 价值观列表 -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">价值观列表</label>
            <button 
              @click="addItem('values')" 
              type="button" 
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              添加价值观
            </button>
          </div>
          
          <div v-for="(item, index) in localValue.items" :key="index" class="mb-4 p-4 border border-gray-200 rounded-md">
            <div class="flex justify-between items-center mb-2">
              <h5 class="text-sm font-medium text-gray-700">价值观 #{{ index + 1 }}</h5>
              <button 
                @click="removeItem('values', index)" 
                type="button"
                class="text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-700">标题</label>
                <input
                  type="text"
                  v-model="item.title"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">图标</label>
                <select
                  v-model="item.icon"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="innovation">创新</option>
                  <option value="teamwork">团队</option>
                  <option value="excellence">卓越</option>
                  <option value="integrity">诚信</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">颜色</label>
                <select
                  v-model="item.color"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="primary">主题色</option>
                  <option value="secondary">次要色</option>
                  <option value="accent">强调色</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">描述</label>
                <textarea
                  v-model="item.description"
                  rows="2"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                ></textarea>
              </div>
            </div>
          </div>
          
          <p v-if="localValue.items && localValue.items.length === 0" class="text-sm text-gray-500 italic">
            尚未添加任何价值观。点击上方按钮添加。
          </p>
        </div>
      </div>
      
      <!-- 发展历程编辑器 -->
      <div v-else-if="settingType === 'history'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">标题</label>
          <input
            type="text"
            v-model="localValue.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">副标题</label>
          <input
            type="text"
            v-model="localValue.subtitle"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        
        <!-- 里程碑列表 -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">发展历程里程碑</label>
            <button 
              @click="addItem('history')" 
              type="button" 
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              添加里程碑
            </button>
          </div>
          
          <!-- 对里程碑进行排序 -->
          <draggable 
            v-model="localValue.milestones" 
            item-key="year" 
            handle=".drag-handle"
            ghost-class="bg-primary-50"
            class="space-y-4"
          >
            <template #item="{ element, index }">
              <div class="p-4 border border-gray-200 rounded-md relative">
                <div class="absolute right-2 top-2 flex space-x-2">
                  <button 
                    type="button"
                    class="drag-handle cursor-move text-gray-400 hover:text-gray-600"
                    title="拖拽调整顺序"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                    </svg>
                  </button>
                  <button 
                    @click="removeItem('history', index)" 
                    type="button"
                    class="text-red-500 hover:text-red-700"
                    title="删除此里程碑"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div class="space-y-3 mt-4">
                  <div>
                    <label class="block text-xs font-medium text-gray-700">年份</label>
                    <input
                      type="text"
                      v-model="element.year"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700">标题</label>
                    <input
                      type="text"
                      v-model="element.title"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-700">描述</label>
                    <textarea
                      v-model="element.description"
                      rows="2"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
          
          <p v-if="!localValue.milestones || localValue.milestones.length === 0" class="text-sm text-gray-500 italic">
            尚未添加任何里程碑。点击上方按钮添加。
          </p>
        </div>
      </div>
      
      <!-- 团队成员编辑器 -->
      <div v-else-if="settingType === 'team'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">标题</label>
          <input
            type="text"
            v-model="localValue.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">副标题</label>
          <input
            type="text"
            v-model="localValue.subtitle"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        
        <!-- 团队成员列表 -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="block text-sm font-medium text-gray-700">团队成员</label>
            <button 
              @click="addItem('team')" 
              type="button" 
              class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              添加成员
            </button>
          </div>
          
          <div v-for="(member, index) in localValue.members" :key="index" class="mb-4 p-4 border border-gray-200 rounded-md">
            <div class="flex justify-between items-center mb-2">
              <h5 class="text-sm font-medium text-gray-700">成员 #{{ index + 1 }}</h5>
              <button 
                @click="removeItem('team', index)" 
                type="button"
                class="text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-700">姓名</label>
                <input
                  type="text"
                  v-model="member.name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">职位</label>
                <input
                  type="text"
                  v-model="member.title"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">简介</label>
                <textarea
                  v-model="member.bio"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700">头像URL（可选）</label>
                <input
                  type="text"
                  v-model="member.avatar"
                  placeholder="留空将显示姓名首字母"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          <p v-if="localValue.members && localValue.members.length === 0" class="text-sm text-gray-500 italic">
            尚未添加任何团队成员。点击上方按钮添加。
          </p>
        </div>
      </div>
      
      <!-- 产品选项编辑器 -->
      <div v-else-if="settingType === 'productOptions'" class="space-y-4">
        <div class="flex justify-between items-center mb-2">
          <label class="block text-sm font-medium text-gray-700">产品选项列表</label>
          <button 
            @click="addItem('productOptions')" 
            type="button" 
            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            添加选项
          </button>
        </div>
        
        <div v-for="(option, index) in localValue" :key="index" class="mb-2 p-3 border border-gray-200 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <h5 class="text-sm font-medium text-gray-700">选项 #{{ index + 1 }}</h5>
            <button 
              @click="removeItem('productOptions', index)" 
              type="button"
              class="text-red-600 hover:text-red-800"
            >
              删除
            </button>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-700">显示名称</label>
              <input
                type="text"
                v-model="option.label"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700">值</label>
              <input
                type="text"
                v-model="option.value"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
        
        <p v-if="localValue && localValue.length === 0" class="text-sm text-gray-500 italic">
          尚未添加任何产品选项。点击上方按钮添加。
        </p>
      </div>
      
      <!-- 默认JSON编辑器 -->
      <div v-else>
        <textarea
          v-model="jsonText"
          rows="10"
          class="font-mono text-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        ></textarea>
        <p v-if="jsonError" class="mt-2 text-sm text-red-600">{{ jsonError }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  props: {
    value: {
      type: [Object, Array],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    settingType: {
      type: String,
      default: 'json'
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const localValue = ref(JSON.parse(JSON.stringify(props.value)));
    const jsonText = ref(JSON.stringify(props.value, null, 2));
    const jsonError = ref('');
    
    // 初始化默认结构
    const initDefaultStructure = () => {
      if (props.settingType === 'hero' && (!localValue.value || typeof localValue.value !== 'object')) {
        localValue.value = { title: '', subtitle: '' };
      } else if (props.settingType === 'contactInfo' && (!localValue.value || typeof localValue.value !== 'object')) {
        localValue.value = {
          phone: { title: '', description: '', value: '' },
          email: { title: '', description: '', value: '' },
          address: { title: '', description: '', value: '' }
        };
      } else if (props.settingType === 'introduction' && (!localValue.value || typeof localValue.value !== 'object')) {
        localValue.value = { title: '', subtitle: '', content: '' };
      } else if (props.settingType === 'values' && (!localValue.value || typeof localValue.value !== 'object')) {
        localValue.value = { title: '', subtitle: '', items: [] };
      } else if (props.settingType === 'history' && (!localValue.value || typeof localValue.value !== 'object')) {
        localValue.value = { title: '', subtitle: '', milestones: [] };
      } else if (props.settingType === 'team' && (!localValue.value || typeof localValue.value !== 'object')) {
        localValue.value = { title: '', subtitle: '', members: [] };
      } else if (props.settingType === 'productOptions' && !Array.isArray(localValue.value)) {
        localValue.value = [];
      }
    };
    
    // 初始化默认结构
    initDefaultStructure();
    
    // 添加新项目
    const addItem = (type) => {
      if (type === 'values') {
        if (!localValue.value.items) {
          localValue.value.items = [];
        }
        localValue.value.items.push({
          title: '',
          icon: 'innovation',
          color: 'primary',
          description: ''
        });
      } else if (type === 'history') {
        if (!localValue.value.milestones) {
          localValue.value.milestones = [];
        }
        localValue.value.milestones.push({
          year: '',
          title: '',
          description: ''
        });
      } else if (type === 'team') {
        if (!localValue.value.members) {
          localValue.value.members = [];
        }
        localValue.value.members.push({
          name: '',
          title: '',
          bio: '',
          avatar: ''
        });
      } else if (type === 'productOptions') {
        localValue.value.push({
          label: '',
          value: ''
        });
      }
      
      updateValue();
    };
    
    // 移除项目
    const removeItem = (type, index) => {
      if (type === 'values') {
        localValue.value.items.splice(index, 1);
      } else if (type === 'history') {
        localValue.value.milestones.splice(index, 1);
      } else if (type === 'team') {
        localValue.value.members.splice(index, 1);
      } else if (type === 'productOptions') {
        localValue.value.splice(index, 1);
      }
      
      updateValue();
    };
    
    // 更新值
    const updateValue = () => {
      emit('update:value', localValue.value);
      jsonText.value = JSON.stringify(localValue.value, null, 2);
    };
    
    // 当localValue变化时，向父组件发送更新
    watch(localValue, () => {
      updateValue();
    }, { deep: true });
    
    // 当JSON文本变化时，尝试解析并更新值
    watch(jsonText, (newVal) => {
      try {
        const parsed = JSON.parse(newVal);
        localValue.value = parsed;
        jsonError.value = '';
        emit('update:value', parsed);
      } catch (e) {
        jsonError.value = '无效的JSON格式';
      }
    });
    
    // 当props.value变化时更新本地值
    watch(() => props.value, (newVal) => {
      localValue.value = JSON.parse(JSON.stringify(newVal));
      jsonText.value = JSON.stringify(newVal, null, 2);
    });
    
    return {
      localValue,
      jsonText,
      jsonError,
      addItem,
      removeItem,
      updateValue
    };
  }
};
</script>
