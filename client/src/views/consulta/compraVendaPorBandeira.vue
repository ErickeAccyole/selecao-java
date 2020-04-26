<template>
  <div class="compraVendaPorBandeira-container">
    <el-table :data="consulta" border style="width: 100%">
      <el-table-column prop="BANDEIRA" label="Bandeira"/>
      <el-table-column prop="MEDIA_VALOR_VENDA" label="Média valor de venda"/>
      <el-table-column prop="MEDIA_VALOR_COMPRA" label="Média valor de compra"/>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      consulta: []
    }
  },
  mounted() {
    this.getConsulta()
  },
  methods: {
    async getConsulta() {
      this.consulta = await this.$store.dispatch('consultas/getMediaValorCompraVendaPorBandeira')
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
.compraVendaPorBandeira-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .btn-add {
    margin-bottom: 10px;
  }
}
</style>
