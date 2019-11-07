<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ name }}</span>
      </div>
      <div v-for="(ship, id) in shipList" :key="id" class="text item">
        {{ ship.name }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PilotCard',
  props: {
    name: { type: String, required: true },
    shipList: { type: Array, required: true }
  }
}
</script>

<style>
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
}
</style>
