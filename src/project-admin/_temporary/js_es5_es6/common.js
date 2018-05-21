/**
 * Created by mole【731913218@qq.com】 on 2018/5/14 上午10:23.
 * @Name: common
 * @description:
 */

(function () {
	"use strict";

	define(['jquery'],function($){
		let $body = $("body");
		let ua = navigator.userAgent.toLowerCase();
		let eventType = ua.match('android')?'click':'tap';
		let SMS_TIME = 60;

		$body.delegate("input[readonly]","click",function () {
			document.activeElement.blur();
		});
		return {
			ua : ua,
			eventType : eventType,
			getQueryString: function (name) {
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				if (r != null)
					return decodeURI(r[2]);
				return null;
			},
			getVerifyCode: function ($obj) {
				let time = SMS_TIME;
				let timer = setInterval(function () {
					if(time>0){
						$obj.text(time+'s后重新获取');
						$obj.addClass('disabled');
						time--;
					}
					else{
						$obj.text('点击获取');
						clearInterval(timer);
						$obj.removeClass('disabled');
					}
				},1000);
			},

			init: function (initCallback) {
				console.log("init...");
				if(initCallback){
					initCallback();
				}
			}
		};
	});
}());