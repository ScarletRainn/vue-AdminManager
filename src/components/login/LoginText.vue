<template>
    <div>
        <van-field v-model="content" :label='label' :type="type" :placeholder="placeholder" />
    </div>
</template>

<script>
    export default {
        data(){
            return{
                content:''
            }
        },
        name: "Logintext",
        props:['label','type','placeholder'],
        methods:{
            handlerule(){
                    this.$emit('inputChange',this.content)
            }

        },
        watch:{
            content(){
                this.handlerule()
            }
        }
    }
</script>

<style scoped>

</style>