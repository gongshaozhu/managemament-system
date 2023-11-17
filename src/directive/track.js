// import 'intersection-observer'
export default {
  install (Vue) {
    Vue.directive('track-event', {
      inserted (el) {
        el.onclick = function () {
          // const value = binding.value
          // const data = {}
          // value && reportEvent(data)
        }
      }
    })

    Vue.directive('track-exposure', {
      inserted: function (el) {
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            // const value = binding.value
            // const data = {}
            // value && reportEvent(data)
            observer.unobserve(el)
          }
        })
        observer.observe(el)
      }
    })
  }
}
