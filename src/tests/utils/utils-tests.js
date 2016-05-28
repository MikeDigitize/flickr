import { expect } from "chai";
import { getFlickrJson } from "../../js/utils/get-flickr-json";
import { getColumnSizes, sortByColumnSize, removeOffsetClass, sortLowestToHighest } from "../../js/utils/general";

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

describe("Extract column sizes from string of bootstrap classes", function() {

    let testClass1 = "col-sm-3";
    let testClass2 = "col-xs-2 col-md-6";
    let testClass3 = "col-sm-3 col-md-4 col-lg-2";
    let testClass4 = "col-sm-3 col-md-offset-4 col-lg-2";
    let testClass5 = "col-sm-offset-3 col-sm-3";

    it("Should return an array of results based on amount of classes passed in to getColumnSizes", function() {
        let matches = getColumnSizes(testClass1);
        expect(matches).to.have.lengthOf(1);

        matches = getColumnSizes(testClass2);
        expect(matches).to.have.lengthOf(2);

        matches = getColumnSizes(testClass3);
        expect(matches).to.have.lengthOf(3);

        matches = getColumnSizes(testClass4);
        expect(matches).to.have.lengthOf(3);

        matches = getColumnSizes(testClass5);
        expect(matches).to.have.lengthOf(2);

        matches = getColumnSizes("");
        expect(matches).to.have.lengthOf(0);
    });

    it("Should replace offset from the classnames returned from getColumnSizes", function () {
        let matches = getColumnSizes(testClass4);
        expect(matches[1]).to.contain("offset");
        matches = removeOffsetClass(matches);
        expect(matches[1]).to.not.contain("offset");

        matches = getColumnSizes(testClass5);
        expect(matches[0]).to.contain("offset");
        matches = removeOffsetClass(matches);
        expect(matches[0]).to.not.contain("offset");

        matches = getColumnSizes(testClass1);
        matches.forEach(match => expect(match).to.not.contain("offset"));
        matches = removeOffsetClass(matches);
        matches.forEach(match => expect(match).to.not.contain("offset"));
    });

    it("Should sort the classnames and return the highest column width from sortByColumnSize", function () {
        let matches = getColumnSizes(testClass2);
        matches = removeOffsetClass(matches);
        matches = sortByColumnSize(matches);
        expect(matches[0]).to.equal("md");

        matches = getColumnSizes(testClass3);
        matches = removeOffsetClass(matches);
        matches = sortByColumnSize(matches);
        expect(matches[0]).to.equal("lg");

        matches = getColumnSizes(testClass4);
        matches = removeOffsetClass(matches);
        matches = sortByColumnSize(matches);
        expect(matches[0]).to.equal("lg");
    });

});