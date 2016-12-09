
define([], function () {

    var App = function () {
        this._init();
        this._hookDom();
        this._bindEvent();
        // this._initVudio();
    };
    App.prototype._initVudio = function () {
        if (this._canvas$) {
            this._canvas$.remove();
        }
        this._canvas$ = $('<canvas id="canvas" class="wave-canvas"></canvas>')
        this._canvas = this._canvas$[0];
        this._canvasContainer$.append(this._canvas$)

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

        var vudio = new Vudio(window.audio_stream, this._canvas, {
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

    App.prototype._stopVudio = function () {
        if (this._canvas$) {
            this._canvas$.remove();
        }
        this._canvas$ = $('<canvas id="canvas" class="wave-canvas"></canvas>')
        this._canvas = this._canvas$[0];
        this._canvasContainer$.append(this._canvas$)

        if (this._vudio) {
            this._vudio.pause();
            this._vudio.destroy();
            delete this._vudio;
            this._vudio = null;
        }
    };

    App.prototype._hookDom = function () {
        this._canvasContainer$ = $('.canvas-container');
        this._startRecordBtn$ = $('.start-record-btn');
        this._stopRecordBtn$ = $('.stop-record-btn');
        this._resultDiv$ = $('.result-div');
    };

    App.prototype._bindEvent = function () {
        this._startRecordBtn$.click(this._startRecording.bind(this));
        this._stopRecordBtn$.click(this._stopRecording.bind(this));
    };

    App.prototype._init = function() {
        try {
            // webkit shim
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            window.audio_context = new AudioContext;
        } catch (e) {
            alert('No web audio support in this browser!');
        }

        navigator.getUserMedia({audio: true}, this._startUserMedia.bind(this), function(e) {
            Console.log('No live audio input: ' + e);
        });
    };


    window.userId = Math.random();


    App.prototype._startUserMedia = function (stream) {
        var input = audio_context.createMediaStreamSource(stream);
        window.audio_stream = stream;
        window.recorder = new Recorder(input);
    };

    App.prototype._startRecording = function () {
        recorder && recorder.record();
        this._startRecordBtn$[0].disabled = true;
        this._stopRecordBtn$[0].disabled = false;

        this._uploadAudioTimerId = setInterval(this._uploadAudioTimer.bind(this), 1000);
        this._fetchResultTimerId = setInterval(this._fetchResultTimer.bind(this), 1000);
        this._initVudio();
    };

    App.prototype._fetchResultTimer = function () {
        this._update_result();
    };

    App.prototype._uploadAudioTimer = function () {
        upload_record();
        recorder.clear();
    };

    App.prototype._stopRecording = function () {
        recorder && recorder.stop();
        this._stopRecordBtn$[0].disabled = true;
        this._startRecordBtn$[0].disabled = false;
        if (this._uploadAudioTimerId) {
            clearInterval(this._uploadAudioTimerId);
            this._uploadAudioTimerId = null;
        }
        if (this._fetchResultTimerId) {
            clearInterval(this._fetchResultTimerId);
            this._fetchResultTimerId = null;
        }
        // Send Request to clear audio
        $.ajax({
            type: 'POST',
            url: 'https://142.58.185.148:5101/clear_audio',
            data: {
                userId : userId
            },
            processData : false,
            contentType : false
        }).done(function(){});
        // this._vudio.pause();
        this._stopVudio();
    };

    function upload_record() {
        recorder && recorder.exportWAV(function(blob) {
            var fd = new FormData();
            fd.append('fname', 'test.wav');
            fd.append('userId', userId);
            fd.append('data', blob);
            $.ajax({
                type: 'POST',
                url: 'https://142.58.185.148:5101/upload',
                data: fd,
                processData: false,
                contentType: false
            }).done(function(data) {
                console.log(data);
            });
        });
    }
    App.prototype._update_result = function () {
        if (!this._ajaxObj) {
            this._ajaxObj =
            $.ajax({
                type: 'GET',
                url: 'https://142.58.185.148:5101/query_result?userId=' + window.userId,
                processData: false,
                contentType: false
            }).done(function(data){
                if (data.result == 'waiting') {
                    this._resultDiv$.text('Waiting');
                } else {
                    this._resultDiv$[0].innerHTML = 'Are you in <br/>' + data.result + '?';
                }

                this._ajaxObj = null;
            }.bind(this))
        }

    };


    return App;
});
