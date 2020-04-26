<template>
  <div class="revenda-container">
    <el-row type="flex" class="row-bg btn-add" justify="end">
      <el-col :span="1">
        <el-button type="success" icon="el-icon-plus" circle @click="handleCreate"/>
      </el-col>
    </el-row>
    <el-table :data="revendas" border style="width: 100%">
      <el-table-column prop="distribuidora.nome" label="Distribuidora"/>
      <el-table-column prop="distribuidora.cnpj" label="Distribuidora CNPJ"/>
      <el-table-column prop="distribuidora.bandeira" label="Bandeira"/>
      <el-table-column prop="combustivel.nome" label="Combustível"/>
      <el-table-column prop="valorCompra" label="Valor compra"/>
      <el-table-column prop="valorVenda" label="Valor venda"/>
      <el-table-column prop="dataColeta" label="Data coleta"/>
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
      revendas: []
    }
  },
  mounted() {
    this.getRevendas()
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
        await this.$store.dispatch('revendas/delete', row.id)
        this.showMessage('Revenda removida com sucesso', 'success')
        this.getRevendas()
      } catch (err) {
        const message = err.message
        this.showMessage(this.$t(`customMessages.${message}`), 'error')
      }
    },
    async getRevendas() {
      this.revendas = await this.$store.dispatch('revendas/getAll')
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
.revenda-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .btn-add {
    margin-bottom: 10px;
  }
}
</style>
