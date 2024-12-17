import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { message as zh }  from '@/i18n/zh'
import { message as en }  from '@/i18n/en'
Vue.use(VueI18n)


const i18n = new VueI18n({ 

     locale: 'en', // 定义默认语言为英文
    //  locale: 'zh',

     messages: {   

        'zh': zh,   

        'en': en 

      }

});

export {
    i18n
}

