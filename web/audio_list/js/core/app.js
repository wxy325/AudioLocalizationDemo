
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
        this._audioContainer$.append(this._audio$);

        this._configWave();
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
        this._canvasContainer$
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