var Montage = require("montage").Montage,
TestPageLoader = require("montage-testing/testpageloader").TestPageLoader;

TestPageLoader.queueTest("native-control-test", function(testPage) {
    var test;
    beforeEach(function() {
        test = testPage.test;
    });

    describe("ui/native-control/native-control-spec", function() {

        describe("input text", function() {
            it("can be created", function(){
                var txt1 = test.txt1;
                expect(txt1).not.toBeFalsy();
            });
            it("prototype has the properties for its attributes ", function(){
                var txt1 = test.txt1;
                expect(txt1.accept).not.toBeUndefined();
                //expect(txt1.checked).not.toBeUndefined();
            });

            it("has property descriptors for its attributes ", function(){
                var txt1 = test.txt1;
                expect(txt1._getElementAttributeDescriptor('accept')).not.toBeFalsy();
                expect(txt1._getElementAttributeDescriptor('readonly')).not.toBeFalsy();
            });

            it("does not contain property descriptors for invalid attributes even if value is set in the markup ", function(){
                var txt3 = test.txt3;
                expect(txt3._getElementAttributeDescriptor('min')).toBeFalsy();
                expect(txt3._getElementAttributeDescriptor('max')).toBeFalsy();
            });

            it("only valid attributes can be set on a NativeControl", function() {
                var txt3 = test.txt3;
                expect(txt3.max).toBeUndefined();
            });

            it("only valid attributes are rendered in the DOM ", function() {
                var instance = test.txt2;
                instance.min = '20'; // invalid attribute 'min'

                expect(instance.element.getAttribute('min')).toBeFalsy();
            });

            it("can change value of a valid attribute ", function(done) {
                var instance = test.txt3;
                instance.value = 'hello';
                testPage.waitForDraw().then(function() {
                    expect(instance.element.value).toBe("hello");
                    done();
                });

            });

        });


        describe("textarea and textContent", function() {
            it("can read textcontent as value", function() {
                var instance = test.textarea1;
                expect(instance.value).toBe("hello world");
            });
            it("can change value of a textcontent ", function(done) {
                var instance = test.textarea1;
                instance.value = 'hola';
                testPage.waitForDraw().then(function() {
                    expect(instance.element.value).toBe("hola");
                    done();
                });

            });
        });
    });

});


