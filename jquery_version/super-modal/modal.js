var Modal = (function() {
	var Modal = function (options) {
		if (!(this instanceof Modal)) { return new Modal(options)}

		// 参数合并			
		this.options = $.extend({
			width: 780,
			height: 500,
			content: '',
			contentId: ''
		}, options)
	}

	Modal.prototype = {
		open: function () {
			var temp_modal = $("<div></div>")
			temp_modal.attr('class', 'temp-modal')

			var html = '<div class="temp-mask"></div>'
						+ '<div class="temp-wrap">'
						+ '<span class="temp-close">&times;</span>'
						+ '<div class="temp-content"></div>'
						+ '</div>'

			temp_modal.html(html)

			$('body').append(temp_modal)
			
			this.setStyle()
			this.setContent()
			this.setEventListener()
		},
		close: function () {
			// 将内容放回原来位置
			$('.temp-content').children().css("display", "none")
			$("body").append($('.temp-content').children())	
			//移除模态框
			$(".temp-modal").remove()
		},
		setStyle: function () {
			// 设置宽高
			$('.temp-wrap').css('width', this.options.width + 'px')
			$('.temp-wrap').css('height', this.options.height + 'px')

			// 根据宽高设置边距 居中
			$('.temp-wrap').css('marginLeft', - parseFloat((this.options.width / 2)) + 'px')
			$('.temp-wrap').css('marginTop', - parseFloat((this.options.height / 2)) - 24 +  'px')
		},
		setContent: function () {
			// 将内容添加到temp-content中
			if (this.options.contentId !== '') {
				content = $(this.options.contentId)
				content.css('display', 'block')
				$('.temp-content').append(content)
				$('.temp-content').scrollUnique()
			} else {
				$('.temp-content').html(this.options.content)
			}
		},
		setEventListener: function () {
			// 为mask和close添加事件监听
			$('.temp-close').click(this.close)
			$('.temp-mask').click(this.close)
		}
	}

	return Modal
})()