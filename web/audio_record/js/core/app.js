
define([], function () {

    var App = function () {
        this._init();
        this._hookDom();
        this._bindEvent();
    };

    App.prototype._hookDom = function () {
        this._startRecordBtn$ = $('.start-record-btn');
        this._stopRecordBtn$ = $('.stop-record-btn');
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

        navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
            Console.log('No live audio input: ' + e);
        });
    };


    window.userId = Math.random();


    function startUserMedia(stream) {
        var input = audio_context.createMediaStreamSource(stream);
        window.recorder = new Recorder(input);
    }



    App.prototype._startRecording = function () {
        recorder && recorder.record();
        this._startRecordBtn$[0].disabled = true;
        this._stopRecordBtn$[0].disabled = false;

        this._uploadAudioTimerId = setInterval(this._uploadAudioTimer.bind(this), 500);
        this._fetchResultTimerId = setInterval(this._fetchResultTimer.bind(this), 500);
    };

    App.prototype._fetchResultTimer = function () {
       //TODO fetch and change result
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
    };

    function upload_record() {
        recorder && recorder.exportWAV(function(blob) {
            var fd = new FormData();
            fd.append('fname', 'test.wav');
            fd.append('userId', userId);
            fd.append('data', blob);
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:5101/upload',
                data: fd,
                processData: false,
                contentType: false
            }).done(function(data) {
                console.log(data);
            });
        });
    }


    return App;
});