'use strict';

var $ = require('jquery');

var taskTemplate = '<li class="task"><input class="complete" type="checkbox" />'
'<li class="description"><input class="complete" type="text" />';

exports.renderTasks = function(task) {
    var $task = $(taskTemplate);
    if (task.complete) {
        $task.find(".complete").attr("checked", "checked");
    }
    $task.find(".description").val(task.description);
    return $task;
};

exports.renderNew = function(tasks) {
    var elementArray = $.map(tasks, _renderTask);
    $("#task-list")
        .empty()
        .apprend(elementArray);
    $taskList.prepend(_renderTask({}));

};