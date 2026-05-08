<template>
  <div>
    <header>
      <h1 class="title">请选择地图</h1>
      <div class="selected-agent-info" v-if="selectedAgent">
        当前特工：{{ selectedAgent }}
      </div>
      <button class="back-btn" @click="goBack">← 返回选特工</button>
    </header>

    <div class="map-grid">
      <Card
          v-for="map in maps"
          :key="map.id"
          type="map"
          :name="map.name"
          :image="map.image"
          @click="selectMap(map)"
      />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'MapPickPage',
  components: {
    Card
  },
  data() {
    return {
      selectedAgent: '',
      maps: [
        { id: 1, name: '源工重镇', image: '源工重镇.png' },
        { id: 2, name: '隐世修所', image: '隐世修所.png' },
        { id: 3, name: '霓虹町', image: '霓虹町.png' },
        { id: 4, name: '亚海悬城', image: '亚海悬城.png' },
        { id: 5, name: '森寒冬港', image: '森寒冬港.png' },
        { id: 6, name: '微风岛屿', image: '微风岛屿.png' },
        { id: 7, name: '裂变峡谷', image: '裂变峡谷.png' },
        { id: 8, name: '深海明珠', image: '深海明珠.png' },
        { id: 9, name: '莲花古城', image: '莲花古城.png' },
        { id: 10, name: '日落之城', image: '日落之城.png' },
        { id: 11, name: '幽邃地窟', image: '幽邃地窟.png' },
        { id: 12, name: '盐海矿镇', image: '盐海矿镇.png' }
      ]
    }
  },
  created() {
    // 从 params 获取特工名
    this.selectedAgent = this.$route.params.agent

    // 如果没有特工参数，返回首页
    if (!this.selectedAgent) {
      alert('请先选择特工')
      this.$router.push('/')
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    selectMap(map) {
      // 使用 params 传递特工名和地图名
      this.$router.push({
        name: 'Points',
        params: {
          agent: this.selectedAgent,
          map: map.name
        }
      })
    }
  }
}
</script>

<style scoped>
.map-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
  justify-content: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 70, 85, 0.3);
  border-color: #ff4655;
}

.selected-agent-info {
  margin-top: 10px;
  padding: 6px 12px;
  background: rgba(255, 70, 85, 0.2);
  border-radius: 20px;
  display: inline-block;
  font-size: 14px;
  color: #ff4655;
}

header {
  position: relative;
  text-align: center;
}
</style>