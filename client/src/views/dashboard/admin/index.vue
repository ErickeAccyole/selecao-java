<template>
  <div class="dashboard-editor-container">
    <panel-group/>
    <!-- <box-card/> -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import BoxCard from './components/BoxCard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    BoxCard
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
