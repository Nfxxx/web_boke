import * as Orderfilters from '@/filters/OrderFilter'

const Install = Vue => {
    Object.keys(Orderfilters).forEach(key => {
        Vue.filter(key,Orderfilters[key].func)
    })
}


export default Install