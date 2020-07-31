<template>
    <div class="top">{{middletop}}</div>
</template>

<script>
    export default {
        name: "Logintop",
        props:['middletop']
    }
</script>

<style >
.top {
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}

</style>