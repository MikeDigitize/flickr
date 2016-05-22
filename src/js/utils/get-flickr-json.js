import "es6-promise";

export function getFlickrJson(tag) {
    return new Promise(function(resolve, reject) {

        var script = document.createElement("script");
        script.src = `http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=flickrcb&tags=${tag}`;
        document.head.appendChild(script);

        // much rather ajax / fetch it with an api key!
        window.flickrcb = data => resolve(data);

    });
}