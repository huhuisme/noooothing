<template>
  <div class="points-page">
    <header>
      <button class="back-btn" @click="goBack">← 返回</button>
      <h1 class="title">点位教学</h1>
      <div class="info-badge">
        <span class="agent-badge">{{ selectedAgent }}</span>
        <span class="map-badge">{{ selectedMap }}</span>
      </div>
    </header>

    <div v-if="hasPoints" class="points-container">
      <!-- 防守方 -->
      <div v-if="defensePoints.length" class="section">
        <h2 class="section-title">防守</h2>
        <div class="points-grid">
          <div
              v-for="point in defensePoints"
              :key="point.id"
              class="point-card"
              @click="showPreview(point)"
          >
            <div class="card-effect" v-if="point.effectImage">
              <img :src="point.effectImage.path" :alt="point.effectImage.name">
              <div class="effect-overlay">效果预览</div>
            </div>
            <div class="card-effect-placeholder" v-else>暂无效果图</div>
            <h3 class="point-name">{{ point.name }}</h3>
            <div class="point-meta">{{ point.steps.length }} 个步骤</div>
          </div>
        </div>
      </div>

      <!-- 进攻方 -->
      <div v-if="attackPoints.length" class="section">
        <h2 class="section-title">进攻方点位</h2>
        <div class="points-grid">
          <div
              v-for="point in attackPoints"
              :key="point.id"
              class="point-card"
              @click="showPreview(point)"
          >
            <div class="card-effect" v-if="point.effectImage">
              <img :src="point.effectImage.path" :alt="point.effectImage.name">
              <div class="effect-overlay">效果预览</div>
            </div>
            <div class="card-effect-placeholder" v-else>暂无效果图</div>
            <h3 class="point-name">{{ point.name }}</h3>
            <div class="point-meta">{{ point.steps.length }} 个步骤</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-points">暂无点位数据</div>

    <!-- 点击后弹窗 -->
    <div v-if="showModal" class="modal-overlay" @click="hidePreview">
      <div class="modal-container" @click.stop>
        <button class="close-btn" @click="hidePreview">✕</button>
        <h2 class="modal-title">{{ currentPoint ? currentPoint.name : '点位' }}</h2>
        <div class="steps-area">
          <div class="steps-title">教学步骤</div>
          <div v-if="currentPoint && currentPoint.steps && currentPoint.steps.length" class="steps-scroll">
            <div v-for="step in currentPoint.steps" :key="step.stepNumber" class="step-card">
              <div class="step-num">步骤 {{ step.stepNumber }}</div>
              <div class="step-desc">{{ step.description || '无说明' }}</div>
              <img :src="step.image" @click.stop="enlargeImage(step.image)">
            </div>
          </div>
          <div v-else class="no-steps">
            ⚠️ 该点位没有步骤图片<br>
            请检查图片命名格式：数字+描述，例如 "1抵住标点.jpeg"
          </div>
        </div>
      </div>
    </div>

    <!-- 图片放大 -->
    <div v-if="enlargedImage" class="image-zoom" @click="enlargedImage = null">
      <img :src="enlargedImage" alt="放大图片">
      <button class="zoom-close" @click="enlargedImage = null">✕</button>
    </div>
  </div>
</template>

<script>
import { loadPointsData } from "@/utils/pointLoader"

const allPointsData = loadPointsData()

export default {
  name: "PointsPage",
  data() {
    return {
      selectedAgent: "",
      selectedMap: "",
      attackPoints: [],
      defensePoints: [],
      showModal: false,
      currentPoint: null,
      enlargedImage: null
    }
  },
  computed: {
    hasPoints() {
      return this.attackPoints.length + this.defensePoints.length > 0
    }
  },
  created() {
    this.selectedAgent = this.$route.params.agent
    this.selectedMap = this.$route.params.map
    if (!this.selectedAgent || !this.selectedMap) {
      alert("参数错误，请重新选择")
      this.$router.push("/")
      return
    }
    this.loadPoints()
  },
  methods: {
    loadPoints() {
      const agentData = allPointsData[this.selectedAgent]
      if (agentData && agentData[this.selectedMap]) {
        const mapData = agentData[this.selectedMap]
        this.attackPoints = mapData.attack || []
        this.defensePoints = mapData.defense || []
        console.log("进攻点位详情:", this.attackPoints)
        console.log("防守点位详情:", this.defensePoints)
      } else {
        console.warn(`未找到 ${this.selectedAgent} - ${this.selectedMap} 的数据`)
        this.attackPoints = []
        this.defensePoints = []
      }
    },
    showPreview(point) {
      console.log("点击点位:", point.name, "步骤数:", point.steps.length)
      this.currentPoint = point
      this.showModal = true
    },
    hidePreview() {
      this.showModal = false
      this.currentPoint = null
    },
    enlargeImage(img) {
      this.enlargedImage = img
    },
    goBack() {
      this.$router.push(`/map-pick/${this.selectedAgent}`)
    }
  }
}
</script>

<style scoped>
/* 样式与之前相同，保持布局宽松，步骤卡片更大 */
.points-page {
  min-height: 100vh;
  padding: 20px;
}
header {
  position: relative;
  text-align: center;
  margin-bottom: 50px;
}
.back-btn {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
}
.back-btn:hover {
  background: #ff4655;
}
.title {
  font-size: 40px;
  color: #ff4655;
}
.info-badge {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 15px;
}
.agent-badge, .map-badge {
  background: rgba(255,70,85,0.2);
  border: 1px solid #ff4655;
  border-radius: 30px;
  padding: 6px 20px;
  color: white;
}
.section {
  margin: 60px 0;
}
.section-title {
  font-size: 30px;
  border-left: 6px solid #ff4655;
  padding-left: 20px;
  color: white;
  margin-bottom: 35px;
}
.points-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 35px;
  max-width: 1300px;
  margin: 0 auto;
}
@media (max-width: 1000px) {
  .points-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 700px) {
  .points-grid { grid-template-columns: 1fr; }
}
.point-card {
  background: rgba(30,30,45,0.8);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  transition: 0.25s ease;
  cursor: pointer;
}
.point-card:hover {
  transform: translateY(-6px);
  border-color: #ff4655;
  box-shadow: 0 15px 30px rgba(0,0,0,0.4);
}
.card-effect {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #1a1a2a;
}
.card-effect img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.2s;
}
.point-card:hover .card-effect img {
  transform: scale(1.05);
}
.effect-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 12px;
  text-align: center;
  font-size: 13px;
  color: #ff4655;
  font-weight: bold;
}
.card-effect-placeholder {
  height: 200px;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-effect {
  color: #666;
  font-size: 14px;
}
.point-name {
  font-size: 22px;
  color: #ff4655;
  padding: 18px 18px 8px 18px;
  margin: 0;
}
.point-meta {
  padding: 0 18px 20px 18px;
  color: #aaa;
  font-size: 14px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}
.modal-container {
  background: linear-gradient(135deg, #1e1e2f, #12121f);
  border-radius: 32px;
  width: 85vw;
  max-width: 1200px;
  max-height: 85vh;
  padding: 30px;
  position: relative;
  border: 2px solid #ff4655;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.close-btn {
  position: absolute;
  top: 18px;
  right: 24px;
  background: rgba(255,70,85,0.3);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
}
.close-btn:hover {
  background: #ff4655;
}
.modal-title {
  font-size: 36px;
  color: #ff4655;
  text-align: center;
  margin-bottom: 25px;
  padding-right: 50px;
}
.steps-title {
  font-size: 22px;
  color: white;
  border-left: 5px solid #ff4655;
  padding-left: 16px;
  margin-bottom: 20px;
}
.steps-scroll {
  display: flex;
  overflow-x: auto;
  gap: 30px;
  padding-bottom: 15px;
}
.step-card {
  flex: 0 0 380px;
  background: rgba(0,0,0,0.5);
  border-radius: 24px;
  padding: 20px;
}
.step-num {
  background: #ff4655;
  display: inline-block;
  padding: 4px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
}
.step-desc {
  color: #ddd;
  font-size: 16px;
  margin-bottom: 18px;
  line-height: 1.4;
}
.step-card img {
  width: 100%;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.2s;
}
.step-card img:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
}
.image-zoom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.image-zoom img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 16px;
}
.zoom-close {
  position: absolute;
  top: 25px;
  right: 35px;
  background: #ff4655;
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
}
.steps-scroll::-webkit-scrollbar {
  height: 8px;
}
.steps-scroll::-webkit-scrollbar-track {
  background: #2a2a3e;
  border-radius: 4px;
}
.steps-scroll::-webkit-scrollbar-thumb {
  background: #ff4655;
  border-radius: 4px;
}
.modal-container::-webkit-scrollbar {
  width: 6px;
}
.modal-container::-webkit-scrollbar-track {
  background: #1e1e2f;
}
.modal-container::-webkit-scrollbar-thumb {
  background: #ff4655;
}
</style>