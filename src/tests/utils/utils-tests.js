import { expect } from "chai";
import { getFlickrJson } from "../../js/utils/get-flickr-json";
import { createReactKey, loadImage } from "../../js/utils/general";

describe("Get Flickr JSON test", function() {

    it("Should return a promise", function() {

        let flickrData = getFlickrJson();
        expect(flickrData).to.be.an("promise");

    });

    it("Should return data from the flickr API", function() {

        let flickrData = getFlickrJson();
        return flickrData.then(data => {
            expect(data).to.be.an("object");
            expect(data.items).to.be.an("array");
            expect(data.items).to.have.length(20);
        });
    });

});

describe("Create React Key test", function() {

    it("Should create a random string", function() {

        let key = createReactKey();
        expect(key).to.be.a("string");
        expect(key).to.have.length.within(5, 10);
        expect(key).to.match(/\d/);
        expect(key).to.match(/\w/);

    });

});

describe("Load image(s) test", function() {

    let path1 = "http://farm8.staticflickr.com/7125/27238119871_02c6dee132_m.jpg";
    let path2 = "http://farm8.staticflickr.com/7024/27274280266_f002452d0b_m.jpg";
    let path3 = "http://farm8.staticflickr.com/7392/27237767311_6b5375c86e_m.jpg";

    it("Should return a promise", function() {

        let load = loadImage(path1);
        expect(load).to.be.an("promise");

    });

    it("Should resolve on image load and send back the width, height and src", function() {

        let load = loadImage(path1);
        return load.then(data => {
            expect(data).to.be.an("object");
            expect(data.src).to.be.a("string");
            expect(data.width).to.be.a("number");
            expect(data.height).to.be.a("number");
        });

    });

});