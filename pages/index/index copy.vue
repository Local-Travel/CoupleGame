<template>
	<view class="container" @touchstart="onTouchStart" @mousedown="onMouseDown">
		  <view class="lake" ref="myView">
		    <view class="water" :style="{top: posY, left: posX}">水</view>
		  </view>
		  <view class="overlay">哈哈哈</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: null,
				phoneNumber: null,
				posY: '50%',
				posX: '50%',
			}
		},
		methods:{
			onTouchStart(event) {
				console.log('触摸点信息', event.touches);
				const e = Array.isArray(event.touches) ? event.touches[0] : null;
				if (e) {
					// uni.createSelectorQuery().in(this).select('.lake').boundingClientRect((rect) => {
					//   console.log(rect)
					//   if (rect) {
					// 	  this.posX = (e.pageX - rect.left) + 'px';
					// 	  this.posY = (e.pageY - rect.top) + 'px';
					// 	  console.log('this.posX', this.posX, this.posY)
					//   }
					// }).exec()
					this.posX = e.clientX + 'rpx';
					this.posY = e.clientY + 'rpx';
				}
				
				 
				 // var posX = e.pageX - $(".lake").offset().left;
				 //  var posY = e.pageY - $(".lake").offset().top;
				 //  $(".water").addClass("active").css({
				 //    top: posY,
				 //    left: posX
				 //  });
			},
			onMouseDown(event) {
				console.log('鼠标坐标信息', event.clientX, event.clientY);
			}
		}
	}
</script>

<style>
	.container {
	  width: 100%;
	  height: 100vh;
	  overflow: hidden;
	  position: relative;
	}
	
	.lake {
	  width: 100%;
	  height: 100%;
	  /* background: url("../../static/lake.png") center center/cover no-repeat; */
	  background-color: aqua;
	  position: relative;
	}
	
	.water {
	  width: 100%;
	  height: 100%;
	  border-radius: 50%;
	  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
	  transform: scale(0.5);
	  position: absolute;
	  background-color: blue;
	  top: 0%;
	  left: 0%;
	  z-index: 1;
	}
	
	.water.active {
	  animation: ripple 1s ease-out;
	}
	
	@keyframes ripple {
	  0% {
	    transform: scale(0);
	    opacity: 1;
	  }
	  50% {
	    transform: scale(1);
	    opacity: 0.5;
	  }
	  100% {
	    transform: scale(2.5);
	    opacity: 0;
	  }
	}

</style>
