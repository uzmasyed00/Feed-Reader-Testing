/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('URL for each feed is defined', function(){
            for(var i=0; i<allFeeds.length;i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy();
            }
        });


        it('Name for each feed is defined', function(){
            for(var i=0; i<allFeeds.length;i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
            }
        });
    });


    describe('Menu', function() {

        it('Menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        it('Menu changes visibility when the menu icon is clicked', function () {
            var menuIcon = $('.menu-icon-link')
            menuIcon.click()
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click()
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    describe("Initial Entries", function(){
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('container should have atleast a single entry',function(done){
            //expect($(".feed").children().children()[0].className).toBe('entry')
            expect($(".feed .entry").length).toBeGreaterThan(0);
            //expect($(".feed").children().children().length).toBeGreaterThan(0)
            done();

        });
    });


    describe("New Feed Selection", function(){
        var contentFirstFeed
        beforeEach(function(done){
            loadFeed(0, function(){
                contentFirstFeed = $(".feed").children()[0].innerHTML

                loadFeed(1, function(){
                    done();
                });
            });


        });

        it('Content should change when a new feed is loaded',function(done){
            var contentSecondFeed = $(".feed").children()[1].innerHTML

            expect(contentFirstFeed).not.toBe(contentSecondFeed);

            done();

        });
    });

}());
