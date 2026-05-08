<template>
  <div class="card" :class="cardClass" @click="handleClick">
    <img :src="imageUrl" class="card-img" :alt="name">
    <div class="card-info">
      <h3 class="card-name">{{ name }}</h3>
      <span v-if="tag" class="card-tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    // 卡片类型：'agent' 或 'map'
    type: {
      type: String,
      default: 'agent',
      validator: (value) => ['agent', 'map'].includes(value)
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: ''
    }
  },
  computed: {
    cardClass() {
      return `${this.type}-card`
    },
    imageUrl() {
      // 处理图片路径
      return require(`@/assets/images/${this.type === 'agent' ? 'Agents' : 'Maps'}/${this.image}`)
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-6px);
  border-color: #ff4655;
  box-shadow: 0 10px 30px rgba(255, 70, 85, 0.2);
}

.card-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.card-info {
  padding: 20px;
  text-align: center;
}

.card-name {
  margin-bottom: 8px;
  font-size: 20px;
  color: #fff;
  text-align: center;
}

.card-tag {
  display: inline-block;
  padding: 4px 10px;
  background: rgba(255, 70, 85, 0.15);
  color: #ff4655;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
}

/* 地图卡片的图片高度可以稍小一点 */
.map-card .card-img {
  height: 200px;
}
</style>