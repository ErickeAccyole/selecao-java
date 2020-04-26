<template>
  <div class="revenda-container">
    <el-row type="flex" justify="center">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <el-form ref="revendaForm" :model="revenda" :rules="revendaRules" label-width="120px">
            <el-row>
              <el-col :xs="12" :sm="16" :md="16" :lg="16" :xl="16">
                <el-form-item label="Valor de venda" prop="valorVenda">
                  <el-input-number v-model="revenda.valorVenda" :precision="4" size="mini"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="12" :sm="16" :md="16" :lg="16" :xl="16">
                <el-form-item label="Valor de compra" prop="valorCompra">
                  <el-input-number v-model="revenda.valorCompra" :precision="4" size="small"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="Data da coleta" prop="dataColeta">
                  <el-date-picker
                    v-model="revenda.dataColeta"
                    type="date"
                    placeholder="Selecione a data"
                    format="dd/MM/yyyy"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="Distribuidora" prop="distribuidora">
                  <el-select v-model="revenda.distribuidora.id" placeholder="Distribuidor" size="small">
                    <el-option
                      v-for="item in distribuidores"
                      :key="item.id"
                      :label="item.nome"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="Combustível" prop="combustivel">
                  <el-select v-model="revenda.combustivel.id" placeholder="Combustível" size="small">
                    <el-option
                      v-for="item in combustiveis"
                      :key="item.id"
                      :label="item.nome"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                  <el-button type="primary" size="small" @click="update">Salvar</el-button>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                  <el-button type="info" size="small" @click="backToList">Cancelar</el-button>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDateBR } from '@/utils/index'
export default {
  data() {
    return {
      distribuidores: [],
      combustiveis: [],
      revenda: {
        id: null,
        combustivel: { id: null },
        distribuidora: { id: null },
        valorVenda: null,
        valorCompra: null,
        dataColeta: null
      },
      revendaRules: {
        valorVenda: [
          { validator: this.validaValorVenda, trigger: 'blur' }
        ],
        valorCompra: [
          { validator: this.validaValorCompra, trigger: 'blur' }
        ],
        dataColeta: [
          { required: true, message: 'Preencha o campo data da coleta', trigger: 'blur' }
        ],
        distribuidora: [
          { validator: this.validaDistribuidora, trigger: 'blur' }
        ],
        combustivel: [
          { validator: this.validaCombustivel, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getRevenda(this.$route.params.id)
    this.carregaDistribuidores()
    this.carregaCombustiveis()
  },
  methods: {
    async getRevenda(id) {
      this.revenda = await this.$store.dispatch('revendas/getOne', id)
      this.revenda.dataColeta = null
    },
    async carregaDistribuidores() {
      this.distribuidores = await this.$store.dispatch('distribuidores/getAll')
    },
    async carregaCombustiveis() {
      this.combustiveis = await this.$store.dispatch('combustiveis/getAll')
    },
    backToList() {
      this.$router.push('/revenda/list')
    },
    async update() {
      try {
        if (this.validateForm('revendaForm')) {
          this.revenda.dataColeta = formatDateBR(this.revenda.dataColeta)
          await this.$store.dispatch('revendas/update', this.revenda)
          this.showMessage('Revenda atualizada com sucesso', 'success')
          this.backToList()
        }
      } catch (err) {
        const message = err.message
        this.showMessage(message, 'error')
      }
    },
    validateForm(refForm) {
      let res = false

      this.$refs[refForm].validate((valid) => {
        res = valid
      })

      return res
    },
    showMessage(message, type) {
      this.$message({
        message,
        type
      })
    },
    validaValorVenda(rule, value, callback) {
      if (value === undefined || value === 0.0000) {
        callback(new Error('Preencha o campo valor de venda'))
      } else {
        callback()
      }
    },
    validaValorCompra(rule, value, callback) {
      if (value === undefined || value === 0.0000) {
        callback(new Error('Preencha o campo valor de compra'))
      } else {
        callback()
      }
    },
    validaDistribuidora(rule, value, callback) {
      if (value === null) {
        callback(new Error('Preencha o campo distribuidora'))
      } else {
        callback()
      }
    },
    validaCombustivel(rule, value, callback) {
      if (value === null) {
        callback(new Error('Preencha o campo combustível'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $dark_gray:#889aa4;

  .revenda-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 3px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
