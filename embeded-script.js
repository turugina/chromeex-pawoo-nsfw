(function ($) {
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