const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductBySlug, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// 公开路由
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// 保护路由 - 需要登录
router.use(protect);

// 管理员路由 - 需要管理员权限
router.post('/', authorize('admin', 'editor'), createProduct);
router.put('/:id', authorize('admin', 'editor'), updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

module.exports = router;
