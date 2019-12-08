<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix, st-scheader">
      <span>{{ name }}</span>
      <el-button
        type="text"
        icon="el-icon-star-on"
        circle
        @click="$emit('like')"
      ></el-button>
    </div>
    <div v-for="(pilot, id) in pilotList" :key="id" class="text item">
      {{ pilot.name }}
    </div>
    <el-button
      type="text"
      icon="el-icon-circle-plus"
      circle
      @click="$emit('create-pilot')"
    ></el-button>
  </el-card>
</template>

<script>
export default {
  name: 'StarCard',
  props: {
    name: { type: String, required: true },
    pilotList: { type: Array, required: true }
  }
}
</script>

<style scoped lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-bottom: 20px;
  text-align: left;
}
.st-scheader {
  display: flex;
  justify-content: space-between;
}
</style>
