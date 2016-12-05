import flask
from flask import Flask
from flask import request, session
from pydub import AudioSegment
import random
import os
from functools import wraps
from flask import make_response


def allow_cross_domain(fun):
    @wraps(fun)
    def wrapper_fun(*args, **kwargs):
        rst = make_response(fun(*args, **kwargs))
        rst.headers['Access-Control-Allow-Origin'] = '*'
        rst.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
        allow_headers = "Referer,Accept,Origin,User-Agent"
        rst.headers['Access-Control-Allow-Headers'] = allow_headers
        return rst
    return wrapper_fun



app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'windroc-nwpc-project'

AUDIO_OUTPUT_BASE_PATH = '/Users/wxy325/developer/Audio_Localization_Demo/server/audio_demo_server/audio_file'

session_id_to_audio = {}

@app.route('/test', methods=['GET'])
@allow_cross_domain
def test_api():
    return flask.jsonify({'result': 'success'})

@app.route('/query_result', methods=['GET'])
@allow_cross_domain
def query_result():
    userId = request.form['userId']
    if not userId in session_id_to_audio:
        return flask.jsonify({'result': 'waiting'})
    audio_clip = session_id_to_audio[userId]
    if len(audio_clip) < 5000:
        return flask.jsonify({'result': 'waiting'})
    return flask.jsonify({'result': 'waiting'})

@app.route('/clear_audio', methods=['POST'])
@allow_cross_domain
def clear_audio():
    userId = request.form['userId']
    del session_id_to_audio[userId]

@app.route('/upload', methods=['POST'])
@allow_cross_domain
def upload_file():
    if request.method == 'POST':
        userId = request.form['userId']
        print(request.form['userId'])

        f = request.files['data']
        file_name = AUDIO_OUTPUT_BASE_PATH + '/' + str(random.random()) + '.wav'
        f.save(file_name)
        au = AudioSegment.from_wav(file_name)

        os.remove(file_name)

        if not userId in session_id_to_audio:
            session_id_to_audio[userId] = au
        else:
            p = session_id_to_audio[userId]
            session_id_to_audio[userId] = au + p
        if len(session_id_to_audio[userId]) > 6000:
            session_id_to_audio[userId] = session_id_to_audio[userId][:6000]

        if userId in session_id_to_audio:
            print(len(session_id_to_audio[userId]))

        print('receive audio')
        return flask.jsonify({'result' : 'success', 'length' : len(session_id_to_audio[userId])})



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5101)