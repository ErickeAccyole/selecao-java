<template>
  <div class="usuario-container">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover">
          <el-form ref="myAccountForm" :model="usuario" :rules="usuarioRules" label-width="120px">
            <el-form-item label="Nome" prop="nome">
              <el-input v-model="usuario.nome" size="small"/>
            </el-form-item>
            <el-form-item label="Login" prop="username">
              <el-input v-model="usuario.username" size="small" disabled />
            </el-form-item>
            <el-form-item label="Perfil" prop="type">
              <el-select v-model="usuario.type" placeholder="Perfil" size="small" disabled>
                <el-option value="Administrador" label="Administrador"/>
                <el-option value="Garçom" label="Garçom"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="updateMyAccount">Salvar</el-button>
              <el-button type="info" size="small" @click="backPage">Cancelar</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover">
          <el-form
            id="form-edit-password"
            ref="formEditPassword"
            :model="senhaUsuario"
            :rules="senhaRules"
            label-position="top">
            <el-row :gutter="24">
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="Nova senha" prop="novaSenha">
                  <el-input id="input-password-new" :minlength="minpasswordlength" :maxlength="maxpasswordlength" v-model="senhaUsuario.novaSenha" type="password"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-form-item label="Confirmar senha" prop="confirmaSenha">
                  <el-input id="input-password-confirm" :minlength="minpasswordlength" :maxlength="maxpasswordlength" v-model="senhaUsuario.confirmaSenha" type="password"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item>
                  <el-button type="primary" size="small" @click="updatePassword">Salvar</el-button>
                  <el-button type="info" size="small" @click="backPage">Cancelar</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      usuario: {
        id: null,
        username: null,
        tipo: null,
        nome: null
      },
      senhaUsuario: {
        novaSenha: '',
        confirmaSenha: ''
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
      },
      senhaRules: {
        novaSenha: [
          { required: true, message: 'Preencha o campo senha', trigger: 'blur' },
          { min: 3, max: 8, message: 'O tamanho do campo deve conter entre 3 e 8 caracteres', trigger: 'blur' },
          { validator: this.validatePass, trigger: 'blur' }
        ],
        confirmaSenha: [
          { required: true, message: 'Preencha o campo confirmar senha', trigger: 'blur' },
          { validator: this.validateConfirmPass, trigger: 'blur' }
        ]
      },
      minpasswordlength: 3,
      maxpasswordlength: 8
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    this.getUsuario(this.user.id)
  },
  methods: {
    backPage() {
      this.$router.go(-1)
    },
    async updateMyAccount() {
      try {
        if (this.validateForm('myAccountForm')) {
          const data = {
            id: this.usuario.id,
            nome: this.usuario.nome,
            username: this.usuario.username
          }

          await this.$store.dispatch('usuarios/updateMyAccount', data)
          this.showMessage('Usuário atualizado com sucesso', 'success')
        }
      } catch (err) {
        const message = err.message
        this.showMessage(this.$t(`customMessages.${message}`), 'error')
      }
    },
    async updatePassword() {
      try {
        if (this.validateForm('formEditPassword')) {
          const data = {
            id: this.usuario.id,
            password: this.senhaUsuario.novaSenha
          }

          await this.$store.dispatch('usuarios/updatePassword', data)

          this.showMessage('Senha atualizada com sucesso', 'success')
          this.resetPassword()
        }
      } catch (err) {
        const message = err.message
        this.showMessage(this.$t(`customMessages.${message}`), 'error')
      }
    },
    async getUsuario(id) {
      this.usuario = await this.$store.dispatch('usuarios/getOne', id)
    },
    validatePass(rule, value, callback) {
      if (this.senhaUsuario.confirmaSenha !== '') {
        this.$refs.formEditPassword.validateField('confirmaSenha')
      }

      callback()
    },
    validateConfirmPass(rule, value, callback) {
      if (value !== this.senhaUsuario.novaSenha) {
        callback(new Error('As senhas não coincidem'))
      } else {
        callback()
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
    resetPassword() {
      this.senhaUsuario = {
        novaSenha: '',
        confirmaSenha: ''
      }
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
