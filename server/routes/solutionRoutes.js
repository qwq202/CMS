const express = require('express');
const router = express.Router();
const { 
  getSolutions, 
  getSolutionBySlug, 
  getSolutionsByIndustry,
  createSolution, 
  updateSolution, 
  deleteSolution 
} = require('../controllers/solutionController');
const { protect, authorize } = require('../middleware/auth');

// 公开路由
router.get('/', getSolutions);
router.get('/industry/:industry', getSolutionsByIndustry);
router.get('/:slug', getSolutionBySlug);

// 保护路由 - 需要登录
router.use(protect);

// 管理员路由 - 需要管理员权限
router.post('/', authorize('admin', 'editor'), createSolution);
router.put('/:id', authorize('admin', 'editor'), updateSolution);
router.delete('/:id', authorize('admin'), deleteSolution);

module.exports = router;
