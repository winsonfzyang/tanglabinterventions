/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// Constants
const STROOP_FIXATION_DURATION = 500; // 500
const STROOP_STIM_DURATION = 2000; // 2000
const STROOP_POSTTRIAL_DURATION = 500; // 500
const PERCENTINCONGR = 0.20; // 20%
const NPRACTTRIALS = 10; // 1 set = 10 trials
const NEXPTRIALS = 160; // 80 trials
const stroop_fixation_stim = "<div style='font-size: 72px'>+</div>";


// Set instructions helpers
let stroop_instrhelper = {};

stroop_instrhelper.page1 =
    "<div class='stroop_instr'>" +
    "<p>You will be shown a word. The word will either be colored <span class ='color_red'>red</span> or <span class='color_blue'>blue</span>.</p><br>" +
    "<p>If the word is colored <span class='color_red' >red</span>, press the <span class='color_red' >f</span> key.</p>" +
    "<p>If the word is colored <span class='color_blue'>blue</span>, press the <span class='color_blue'>j</span> key.</p><br>" +
    "<p>Press any button to begin. </p>" +
    "</div>";

stroop_instrhelper.end_block =
    "<div class='stroop_instr'>" +
    "<p class='continue_next'>Great job and thank you! You are now finished with this test." +
    "<br>Please continue to the next block.</p>" +
    "</div>";

/* Instructions */
let stroop2_instr = {
    type: 'instructions',
    data: {
        exp_id: "stroop",
        trial_id: "instructions2"
    },
    pages: [
        // Page 1
        stroop_instrhelper.page1
    ],
    show_clickable_nav: true,
    show_page_number: true,
};

/* Fixation */
let stroop_fixation = {
    type: "html-keyboard-response",
    data: {
        exp_id: 'stroop',
        stimulus: "fixation"
    },
    stimulus: stroop_fixation_stim,
    choices: jsPsych.NO_KEYS,
    trial_duration: STROOP_FIXATION_DURATION, // milliseconds
};

/*  Stimuli */
let stroop2_congrfactors = [
    {color_class: 'color_blue', word:'BLUE', color: '#00caff', stimulus_type: 'congruent', correct_response: 'j'},
    {color_class: 'color_red', word: 'RED',color: '#ff0000',  stimulus_type: 'congruent', correct_response: 'f'},
];
let stroop2_incongrfactors = [
    {color_class: 'color_red', word:'BLUE', color: '#ff0000', stimulus_type: 'incongruent', correct_response: 'f'},
    {color_class: 'color_blue', word: 'RED',color: '#00caff',  stimulus_type: 'incongruent', correct_response: 'j'},
];
let stroop2_factors = {congruent: stroop2_congrfactors, incongruent: stroop2_incongrfactors};


// Function to create stimuli
function createstim(factors, BLOCK, TYPE) {
    trials = [];
    if (BLOCK === "stroop2"){
        NINCONGRUENTTRIALS = stroop2_factors.incongruent.length // gives 2
        TOTALN = NINCONGRUENTTRIALS/PERCENTINCONGR // should give 10
        NCONGRUENTTRIALS = TOTALN - NINCONGRUENTTRIALS // gives 8
        CONGRMULTIPLIER = NCONGRUENTTRIALS/stroop2_factors.congruent.length // should give 4
        stroop2_congruent = [];
        while(CONGRMULTIPLIER--){stroop2_congruent = stroop2_congruent.concat(stroop2_factors.congruent);}
        stroop2_incongruent = stroop2_factors.incongruent;
        mystroopfactors = [...stroop2_congruent, ...stroop2_incongruent];
    } else {
        mystroopfactors = factors;
    }

    for (var i = 0; i < mystroopfactors.length; ++i) {
        trials[i] = {
            stimulus: "<p class=" + mystroopfactors[i].color_class + " style='font-size:72px;'>" + mystroopfactors[i].word + "</p>",
            data: {
                exp_id: 'stroop',
                block: BLOCK,
                phase: TYPE,
                trial_id: 'stimulus',
                word: mystroopfactors[i].word,
                color: mystroopfactors[i].color,
                stimulus_type: mystroopfactors[i].stimulus_type,
                correct_response: mystroopfactors[i].correct_response
            },
            trial_duration: STROOP_STIM_DURATION, // milliseconds
        }
    }

    return trials
}
function createseq(factors, BLOCK, TYPE) {
    stroop_procedure = [];
    stroop_stim = createstim(factors, BLOCK, TYPE)
    stroop_trial = {
        on_start: function(trial) {
            // add phase=practice or trial
            trialstimulus = jsPsych.timelineVariable('stimulus', true);
            data = jsPsych.timelineVariable('data', true);

            trial.stimulus = trialstimulus;
            trial.data = {
                exp_id: 'stroop',
                block: data.block,
                phase: data.phase,
                stimulus: trialstimulus,
                word: data.word,
                color: data.color,
                stimulus_type: data.stimulus_type,
                correct_response: data.correct_response,
            };
        },
        type: 'html-keyboard-response',
        choices: ['F', 'J'],
        stimulus: "",
        data: "",
        trial_duration: STROOP_STIM_DURATION,
        response_ends_trial: true,
        post_trial_gap: STROOP_POSTTRIAL_DURATION,
        on_finish: function (data) {
            keyconvert = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)

            if (keyconvert===data.correct_response) {
                data.accuracy = 1;
            } else {
                data.accuracy = 0;
            }
        }
    }

    if (TYPE === 'practice'){
        stroop_procedure = {
            timeline: [stroop_fixation, stroop_trial, feedback],
            timeline_variables: stroop_stim,
            randomize_order: true,
            repetitions: NPRACTTRIALS/stroop_stim.length
        };
    } else if (TYPE === 'exp') {
        stroop_procedure = {
            timeline: [stroop_fixation, stroop_trial],
            timeline_variables: stroop_stim,
            randomize_order: true,
            repetitions: NEXPTRIALS/stroop_stim.length
        };
    }
    return stroop_procedure
}

let stroop2_procedure = createseq(stroop2_factors, 'stroop2', 'exp')

let stroop_block = [];
stroop_block.push(stroop2_instr);
stroop_block.push(stroop2_procedure);

