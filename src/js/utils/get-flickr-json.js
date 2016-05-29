import "es6-promise";

export function getFlickrJson(tag) {

    return new Promise(function(resolve, reject) {
        var script = document.createElement("script");
        script.src = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=flickrcb&tags=${tag}`;
        document.head.appendChild(script);

        // ajax / fetch it with an api key please!!
        window.flickrcb = (function () {
            setTimeout(function () {
                reject("api.flickr.com took too long to respond");
                delete window.flickrcb; // this message will self destruct
            }, 2000);
            return function (data) {
                resolve(data);
                delete window.flickrcb;
            }
        })();
    });

}