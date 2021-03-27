module.exports = function(app){

    // --- ROUTING
    app.get('/', function(request, response) {
        response.render('index.html');
    });

    app.get('/TestSavingTest', function(request, response) {
        response.render('savetesting.html');
    });

    app.get('/WorkingMemoryPractice', function(request, response) {
        response.render('workingmemorypractice.html');
    });
    app.get('/WorkingMemoryTraining', function(request, response) {
        response.render('workingmemorytraining.html');
    });
    app.get('/WorkingMemoryTesting', function(request, response) {
        response.render('workingmemorytesting.html');
    });
    app.get('/StroopTesting', function(request, response) {
        response.render('workingmemorytesting_stroop.html');
    });

    app.get('/NFfollowup', function(request, response) {
        response.render('NFfollowup.html');
    });
    app.get('/BSfollowup', function(request, response) {
        response.render('BSfollowup.html');
    });

    app.get('/finish', function(request, response) {
        response.render('finish.html');
    });

}