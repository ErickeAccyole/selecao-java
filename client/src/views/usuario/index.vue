<template>
  <div class="employee-container">
    <el-row type="flex" class="row-bg btn-add" justify="end">
      <el-col :span="1">
        <el-button type="success" icon="el-icon-plus" circle @click="handleCreate"/>
      </el-col>
    </el-row>
    <el-table :data="usuarios" border style="width: 100%">
      <el-table-column prop="username" label="Login"/>
      <el-table-column prop="nome" label="Nome"/>
      <el-table-column prop="tipo" label="Perfil"/>
      <el-table-column label="Ações">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"/>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      usuarios: []
    }
  },
  mounted() {
    this.getUsuarios()
  },
  methods: {
    handleCreate() {
      this.$router.push('create')
    },
    handleEdit(row) {
      this.$router.push(`edit/${row.id}`)
    },
    async handleDelete(row) {
      try {
        await this.$store.dispatch('usuarios/delete', row.id)
        this.showMessage('Usuário removido com sucesso', 'success')
        this.getUsuarios()
      } catch (err) {
        const message = err.message
        this.showMessage(this.$t(`customMessages.${message}`), 'error')
      }
    },
    async getUsuarios() {
      this.usuarios = await this.$store.dispatch('usuarios/getAll')
    },
    showMessage(message, type) {
      this.$message({
        message,
        type
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.employee-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .btn-add {
    margin-bottom: 10px;
  }
}
</style>
