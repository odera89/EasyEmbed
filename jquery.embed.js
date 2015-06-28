;(function ($, window, document) {
    $.fn.embed = function (options) {
        var that = this;

        var settings = $.extend({
            id: this.data('id') || "ScMzIvxBSi4"
        }, options);

        var getThumbnail = function (callback) {
            var base = '//img.youtube.com/vi/' + settings.id + '/';
            var sizes = ['maxresdefault', 'hqdefault'];

            (function getImage() {
                var url = base + sizes[0] + '.jpg';

                $("<img/>").attr('src', url).load(function () {
                    if (this.width != 120 && this.height != 90) {
                        if (callback) callback({
                            url: url,
                            width: this.width,
                            height: this.height
                        })
                    } else {
                        sizes.shift();
                        getImage();
                    }
                })
            })();
        };

        var setThumbnail = function (url) {
            that.css('background', 'black url(' + url + ') 50% 50% / cover no-repeat');
        };

        var setSize = function (width, height) {
            that.css('height', that.width() / width * height);
        };

        getThumbnail(function (data) {
            setThumbnail(data.url);

            setSize(data.width, data.height);

            $(window).resize(function () {
                setSize(data.width, data.height);
            })
        });

        that.find('*').addBack().click(function () {
            that.html($('<iframe>')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('src', '//youtube.com/embed/' + settings.id + '?rel=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0')
                .attr('frameborder', 0))
        });

        return this;
    };

    $(document).ready(function () {
        $('[data-embed]').embed();
    })
})(jQuery, window, document);