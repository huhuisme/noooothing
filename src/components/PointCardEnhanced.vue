<template>
  <div class="point-card-enhanced" @click="showDetail = true">
    <div class="card-header">
      <h4 class="point-name">{{ point.name }}</h4>
      <span class="point-badge">{{ point.steps.length }}个步骤</span>
    </div>

    <!-- 效果图预览（如果有） -->
    <div v-if="point.effectImage" class="effect-preview">
      <img :src="point.effectImage.path" :alt="point.effectImage.name" class="preview-img">
      <div class="preview-overlay">
        <span>点击查看教学</span>
      </div>
    </div>

    <!-- 无效果图时的占位 -->
    <div v-else class="no-effect-preview">
      <div class="preview-placeholder">
        <span>{{ point.steps.length }}步教学</span>
      </div>
    </div>

    <!-- 步骤预览 -->
    <div class="steps-preview">
      <div class="step-mini" v-for="(step, idx) in point.steps.slice(0, 3)" :key="idx">
        <span class="step-num">{{ step.stepNumber }}</span>
        <span class="step-desc-preview">{{ truncate(step.description, 10) }}</span>
      </div>
      <div v-if="point.steps.length > 3" class="step-mini more">
        <span>+{{ point.steps.length - 3 }}</span>
      </div>
    </div>

    <!-- 弹窗详情 -->
    <div v-if="showDetail" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">✕</button>

        <h2 class="modal-title">{{ point.name }}</h2>

        <!-- 效果图展示 -->
        <div v-if="point.effectImage" class="effect-section">
          <div class="effect-header">
            <span class="effect-badge">✨ 效果预览</span>
            <span class="effect-name">{{ point.effectImage.name }}</span>
          </div>
          <img :src="point.effectImage.path" class="effect-img" :alt="point.effectImage.name">
        </div>

        <!-- 步骤教学 -->
        <div class="steps-section">
          <h3>📖 详细教学步骤</h3>
          <div class="steps-container">
            <div v-for="step in point.steps" :key="step.stepNumber" class="step-item">
              <div class="step-header">
                <div class="step-number">步骤 {{ step.stepNumber }}</div>
              </div>
              <div class="step-description">{{ step.description }}</div>
              <img :src="step.image" :alt="step.description" class="step-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PointCardEnhanced',
  props: {
    point: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDetail: false
    }
  },
  methods: {
    closeModal() {
      this.showDetail = false
    },
    truncate(str, len) {
      if (!str) return ''
      return str.length > len ? str.substring(0, len) + '...' : str
    }
  }
}
</script>

<style scoped>
.point-card-enhanced {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.point-card-enhanced:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #ff4655;
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(255, 70, 85, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0 16px;
}

.point-name {
  font-size: 18px;
  color: #ff4655;
  margin: 0;
}

.point-badge {
  background: rgba(255, 70, 85, 0.2);
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: #ff4655;
}

/* 效果图预览 */
.effect-preview {
  position: relative;
  margin: 12px 16px 0 16px;
  border-radius: 12px;
  overflow: hidden;
  height: 160px;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.point-card-enhanced:hover .preview-img {
  transform: scale(1.05);
}

.preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 12px;
  text-align: center;
}

.preview-overlay span {
  font-size: 13px;
  color: #ff4655;
  font-weight: bold;
}

.no-effect-preview {
  margin: 12px 16px 0 16px;
  border-radius: 12px;
  height: 160px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-placeholder {
  text-align: center;
  color: #888;
  font-size: 14px;
}

/* 步骤预览 */
.steps-preview {
  padding: 12px 16px 16px 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.step-mini {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.step-num {
  background: #ff4655;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: white;
}

.step-desc-preview {
  color: #aaa;
  font-size: 11px;
}

.step-mini.more {
  background: rgba(255, 70, 85, 0.2);
  color: #ff4655;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 20px;
  width: 90vw;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 30px;
  position: relative;
  border: 2px solid #ff4655;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(255, 70, 85, 0.3);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;
  z-index: 10;
}

.close-btn:hover {
  background: #ff4655;
  transform: scale(1.1);
}

.modal-title {
  font-size: 28px;
  color: #ff4655;
  margin-bottom: 24px;
  padding-right: 40px;
}

.effect-section {
  margin-bottom: 30px;
}

.effect-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.effect-badge {
  background: #ff4655;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
}

.effect-name {
  color: #aaa;
  font-size: 14px;
}

.effect-img {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.steps-section h3 {
  color: white;
  margin-bottom: 20px;
  font-size: 20px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step-item {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 16px;
}

.step-header {
  margin-bottom: 10px;
}

.step-number {
  background: #ff4655;
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
}

.step-description {
  color: #b0b0c8;
  font-size: 15px;
  margin-bottom: 12px;
  line-height: 1.5;
}

.step-img {
  width: 100%;
  border-radius: 10px;
  margin-top: 8px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #1a1a2e;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #ff4655;
  border-radius: 3px;
}
</style>