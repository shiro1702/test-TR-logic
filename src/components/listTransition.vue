<template>
	<transition-group
		:css="false"
    name="staggered-fade"
		@before-enter="beforeEnter"
		@enter="enter"
		@leave="leave"
	>
		<slot/>
	</transition-group>
</template>

<script>
import Velocity from 'velocity-animate';

export default {
  props: {
    itemHeight: {
      name: '',
      default: '1.6em'
    }
  },
  created() {
    console.log(this.itemHeight);
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      var delay = el.dataset.index * 150
      setTimeout( () => {
        Velocity(
          el,
          { opacity: 1, height: this.itemHeight },
          { complete: done }
        )
      }, delay)
    },
    leave(el, done) {
      var delay = el.dataset.index * 150
      setTimeout( () => {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}

</script>

