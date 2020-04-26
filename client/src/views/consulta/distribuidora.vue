<template>
  <div class="distribuidora-container">
    <el-table :data="consulta" border style="width: 100%">
      <el-table-column prop="DISTRIBUIDORA" label="Distribuidora"/>
      <el-table-column prop="DISTRIBUIDORA_CNPJ" label="Distribuidora CNPJ"/>
      <el-table-column prop="REGIAO" label="Região"/>
      <el-table-column prop="ESTADO" label="Estado"/>
      <el-table-column prop="MUNICIPIO" label="Municipio"/>
      <el-table-column label="Data coleta">
        <template slot-scope="scope">
          <span>{{ formataData(scope.row.DATA_COLETA) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="VALOR_COMPRA" label="Valor de compra"/>
      <el-table-column prop="VALOR_VENDA" label="Valor de venda"/>
      <el-table-column prop="COMBUSTIVEL" label="Combustível"/>
      <el-table-column prop="UNIDADE_MEDIDA" label="Unidade de medida"/>
    </el-table>
  </div>
</template>

<script>
import { formatDateBR } from '@/utils/index'
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
      this.consulta = await this.$store.dispatch('consultas/getInformacoesAgrupadosPorDistribuidora')
    },
    formataData(data) {
      return formatDateBR(data)
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
.distribuidora-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .btn-add {
    margin-bottom: 10px;
  }
}
</style>
