// ==UserScript==
// @name         pawoo NSFW
// @namespace    http://dev.floralcompany.jp/pawoo-nsfw
// @version      0.2
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
        var $button = $("button:contains(NSFW)");
        if ($button.length === 1) {
            var $container = $button.parent();
            var prevImgCount = $('div.compose-form__modifiers div[style*="img.pawoo.net"]').length;
            setInterval(function () {
                var imgCount = $('div.compose-form__modifiers div[style*="img.pawoo.net"]').length;
                if (prevImgCount === 0 && prevImgCount !== imgCount) {
                    if (!$button.hasClass("active")) {
                        $button.click();
                    }
                }
                prevImgCount = imgCount;
            }, 1000);
        }
    });
})(window.jQuery);