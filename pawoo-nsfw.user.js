// ==UserScript==
// @name         pawoo NSFW
// @namespace    http://dev.floralcompany.jp/pawoo-nsfw
// @version      0.1
// @description  pawoo.netで画像を投稿する時に勝手にNSFWにチェック入れるやつ
// @author       turugina (turugina@floralcompany.jp)
// @match        https://pawoo.net/*
// @grant        none
// @website      https://github.com/turugina/chromeex-pawoo-nsfw
// @run-at document-end
// ==/UserScript==

(function ($) {
    'use strict';

    var $button = $("button:contains(NSFW)");
    if ($button.length === 1) {
        var $container = $button.parent();
        var prevContainerDisp = $container.css("display");
        setInterval(function () {
            var containerDisp = $container.css("display");
            if (prevContainerDisp === "none" && prevContainerDisp !== containerDisp) {
                if (!$button.hasClass("active")) {
                    $button.click();
                }
            }
            prevContainerDisp = containerDisp;
        }, 1000);
    }
})(window.jQuery);