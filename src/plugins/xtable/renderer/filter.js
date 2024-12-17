import Vue from 'vue'
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'
import FilterInput from './components/FilterInput'
import FilterSelect from './components/FilterSelect'
Vue.component(FilterInput.name, FilterInput)
Vue.component(FilterSelect.name, FilterSelect)

VXETable.renderer.add("FilterInput",{
    // 筛选模板
    renderFilter(h,renderOpts, params) {
      return [
        <filter-input params={params}> </filter-input>
      ]
    },
    // 筛选方法
    filterMethod({option,row,column}) {
      const {data} = option
      const cellValue = XEUtils.get(row, column.property)
      if (cellValue) {
        return cellValue.indexOf(data) > -1
      }
      return false
    }
  })


  VXETable.renderer.add("FilterSelect",{
    isFooter: false,
    // 筛选模板
    renderFilter(h,renderOpts, params) {
        // console.log("renderFilter")
        // console.log(params)
        // console.log(renderOpts)

      return [
        <filter-select params={params} renderOpts={renderOpts} > </filter-select>
      ]
    },
    // 筛选方法
    filterMethod({option,row,column}) {
        // console.log("触发 filterMethod")

        // console.log(option)
        // console.log(row)
        // console.log(column)

        const {sVal} = option.data
        // console.log(sVal)
        // console.log("sVal")
        // console.log(sVal.length)
        // if (!sVal.length ){
        //     return
        // }
        // console.log(sVal)
        const cellValue = XEUtils.get(row, column.property)
        if(!sVal.length) {
            // console.log("当前值为空")
            // console.log(cellValue)
            return cellValue
        }
        // console.log(cellValue)
        const res  =  sVal.includes(cellValue)
        // console.log("当前筛选条目数量")
        // console.log(res)
        // console.log(res.length)

        return res

    },
    // 重置筛选数据方法
    filterResetMethod ({options}){
        // console.log("触发 重置筛选数据方法")
        // console.log(options)
        options.forEach(option => {
            option.data = { sVal:[]}
        })
    }


  })
