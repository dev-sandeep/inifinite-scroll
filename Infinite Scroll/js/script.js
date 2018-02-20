$(document).ready(function () {
    var i = 1
    function init() {
        apiCall("http://tapdiscover.com:9000/design-suggestions/?category=lehenga&page=" + i).then(function (data) {
            /* parsing the data and pushing to HTML */
            appendImageHTML(data.results)
        });
    }
    init(i);

    /* for detcting the end of page scroll */
    $(window).on("scroll", function () {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            // when scroll to bottom of the page
            console.log("end of page");
            init(i++);
        }
    });

    function appendImageHTML(data) {
        var imageUrl = "", mainContainerHTMLStr = '';
        for (var i = 0; i < data.length; i++) {
            imageUrl = data[i].image_link;
            mainContainerHTMLStr += createImageHTML(imageUrl);
        }

        $("#image-container").append(mainContainerHTMLStr);
    }

    /* function to craete the HTML */
    function createImageHTML(imageUrl) {
        var str =
            '<div class="col-lg-4 col-md-6 col-sm-12">' +
            '<img class="image-container" src="' + imageUrl + '" />' +
            '</div>';

        return str;
    }

    /* calling the api to get result */
    function apiCall(link) {
        return $.Deferred(function () {
            if (!link) {
                self.reject("Invalid Api Url");
            }

            var self = this;
            $.ajax({
                url: link,
                success: function (data) {
                    self.resolve(data);
                },
                error: function (e) {
                    self.reject(e);
                }
            });
        });
    }
});