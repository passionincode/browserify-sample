var proxyquire = require('proxyquireify')(require);

describe('the taskModule', function() {
    describe('add function', function() {
        it('calls taskRenderer.renderNew', function() {

            var taskRenderer = {
                renderNew: function() {}
            };

            var mocks = {
                './renderers/taskRenderer': taskRenderer
            };

            var tasks = proxyquire('../src/js/tasks', mocks);

            spyOn(taskRenderer, "renderNew");

            tasks.add();

            expect(taskRenderer.renderNew).toHaveBeenCalled();
        });
    });
});