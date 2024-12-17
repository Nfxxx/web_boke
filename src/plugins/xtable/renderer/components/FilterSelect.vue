<template>
    <div class="my-filter-select">

            <el-select v-model="option.data.sVal"
                multiple
                filterable
                placeholder = '请输入'
            >
                <el-option v-for="itme in selectOptionList"
                    :key="itme.value"
                    :label="itme.label"
                    :value="itme.value"
                    >
                </el-option>
            </el-select>


            <el-button
                type="primary"
                size="medium"
                @click="confirmFilterEvent"
            >
                查找
            </el-button>


            <el-button
                type="info"
                size="medium"
                @click="resetFilterEvent"
            >
                重置
            </el-button>

    </div>
</template>

<script>
export default {
    name:"FilterSelect",
    props: {
        params: Object,
        renderOpts: Object
    },
    data () {
        return {
            // column: null,
            option: null,
            selectOptionList: [],
        }
    },

    created() {
        this.load()
    },
    methods: {
        load() {
            // console.log("load")
            // console.log(this.renderOpts)

            const {$table,column} =  this.params
            const option = column.filters[0]
            this.option = option

            // console.log(this.option)

            const {options} = this.renderOpts
            this.selectOptionList = options
            // console.log(this.selectOptionList)

        },
        confirmFilterEvent (evnt) {

            // console.log("confirmFilterEvent")

            const { params,option} = this
            const {$panel} = params
            $panel.changeOption(evnt,true,option)
            $panel.confirmFilter()
        },
        resetFilterEvent() {
            const {$panel} = this.params
            $panel.resetFilter()
        }


    }
}
</script>

<style scoped>
.my-filter-select {
    padding:10px;
}

.el-button {
    margin-left: 10px
}
</style>
