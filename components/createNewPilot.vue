<template>
  <div>
    <el-dialog title="Добавить пилота" v-bind="$attrs" v-on="$listeners">
      <el-form :model="form">
        <el-form-item label="Имя пилота" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">Отмена</el-button>
        <el-button type="primary" @click="create">Добавить</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    star: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    create() {
      this.$emit('add-pilot', { name: this.form.name, star: this.star })
      this.$emit('update:visible', false)
      this.form.name = ''
    }
  }
}
</script>
