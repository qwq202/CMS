<template>
  <div>
    <input type="file" accept="image/*" @change="handleChange" />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'FileUploader',
  emits: ['uploaded'],
  methods: {
    async handleChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      const compressed = await this.compressImage(file);
      const formData = new FormData();
      formData.append('file', compressed, file.name);
      try {
        const resp = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.$emit('uploaded', resp.data);
      } catch (e) {
        console.error('上传失败', e);
        alert('上传失败');
      }
    },
    compressImage(file) {
      const maxWidth = 1280;
      const maxHeight = 1280;
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let { width, height } = img;
            if (width > maxWidth || height > maxHeight) {
              const scale = Math.min(maxWidth / width, maxHeight / height);
              width = width * scale;
              height = height * scale;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
              resolve(new File([blob], file.name, { type: blob.type }));
            }, file.type, 0.8);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
  }
};
</script>
