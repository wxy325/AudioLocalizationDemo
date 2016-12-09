
define([], function () {
    var App = function () {
        this._init();
    };

    location_name = ['Corner Stone',
        'Dinning hall',
        'Classroom',
        'AQ',
        'Bus Loop',
        'Gym',
        'Reflection Pond',
        'Library'];

    result = {
        'nn_mfcc' : {'dinning_hall': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 'corner_stone': [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4], 'gym': [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 'lake': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], 'library': [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], 'aq': [3, 3, 2, 2, 1, 2, 5, 2, 2, 2, 2, 6, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 'lecture': [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2], 'busloop': [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0]},
        'nn_all_features' : {'dinning_hall': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 'corner_stone': [0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'gym': [5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 'lake': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], 'library': [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], 'aq': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 'lecture': [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 'busloop': [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]},
        'double_cnn' : {'dinning_hall': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 'corner_stone': [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'gym': [5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 'lake': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], 'library': [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], 'aq': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 'lecture': [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 'busloop': [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]},
        'branch_cnn' : {'dinning_hall': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 'corner_stone': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0], 'gym': [5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 'lake': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], 'library': [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], 'aq': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 'lecture': [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 'busloop': [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]}
    };

    App.prototype._initData = function() {
        this._audioIdList = ['aq', 'busloop', 'corner_stone', 'dinning_hall', 'gym', 'lake', 'lecture', 'library'];

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
            {id : 'nn_all_features', title: 'Neural Network With PCA (All Feature)'},
            {id : 'double_cnn', title: 'Double CNN'},
            {id : 'branch_cnn', title: 'Double CNN with Branch'}
        ];
        this._algorithmResultDom$Map = {};

    };

    App.prototype._switchAudio = function (audioIndex) {
        this._algorithmList.forEach(function(e){
            this._algorithmResultDom$Map[e.id].text("");
        }.bind(this));

        this._currentAudioIndex = audioIndex;
        if (this._canvas$) {
            this._canvas$.remove();
        }
        this._canvas$ = $('<canvas id="canvas" class="wave-canvas"></canvas>')
        this._canvas = this._canvas$[0];
        this._canvasContainer$.append(this._canvas$)

        if (this._audio$) {
            this._audio.pause();
            this._audio$.remove();
        }

        this._audio$ = $('<audio controls="controls" id="audio" class="default-audio-control"></audio>');
        this._audio = this._audio$[0];
        var e = this._audioList[audioIndex];
        this._audio$.attr('src', e.path);
        this._audio.load();
        this._audio.addEventListener('timeupdate', this._audioTimerUpdate.bind(this));
        this._audioContainer$.append(this._audio$);

        this._configWave();
    };

    App.prototype._audioTimerUpdate = function () {
        console.log(this._audio.currentTime);

        index = Math.trunc(this._audio.currentTime) - 5;
        if (index > 0 && index <= 26) {
            this._algorithmList.forEach(function(e){
                m = result[e.id];
                l = m[this._audioIdList[this._currentAudioIndex]][index];
                this._algorithmResultDom$Map[e.id].text(location_name[l]);


            }.bind(this));
        }
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
        if (this._vudio) {
            this._vudio.pause();
            this._vudio.destroy();
            delete this._vudio;
            this._vudio = null;
        }

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
        this._vudio = vudio;
    };

    App.prototype._init = function () {
        this._initData();
        this._hookDom();
        this._configDropdown();
        this._configResultTbody();
        this._switchAudio(0);
    };

    App.prototype._hookDom = function () {
        this._canvasContainer$ = $('.canvas-container');

        this._audioDropdownList$ = $('#audio-dropdown-list');
        this._audioDropdownBtn$ = $('.audio-dropdown-btn');
        this._audioResultTbody$ = $('.result-tbody');
        this._audioContainer$ = $('.audio-container');
    };


    return App;
});