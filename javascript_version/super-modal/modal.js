var Modal = (function() {
	var Modal = function (options) {
		if (!(this instanceof Modal)) { return new Modal(options)}

		// 参数合并			
		this.options = this.extend({
			width: 780,
			height: 500,
			content: ''
		}, options)
	}

	Modal.prototype = {
		extend: function (obj, obj2) {
			for (var key in obj2) {
				obj[key] = obj2[key]
			}
			return obj
		},
		open: function () {
			var temp_modal = document.createElement('div')
			temp_modal.setAttribute('class', 'temp-modal')	

			var html = '<div class="temp-mask"></div>'
						+ '<div class="temp-wrap">'
						+ '<span class="temp-close">&times;</span>'
						+ '<div class="temp-content"></div>'
						+ '</div>'

			temp_modal.innerHTML = html

			document.body.appendChild(temp_modal)
			
			this.setStyle()

			// 将内容添加到temp-content中
			document.querySelector('.temp-content').innerHTML = this.options.content

			this.setEventListener()
		},
		close: function () {
			var temp_modal = document.querySelector('.temp-modal')
			document.body.removeChild(temp_modal)	
		},
		setStyle: function () {
			// 设置宽高
			document.querySelector('.temp-wrap').style.width = this.options.width + 'px'
			document.querySelector('.temp-wrap').style.height = this.options.height + 'px'

			// 根据宽高设置边距 居中
			document.querySelector('.temp-wrap').style.marginLeft =- parseFloat((this.options.width / 2)) + 'px'
			document.querySelector('.temp-wrap').style.marginTop =- parseFloat((this.options.height / 2)) - 24 +  'px'

		},
		setEventListener: function () {
			// 为mask和close添加事件监听
			document.querySelector('.temp-close').onclick = this.close
			document.querySelector('.temp-mask').onclick = this.close
		}
	}

	return Modal
})()