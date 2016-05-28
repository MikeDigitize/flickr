export function createReactKey() {
    return Math.random().toString(16).substr(2, 9);
}

export function removeSelected(selected, src) {
    return selected.filter(selectedSrc => selectedSrc !== src);
}

export function containsSelected(selected, src) {
    return ~selected.indexOf(src);
}

export function addEventListener(el, fn) {
    el.addEventListener("load", fn);
}

export function removeEventListener(el, fn) {
    el.addEventListener("load", fn);
}

export function loadImage(src) {

    return new Promise(function (resolve) {

        function onLoad() {
            removeEventListener(this, onLoad);
            let { width, height, src } = this;
            resolve({ width, height, src });
        }

        let image = new Image();
        addEventListener(image, onLoad);
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

export function getColumnSizes(bootstrapClass) {
    return bootstrapClass.match(/xs-(\w+-)?\d+|sm-(\w+-)?\d+|md-(\w+-)?\d+|lg-(\w+-)?\d+|xl-(\w+-)?\d+/gi) || [];
}

export function sortByColumnSize(bootstrapClasses) {

    let xs = bootstrapClasses.filter(cls => cls[0] === "xs").sort((a, b) => sortLowestToHighest(a, b));
    let sm = bootstrapClasses.filter(cls => cls[0] === "sm").sort((a, b) => sortLowestToHighest(a, b));
    let md = bootstrapClasses.filter(cls => cls[0] === "md").sort((a, b) => sortLowestToHighest(a, b));
    let lg = bootstrapClasses.filter(cls => cls[0] === "lg").sort((a, b) => sortLowestToHighest(a, b));
    let xl = bootstrapClasses.filter(cls => cls[0] === "xl").sort((a, b) => sortLowestToHighest(a, b));

    return [].concat(xs, sm, md, lg, xl).pop();

}

export function removeOffsetClass(bootstrapClasses) {
    return bootstrapClasses
        .map(cls => cls.replace("offset", "").split("-"))
        .map(cls => cls.filter(cls => cls));
}

export function sortLowestToHighest(a, b) {
    return Number(a[1]) - Number(b[1]);
}

export function getColumnInfo(bootstrapClass) {
    let bootstrapClasses = getColumnSizes(bootstrapClass);
    let classes = removeOffsetClass(bootstrapClasses);
    console.log("result", sortByColumnSize(classes), bootstrapClasses.map(cls => `col-${cls}`));
}