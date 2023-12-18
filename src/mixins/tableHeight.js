export default {
  data() {
    return {
      tableHeight: null,
    }
  },
  mounted() {
    this.handleHeight()
    // window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleHeight () {
      const table = this.$el.querySelector('.table-content')
      this.tableHeight = table.offsetHeight - 65
    },
    handleResize () {
      this.handleHeight()
    }
  },
  beforeDestroy() {
    // window. removeEventListener('resize', this.handleResize)
  }
}