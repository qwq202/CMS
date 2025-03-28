# 云智汇CMS多阶段构建配置
# 第一阶段：构建前端
FROM node:18-alpine AS frontend-build

WORKDIR /app

# 复制前端依赖文件，利用Docker缓存层
COPY package.json package-lock.json* ./

# 安装前端依赖
RUN npm ci --quiet

# 复制前端源代码
COPY . .

# 构建前端
RUN npm run build

# 第二阶段：构建后端并整合前端
FROM node:18-alpine AS backend

WORKDIR /app

# 复制后端依赖文件
COPY server/package.json server/package-lock.json* ./

# 安装后端依赖，仅生产环境
RUN npm ci --quiet --only=production

# 复制后端源代码
COPY server/ ./

# 创建public目录
RUN mkdir -p ./public

# 从前端构建阶段复制构建产物到后端的public目录
COPY --from=frontend-build /app/dist ./public

# 添加健康检查
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/health || exit 1

# 设置Node环境变量
ENV NODE_ENV=production

# 暴露后端API端口
EXPOSE 5000

# 启动命令
CMD ["node", "server.js"]
