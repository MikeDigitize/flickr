import { expect } from "chai";
import { getFlickrJson } from "../../js/utils/get-flickr-json";

describe("Get Flickr JSON test", function() {
    it("Should return a promise", function() {
        let flickrData = getFlickrJson();
        expect(flickrData).to.be.an("promise");
    });

    it("Should return data", function() {
        let flickrData = getFlickrJson();
        return flickrData.then(data => {
            expect(data).to.be.an("object");
            expect(data.items).to.be.an("array");
            expect(data.items).to.have.length(20);
        });
    });
});