/* **************************************** */
/* Set up experiment procedure and timeline */
/* **************************************** */

// TestSaving Function
function FinishTestSavingSave() {
    $.ajax({
        type: "POST",
        url: "/test-save-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
        .done(function() {
            window.location.href = "finish";
        })
        .fail(function() {
            alert("Problem occurred while writing data to Dropbox. " +
                "Data will be saved to your computer. " +
                "Please contact the experimenter regarding this issue!");
            var csv = jsPsych.data.get().csv();
            var filename = jsPsych.data.get().values()[0].ID_DATE + "_testsave_day_" + jsPsych.data.get().values()[0].daynumber + ".csv";
            downloadCSV(csv, filename);
            window.location.href = "finish";
        });
    // jsPsych.data.displayData()
}

// Set up Training Save functions
function CloseTrainingSave() {
    $.ajax({
        type: "POST",
        url: "/wmt-training-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
    // jsPsych.data.displayData()
}
function FinishTrainingSave() {
    $.ajax({
        type: "POST",
        url: "/wmt-training-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
        .done(function() {
            window.location.href = "finish";
        })
        .fail(function() {
            alert("Problem occurred while writing data to Dropbox. " +
                "Data will be saved to your computer. " +
                "Please contact the experimenter regarding this issue!");
            var csv = jsPsych.data.get().csv();
            var filename = jsPsych.data.get().values()[0].ID_DATE + "_day_" + jsPsych.data.get().values()[0].daynumber + ".csv";
            downloadCSV(csv, filename);
            window.location.href = "finish";
        });
    // jsPsych.data.displayData()
}
function FinishTrainingSave2() {
    alert("Data will be saved to your computer. " +
        "Press ok to continue");
    var csv = jsPsych.data.get().csv();
    var filename = jsPsych.data.get().values()[0].ID_DATE + "_day_" + jsPsych.data.get().values()[0].daynumber + ".csv";
    downloadCSV(csv, filename);
    window.location.href = "finish";
}

// Set up Testing Save functions
function CloseTestingSave() {
    $.ajax({
        type: "POST",
        url: "/wmt-testing-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
    // jsPsych.data.displayData()
}
function FinishTestingSave() {
    $.ajax({
        type: "POST",
        url: "/wmt-testing-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
        .done(function() {
            window.location.href = "finish";
        })
        .fail(function() {
            alert("Problem occurred while writing data to Dropbox. " +
                "Data will be saved to your computer. " +
                "Please contact the experimenter regarding this issue!");
            var csv = jsPsych.data.get().csv();
            var filename = jsPsych.data.get().values()[0].ID_DATE + "_day_" + jsPsych.data.get().values()[0].daynumber + ".csv";
            downloadCSV(csv, filename);
            window.location.href = "finish";
        });
    // jsPsych.data.displayData()
}

// Separate tasks Save functions
function StroopSave() {
    $.ajax({
        type: "POST",
        url: "/wmt-stroop-data",
        data: JSON.stringify(jsPsych.data.get().values()),
        contentType: "application/json"
    })
        .done(function() {
            window.location.href = "finish";
        })
        .fail(function() {
            alert("Problem occurred while writing data to Dropbox. " +
                "Data will be saved to your computer. " +
                "Please contact the experimenter regarding this issue!");
            var csv = jsPsych.data.get().csv();
            var filename = jsPsych.data.get().values()[0].ID_DATE + "stroop_day_" + jsPsych.data.get().values()[0].daynumber + ".csv";
            downloadCSV(csv, filename);
            window.location.href = "finish";
        });
    // jsPsych.data.displayData()
}


// define welcome message trial
var welcome_screen = {
    type: "html-button-response",
    data: {
        exp_id: "welcome",
        trial_id: "welcome"
    },
    choices: ['Click here to continue'],
    on_trial_start: function() { setTimeout(function() {setDisplay("jspsych-btn","")}, 1000)},
    stimulus: "Welcome to the experiment.",
};
welcome_block = [];
welcome_block.push(welcome_screen);


// Set up full screen mode
// bc_exp.push({type: 'fullscreen', fullscreen_mode: true}); /* enter fullscreen mode */
// bc_exp.push({type: 'fullscreen', fullscreen_mode: false }); /* exit fullscreen mode */

// Separate tasks
function start_Stroop() {

    /* start the experiment */
    jsPsych.init({
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...stroop_conditional_block,
            ...stroop_post_block,
        ],

        /* on_close currently not working */
        on_close: function() {
            StroopSave()
        },
        on_finish: function() {
            StroopSave()
        }
    });
}

// Testing if savingworks
function start_TestSave_Day() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...testsave_block,
        ],
        on_finish: function() {
            FinishTestSavingSave()
        }
    });
}

// For Training
function start_CWMT_Day12() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...cwmt_exp_block12,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave()
        }
    });
}
function start_RWMT_Day12() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...rwmt_exp_block12,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave()
        }
    });
}

function start_CWMT_Day35() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...cwmt_exp_block35,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave()
        }
    });
}
function start_RWMT_Day35() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...rwmt_exp_block35,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave()
        }
    });
}

function start_CWMT_Day610() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...cwmt_exp_block610,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave()
        }
    });
}
function start_RWMT_Day610() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...rwmt_exp_block610,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave()
        }
    });
}

// Training Dropbox Save Version
function start_CWMT_DayA() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...cwmt_exp_block,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave2()
        }
    });
}
function start_RWMT_DayA() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...rwmt_exp_block,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave2()
        }
    });
}
function start_CWMT2_DayA() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...cwmt_exp2_block,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave2()
        }
    });
}
function start_RWMT2_DayA() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: true,
        on_interaction_data_update: function(data) {
            var trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...rwmt_exp2_block,
            ...aes_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTrainingSave()
        },
        on_finish: function() {
            FinishTrainingSave2()
        }
    });
}


// For Pre-Testing
function start_RWMT_PreTest() {
    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: false,
        on_interaction_data_update: function(data) {
            trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },
        //TODO: set back later
        timeline: [
            ...welcome_block,
            ...stroop_block,
            ...rwmt_test_block,
        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTestingSave()
        },
        on_finish: function() {
            FinishTestingSave()
        }
    });
}
function start_CWMT_PreTest() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: false,
        on_interaction_data_update: function(data) {
            trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...stroop_block,
            ...cwmt_test_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTestingSave()
        },
        on_finish: function() {
            FinishTestingSave()
        }
    });
}

// For Post-Testing
function start_RWMT_PostTest() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: false,
        on_interaction_data_update: function(data) {
            trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...stroop_post_block,
            ...rwmt_test_block

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTestingSave()
        },
        on_finish: function() {
            FinishTestingSave()
        }
    });
}
function start_CWMT_PostTest() {

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: false,
        on_interaction_data_update: function(data) {
            trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...stroop_post_block,
            ...cwmt_test_block,

        ],

        /* on_close currently not working */
        on_close: function() {
            CloseTestingSave()
        },
        on_finish: function() {
            FinishTestingSave()
        }
    });
}

// For fMRI-Practice
function start_practice() {

    daynumber = "practice";
    wmttype = "c-wmt";
    partID = "9999";

    jsPsych.data.addProperties({  // record the condition assignment in the jsPsych data
        ID: 9999,
        ID_DATE: partID + "_" + DATE,
        daynumber: daynumber,
        wmttype: wmttype,
    });

    /* start the experiment */
    jsPsych.init({
        preload_images: [wmt_fixation_stim0, ...n_back_set],
        show_progress_bar: false,
        on_interaction_data_update: function(data) {
            trial = jsPsych.currentTrial();
            trial.data.screen_focus = data.event;
        },

        timeline: [
            ...welcome_block,
            ...conditional_practice
        ],

    });
}