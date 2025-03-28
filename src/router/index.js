import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue';

// 管理后台路由守卫
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return next('/admin/login');
  }
  next();
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 前台页面路由
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/Products.vue')
    },
    {
      path: '/products/cloud-data',
      name: 'product-cloud-data',
      component: () => import('../views/products/CloudData.vue')
    },
    {
      path: '/products/collaboration',
      name: 'product-collaboration',
      component: () => import('../views/products/Collaboration.vue')
    },
    {
      path: '/products/security',
      name: 'product-security',
      component: () => import('../views/products/Security.vue')
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: () => import('../views/Solutions.vue')
    },
    {
      path: '/solutions/finance',
      name: 'solution-finance',
      component: () => import('../views/solutions/Finance.vue')
    },
    {
      path: '/solutions/healthcare',
      name: 'solution-healthcare',
      component: () => import('../views/solutions/Healthcare.vue')
    },
    {
      path: '/solutions/retail',
      name: 'solution-retail',
      component: () => import('../views/solutions/Retail.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/Services.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    
    // 管理后台路由
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/Login.vue')
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../views/admin/Dashboard.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/Products.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'products/edit/:id',
          name: 'admin-product-edit',
          component: () => import('../views/admin/ProductEdit.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'solutions',
          name: 'admin-solutions',
          component: () => import('../views/admin/Solutions.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'solutions/edit/:id',
          name: 'admin-solution-edit',
          component: () => import('../views/admin/SolutionEdit.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'contacts',
          name: 'admin-contacts',
          component: () => import('../views/admin/Contacts.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/Users.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: () => import('../views/admin/Profile.vue'),
          beforeEnter: requireAuth
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/Settings.vue'),
          beforeEnter: requireAuth
        }
      ]
    }
  ]
})

export default router
