<template>
  <radius-measure v-if="radiusMeasureOpen" @close="radiusMeasureOpen = false" @clear="getResourcesList"
                  @submit="getResourcesList"/>
</template>

<script>
import radiusMeasure from "./radiusMeasure"
export default {
  name: "dzdx",
  components: {
    radiusMeasure
  },
  data(){
    return{
      radiusMeasureOpen:true,
    }
  },
  methods:{
    getResourcesList(geometry){
      console.log(geometry,121)
    },
  }
};
</script>