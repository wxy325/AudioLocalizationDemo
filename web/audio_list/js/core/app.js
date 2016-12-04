
define([], function () {
    var App = function () {
        this._init();
    };

    App.prototype._initData = function() {
        this._audioList = [
            {title: 'AQ', path: './audios/aq.mp3'},
            {title: 'Busloop', path: './audios/busloop.mp3'},
            {title: 'Corner Stone', path: './audios/corner_stone.mp3'},
            {title: 'Dining Hall', path: './audios/dinning_hall.mp3'},
            {title: 'Gym', path: './audios/gym.mp3'},
            {title: 'Lake', path: './audios/lake.mp3'},
            {title: 'Lecture Room', path: './audios/lecture.mp3'},
            {title: 'Library', path: './audios/library.mp3'},
        ];
        this._algorithmList = [
            {id : 'nn_mfcc', title : 'Neural Network (MFCC Only)'},
            {id : 'nn_all_features', title: 'Neural Network (All Feature)'},
            {id : 'double_cnn', title: 'Double CNN'},
            {id : 'branch_cnn', title: 'Double CNN with Branch'}
        ];
        this._algorithmResultDom$Map = {};

    };

    App.prototype._switchAudio = function (audioIndex) {
        var e = this._audioList[audioIndex];
        this._audio.pause();
        this._audio$.attr('src', e.path);
        console.log(audioIndex);
    };

    App.prototype._configDropdown = function () {
        this._audioList.forEach(function (element, index){
            var listItemDom$ = $('<li><a class="purple-text text-darken-2" href="#!"></a></li>')
            $('a', listItemDom$).text(element.title);
            this._audioDropdownList$.append(listItemDom$);
            listItemDom$.click(function (){
                this._switchAudio(index);
                this._audioDropdownBtn$.dropdown('close');
            }.bind(this));
        }.bind(this));
    };

    App.prototype._configResultTbody = function () {
        this._algorithmList.forEach(function (e, index) {
            resultRowTemplate =
                '<tr>\
                    <td class="result-tbody-algorithm"></td>\
                    <td class="result-tbody-result"></td>\
                </tr>';
            rowDom$ = $(resultRowTemplate);
            algorithm$ = $('.result-tbody-algorithm', rowDom$);
            algorithm$.text(e.title);
            this._algorithmResultDom$Map[e.id] = $('.result-tbody-result', rowDom$);
            this._audioResultTbody$.append(rowDom$);
        }.bind(this));
    };
    App.prototype._configWave = function (){
        var colors = [
            [
                [0, '#f00'],
                [0.3, '#f00'],
                [0.3, '#f90'],
                [0.7, '#f90'],
                [0.7, '#ff0'],
                [1, '#ff0']
            ],
            '#ff0',
            ['#00f', '#06f',' #09f', '#0ff'],
            ['#fb6d6b', '#c10056',' #a50053', '#51074b'],
            [
                [0, '#ff422d'],
                [0.5, '#ff422d'],
                [0.5, '#6072ff'],
                [1, '#6072ff']
            ]
        ];

        var vudio = new Vudio(this._audio, this._canvas, {
            effect: 'waveform',
            accuracy: 256,
            width: 1024,
            height: 600,
            waveform: {
                maxHeight : 100,
                color: colors[0]
            }
        });
        vudio.dance();
    };

    App.prototype._init = function () {
        this._initData();
        this._hookDom();
        this._configDropdown();
        this._configResultTbody();
        this._configWave();
    };

    App.prototype._hookDom = function () {
        this._canvas$ = $('#canvas');
        this._canvas = this._canvas$[0];
        this._audio$ = $('#audio');
        this._audio = this._audio$[0];
        // this._audioPlayBtn$ = $('.audio-play-btn');
        // this._audioPauseBtn$ = $('.audio-pause-btn');
        // this._audioPlayBtn$.click(this._AudioPlayBtnClicked.bind(this));
        // this._audioPauseBtn$.click(this._AudioPauseBtnClicked.bind(this));

        this._audioDropdownList$ = $('#audio-dropdown-list');
        this._audioDropdownBtn$ = $('.audio-dropdown-btn');
        this._audioResultTbody$ = $('.result-tbody');
    };

    // App.prototype._AudioPlayBtnClicked = function() {
    //     this._audio.play();
    // };
    // App.prototype._AudioPauseBtnClicked = function() {
    //     this._audio.pause();
    // };

    return App;
});