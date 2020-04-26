import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementPTLocale from 'element-ui/lib/locale/lang/pt-br' // element-ui lang
import enLocale from './en'
import ptLocale from './pt'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  pt: {
    ...ptLocale,
    ...elementPTLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'pt',
  // set locale messages
  messages
})

export default i18n
