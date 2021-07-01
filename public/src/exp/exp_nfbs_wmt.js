/* ************************************ */
/* Define experimental variables */
/* ************************************ */

// Set task variables
var sequence = [];
var wmt_fixation_stim = "<img class='center-fit' src='../img/WMT/cross.bmp'>"
var n_back_set = ["../img/WMT/1f.bmp", "../img/WMT/2f.bmp", "../img/WMT/3f.bmp", "../img/WMT/4f.bmp",
    "../img/WMT/5f.bmp", "../img/WMT/6f.bmp", "../img/WMT/7f.bmp", "../img/WMT/8f.bmp"];
var n_back_instr_set = ["../img/WMT/intro1.bmp", "../img/WMT/intro2.bmp", "../img/WMT/intro3.bmp", "../img/WMT/intro4.bmp"];

// Constants
const nbackarray14 = [0, 1, 2, 3];
const PERCENTCORRECTPRACT = 0.40;
const PERCENTCORRECT = 0.30;
const FIXATION_DURATION = 2500; // 2500
const PICTURE_DURATION = 500; // 500
const NTRIALS = 20; // 20 trials
const NTRIALSTEST = 40; // 40 trials
const NTRIALSPRAC = 5; // five practice trials
const NTESTINGBLOCKS = 1; // No. of blocks for pre/post-training test
const NTRAININGBLOCKS = 8; // Need to change to 8
var HOWMANYBACK;
var SEQLENGTH;
var letter1;

function shuffle(array) {array.sort(() => Math.random() - 0.5)}
function permutator(inputArr) {
    results = [];

    function permute(arr, memo) {
        var cur, memo = memo || [];

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push(memo.concat(cur));
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}

// Set instructions helpers
var wmt_instrhelper = {};

wmt_instrhelper.page1a =
    "<div class='WMT_instr'>" +
    "<p><img src='../img/WMT/nbackkeys.bmp' alt='nbackkeys' width='800'></p>" +
    "</div>";

wmt_instrhelper.transition =
    "<div class='WMT_instr'>" +
    "<p>Thank you for completing the practice block. We will now proceed to the experimental block.</p>" +
    "<p>This time, there will not be any feedback, so you will have to carry on until the task is finished. </p>" +
    "<p>The experiment will start once you press the button.</p>" +
    "</div>";

wmt_instrhelper.end_block =
    "<div class='WMT_instr'>" +
    "<p class='continue_next'>You may now continue with the next block.</p>" +
    "</div>";

/* N-back Instructions */
function makeNbackInstr() {
    Nbackinstr = [];
    for (var i = 0; i <= 3; ++i) {
        N_back_instr_i = {
            type: 'html-keyboard-response',
            data: {
                exp_id: "wmt",
                phase: "nback-instr"
            },
            stimulus: "<p><img src=" + n_back_instr_set[i] + " width='800'></p>",
        };
        Nbackinstr[i] = N_back_instr_i;
    }
    return Nbackinstr
}
N_back_instr = makeNbackInstr();
/* Fixation */
var WMT_firstfixation = {
    on_start: function (trial) {
        phase = jsPsych.data.getLastTrialData().values()[0]["phase"];
        nback = jsPsych.data.getLastTrialData().values()[0]["nback"];

        trial.data = {
            exp_id: 'wmt',
            trial_id: "fixation",
            phase: phase,
            nback: nback,
            stimulus: "fixation",
        };
    },

    type: "html-keyboard-response",
    data: "",
    stimulus: wmt_fixation_stim,
    choices: jsPsych.NO_KEYS,
    trial_duration: 500, // milliseconds
    response_ends_trial: false
};
var WMT_fixation = {
    on_start: function (trial) {
        phase = jsPsych.data.getLastTrialData().values()[0]["phase"];
        nback = jsPsych.data.getLastTrialData().values()[0]["nback"];
        mymatch = jsPsych.data.getLastTrialData().values()[0]["match"];

        trial.data = {
            exp_id: 'wmt',
            trial_id: "fixation",
            phase: phase,
            nback: nback,
            match: mymatch,
            stimulus: "fixation",
        };
    },

    type: "html-keyboard-response",
    data: "",
    stimulus: wmt_fixation_stim,
    choices: ['A', 'L'],
    trial_duration: FIXATION_DURATION, // milliseconds
    response_ends_trial: false,
    on_finish: function (data) {
        if (data.match == true) {
            data.correct = (data.key_press === 65)
        }
        if (data.match == false) {
            data.correct = (data.key_press === 76)
        }
    }
};
/* N Back sequence trials */
var n_back_trial = {
    on_start: function(trial) {
        HOWMANYBACK = jsPsych.timelineVariable('nback', true);
        phase = jsPsych.timelineVariable('phase', true);
        nback = jsPsych.timelineVariable('nback', true);
        mymatch = jsPsych.timelineVariable('match', true);

        if (sequence.length < HOWMANYBACK) {
            letter = jsPsych.randomization.sampleWithoutReplacement(n_back_set, 1)[0]
        } else {
            if (jsPsych.timelineVariable('match', true) == true) { // If match
                letter = sequence[sequence.length - HOWMANYBACK];
            } else { // Not match
                possible_letters = jsPsych.randomization.sampleWithoutReplacement(n_back_set, 2);
                if (possible_letters[0] != sequence[sequence.length - HOWMANYBACK]) {
                    letter = possible_letters[0];
                } else {
                    letter = possible_letters[1];
                }
            }
        }
        sequence.push(letter);
        letter1 = "<img class='center-fit' src=" + letter + ">";
        letter = letter.replace(/^.*[\\\/]/, '');
        trial.stimulus = letter1;
        trial.data = {
            exp_id: 'wmt',
            phase: phase,
            nback: nback,
            match: mymatch,
            stimulus: letter,
        };
    },
    type: 'html-keyboard-response',
    choices: ['A', 'L'],
    stimulus: "",
    data: "",
    trial_duration: PICTURE_DURATION,
    response_ends_trial: false,
    // post_trial_gap: POSTTRIAL_DURATION,
    on_finish: function (data) {
        if (data.match == true) {
            data.correct = (data.key_press === 65)
        }
        if (data.match == false) {
            data.correct = (data.key_press === 76)
        }
    }
}
/* Sound */
const snd1 = new Audio("../sound/wmt_bgmusic.wav"); snd1.loop = true;
var wmt_bgmusic = {
    start: "",
    stop: ""};
wmt_bgmusic.start = {
    type: 'call-function',
    data: {
        exp_id: "wmt",
        trial_id: "bg-music-break-start"
    },
    func: function() {snd1.play()}
};
wmt_bgmusic.stop = {
    type: 'call-function',
    data: {
        exp_id: "wmt",
        trial_id: "bg-music-break-stop"
    },
    func: function() {snd1.pause(); snd1.currentTime = 0;}
};

// Make sequence
function makeNbackSeq(TYPE){
    n_back_sequences = [];
    for (var i = 0; i <= 3; ++i) {
        NBACK=i+1
        n_back_sequences[i] = createseqence(NBACK, TYPE);
    }

    return n_back_sequences
}
function createseqence(NBACK, TYPE){
    if (TYPE === 'practice'){
        SEQLENGTH = NTRIALSPRAC + NBACK;
        NMATCHTRIALS = PERCENTCORRECTPRACT*NTRIALSPRAC;
        NNONMATCHTRIALS = NTRIALSPRAC - NMATCHTRIALS;
    } else if (TYPE === 'exp') {
        SEQLENGTH = NTRIALSTEST + NBACK;
        NMATCHTRIALS = PERCENTCORRECT*NTRIALSTEST;
        NNONMATCHTRIALS = NTRIALSTEST - NMATCHTRIALS;
    }

    FIRSTNTRIALS = NBACK


    firsttrials = Array(FIRSTNTRIALS).fill({match: false, nback: NBACK, seqlen: SEQLENGTH, phase: TYPE});
    matchtrials = Array(NMATCHTRIALS).fill({match: true, nback: NBACK, seqlen: SEQLENGTH, phase: TYPE});
    unmatchtrials = Array(NNONMATCHTRIALS).fill({match: false, nback: NBACK, seqlen: SEQLENGTH, phase: TYPE});

    n_back_trials = matchtrials.concat(unmatchtrials);
    shuffle(n_back_trials);

    n_back_trials = firsttrials.concat(n_back_trials);
    if (TYPE === 'practice'){
        n_back_sequence = {
            timeline: [n_back_trial, WMT_fixation, feedback],
            timeline_variables: n_back_trials,
        }

    } else  {
        n_back_sequence = {
            timeline: [n_back_trial, WMT_fixation],
            timeline_variables: n_back_trials,
        }
    }

    return n_back_sequence
}
function multipleseq(NREPS, TYPE){
    sequence = [];
    for (var i = 0; i < NREPS; ++i) {
        sequence[i] = makeNbackSeq(TYPE);
    }
    return sequence
}

n_back_sequences_testing = multipleseq(NTESTINGBLOCKS, 'exp')

// Real WMT blocks
function wmtblock(WMTTYPE, TESTTYPE, NBACKARRAY){
    exp_block = [];
    allpermutes = permutator(NBACKARRAY);
    possiblepermutes = allpermutes.length;

    if (WMTTYPE === "c-wmt"){
        allbackarray = Array(possiblepermutes).fill(NBACKARRAY)
    } else if (WMTTYPE === "r-wmt"){
        allbackarray = permutator(NBACKARRAY);
    }
    if (TESTTYPE === "exp"){NBLOCKS = NTESTINGBLOCKS; n_back_sequences = n_back_sequences_testing}

    for (var x = 1; x <= NBLOCKS; ++x) {
        n_back_sequences_i = n_back_sequences[x-1]

        nbackindex = Math.floor(Math.random() * allbackarray .length)
        targetindex = allbackarray[nbackindex]
        allbackarray.splice(nbackindex, 1);

        for (var i = 0; i <= (NBACKARRAY.length -1); ++i) {
            nbacktest_i = targetindex[i]
            exp_block.push(N_back_instr[nbacktest_i]);
            exp_block.push(WMT_firstfixation);
            exp_block.push(n_back_sequences_i[nbacktest_i]);
        }
    }
    return exp_block
}
rwmt_test_block = wmtblock('r-wmt', 'exp', nbackarray14)
cwmt_test_block = wmtblock('c-wmt', 'exp', nbackarray14)
