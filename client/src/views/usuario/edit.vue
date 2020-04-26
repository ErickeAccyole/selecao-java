<template>
  <div class="usuario-container">
    <el-row type="flex" justify="center">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <el-form ref="usuarioForm" :model="usuario" :rules="usuarioRules" label-width="120px">
            <el-row>
              <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="Nome" prop="nome">
                  <el-input v-model="usuario.nome" size="small"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="Login" prop="username">
                  <el-input v-model="usuario.username" size="small"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="Perfil" prop="tipo">
                  <el-select v-model="usuario.tipo" placeholder="Profile" size="small">
                    <el-option value="Administrador" label="Administrador"/>
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

export default {
  data() {
    return {
      usuario: {
        id: null,
        username: null,
        tipo: null,
        nome: null
      },
      usuarioRules: {
        nome: [
          { required: true, message: 'Preencha o campo nome', trigger: 'blur' },
          { min: 4, max: 100, message: 'O tamanho do campo deve conter entre 4 e 100 caracteres', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Preencha o campo login', trigger: 'blur' },
          { min: 3, max: 6, message: 'O tamanho do campo deve conter entre 3 e 6 caracteres', trigger: 'blur' }
        ],
        tipo: [
          { required: true, message: 'Preencha o campo perfil', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getEmployee(this.$route.params.id)
  },
  methods: {
    backToList() {
      this.$router.push('/usuario/list')
    },
    async update() {
      try {
        if (this.validateForm('usuarioForm')) {
          await this.$store.dispatch('usuarios/update', this.usuario)
          this.showMessage('Usuário atualizado com sucesso', 'success')
          this.backToList()
        }
      } catch (err) {
        const message = err.message
        this.showMessage(this.$t(`customMessages.${message}`), 'error')
      }
    },
    async getEmployee(id) {
      this.usuario = await this.$store.dispatch('usuarios/getOne', id)
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .usuario-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
  }
</style>
