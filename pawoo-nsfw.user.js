// ==UserScript==
// @name         pawoo NSFW
// @namespace    http://dev.floralcompany.jp/pawoo-nsfw
// @version      0.3
// @description  pawoo.netで画像を投稿する時に勝手にNSFWにチェック入れるやつ
// @author       turugina (turugina@floralcompany.jp)
// @match        https://pawoo.net/*
// @include      https://pawoo.net/*
// @require      https://code.jquery.com/jquery-3.2.1.slim.min.js
// @grant        none
// @website      https://github.com/turugina/chromeex-pawoo-nsfw
// @run-at document-end
// ==/UserScript==

(function ($) {
	'use strict';
	$(function () {
		var $body = $("body");
		var $cfgPanel, $cfgButton;
		$cfgPanel = $('<div></div>')
			.css({
				position: "fixed",
				display: "block",
				top: "2px",
				right: "2px",
				width: "160px",
				height: "80px",
				"background-color": "aliceblue",
				"color": "black",
				"border": "1px solid blue",
				"z-index": 999,
				"margin": "4px"
			})
			.hide()
			.on('mouseleave', function() {
				$(this).hide(2000);
				$cfgButton.show(2000);
			})
			.append(
				$("<p>pawoo-NFSW 設定</p>")
					.css({
						"background-color": "grey",
						"font-weight": "bold",
						"text-align": "center"
					})
			)
			.append(
				$("<p></p>")
					.append("<input type='checkbox' checked='checked' id='pawoo-nsfw-auto-nsfw' value='1' style='cursor: pointer'/>")
					.append("<label for='pawoo-nsfw-auto-nsfw' style='cursor: pointer'>自動NSFWチェック</label>")
			)
			.append(
				$("<p></p>")
					.append(
						$("<input type='checkbox' id='pawoo-nsfw-auto-nsfw-break' value='1' style='cursor: pointer'/>")
							.on('change', function(ev) {
								if ( !ev.target.checked ) {
									$("div.pawoo-nsfw-broken-spoiler").find("i.fa-eye").parent("button").click();
								}
							})
					)
					.append("<label for='pawoo-nsfw-auto-nsfw-break' style='cursor: pointer'>自動不適切外し</label>")
			)
		;
		$cfgButton = $('<a href="#" class="drawer__tab" title="pawoo-NSFW config"></a>')
			.append("<i class='fa fa-fw fa-cog'></i>")
			.css({
				position: "fixed",
				display: "block",
				top: "2px",
				right: "2px",
				opacity: "0.4",
				width: "24px",
				height: "24px",
				"z-index": 999
			})
			.on('mouseenter', function() {
				$(this).css({
					opacity: "1.0"
				});
			})
			.on('mouseleave', function() {
				$(this).css({
					opacity: "0.4"
				});
			})
			.on('click', function() {
				$cfgPanel.show("fast");
				$(this).hide("slow");
			})
		;
		$body.append($cfgPanel).append($cfgButton);
		var $button = $("button:contains(NSFW)");
		if ($button.length === 1) {
			var $container = $button.parent();
			var prevImgCount = $('div.compose-form__modifiers div[style*="img.pawoo.net"]').length;
			setInterval(function () {
				var imgCount = $('div.compose-form__modifiers div[style*="img.pawoo.net"]').length;
				if (prevImgCount === 0 && prevImgCount !== imgCount) {
					if (!$button.hasClass("active") && $('#pawoo-nsfw-auto-nsfw:checked').val() ) {
						$button.click();
					}
				}
				prevImgCount = imgCount;
				if ( $("#pawoo-nsfw-auto-nsfw-break:checked").val() ) {
					var $spoiler = $("div.media-spoiler");
					$spoiler.parent().addClass("pawoo-nsfw-broken-spoiler");
					$spoiler.click();
				}
			}, 1000);
		}
	});
})(window.jQuery);
