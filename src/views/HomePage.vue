<template>
  <div>
    <header>
      <h1 class="title">无畏契约 点位大不全</h1>
    </header>

    <div class="card-grid">
      <Card
          v-for="agent in agents"
          :key="agent.id"
          type="agent"
          :name="agent.name"
          :image="agent.image"
          :tag="`地图 点位 ${agent.pointCount} 个`"
          @click="selectAgent(agent)"
      />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'HomePage',
  components: {
    Card
  },
  data() {
    return {
      agents: [
        { id: 1, name: '猎枭', image: '猎枭.png', pointCount: '12' },
        { id: 2, name: '黑梦', image: '黑梦.png', pointCount: '8' }
      ]
    }
  },
  methods: {
    selectAgent(agent) {
      // 使用 params 传递特工名
      this.$router.push({
        name: 'MapPick',
        params: { agent: agent.name }
      })
    }
  }
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
  justify-content: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>