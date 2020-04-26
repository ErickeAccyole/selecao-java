<template>
  <div class="importacao-container">
    <el-row type="flex" justify="center">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover">
          <el-upload
            ref="upload"
            :on-exceed="validaLimite"
            :http-request="handleArquivo"
            :on-remove="removeArquivo"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            class="upload-demo"
            action=""
            list-type="application/vnd.ms-excel">
            <el-button slot="trigger" size="small" type="primary">Selecione o arquivo</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="importaArquivo">Upload</el-button>
            <div slot="tip" class="el-upload__tip">Arquivo csv até 200mb</div>
          </el-upload>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      arquivoCsv: null
    }
  },
  mounted() {
  },
  methods: {
    validaLimite() {
      this.showMessage('Só é possivel adicionar um arquivo!', 'error')
      return false
    },
    beforeAvatarUpload(file) {
      const tamanhoArquivo = file.size / 1024 / 1024

      if (file.type !== 'application/vnd.ms-excel') {
        this.showMessage('Tipo de arquivo inválido!', 'error')
        return false
      }

      if (tamanhoArquivo > 200) {
        this.showMessage('O tamanho do arquivo deve ser menor que 200 Mb!', 'error')
        return false
      }
    },
    handleArquivo(file) {
      this.arquivoCsv = file.file
    },
    removeArquivo() {
      this.arquivoCsv = null
    },
    async importaArquivo() {
      if (this.arquivoCsv === null) {
        this.showMessage('Necessário informar um arquivo!', 'error')
      } else {
        try {
          const formData = new FormData()
          formData.append('file', this.arquivoCsv)

          await this.$store.dispatch('importacao/importaArquivoCsv', formData)
          this.showMessage('Arquivo importado com sucesso!', 'success')
          this.arquivoCsv = null
        } catch (err) {
          this.showMessage(err.message, 'error')
        }
      }
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
  $dark_gray:#889aa4;

  .importacao-container {
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
