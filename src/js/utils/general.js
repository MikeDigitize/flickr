export function createReactKey() {
    return Math.random().toString(16).substr(2, 9);
}

export function removeSelected(selected, src) {
    return selected.filter(selectedSrc => selectedSrc !== src);
}

export function containsSelected(selected, src) {
    return ~selected.indexOf(src);
}

export function addLoadListener(el, fn) {
    el.addEventListener("load", fn);
}

export function removeLoadListener(el, fn) {
    el.removeEventListener("load", fn);
}

export function loadImage(src) {
    return new Promise(function (resolve) {
        function onLoad() {
            removeLoadListener(this, onLoad);
            let { width, height, src } = this;
            resolve({ width, height, src });
        }

        let image = new Image();
        addLoadListener(image, onLoad);
        image.src = src;
    });
}

export function loadImages(images) {
    let load = images.map(img => loadImage(img.media.m));
    return Promise.all(load);
}

export function filterImageHeight(images) {
    return images.filter(img => img.height <= 300);
}

export function filterImages(images, flickrData) {
    let imagesToDisplay = filterImageHeight(images);
    return flickrData.map(data => {
        let match = imagesToDisplay.filter(img => img.src === data.media.m).pop();
        data.media.width = match.width;
        data.media.height = match.height;
        return data;
    });
}