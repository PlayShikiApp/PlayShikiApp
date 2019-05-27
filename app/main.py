# [START app]
from flask import Flask, render_template, jsonify, request
#from flask_cors import CORS

import logging
from time import time

app = Flask(__name__)
#CORS(app)
app.config['DEBUG'] = True

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    r.headers.add('Access-Control-Allow-Origin', '*')
    r.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    r.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return r


def render_page(name, variables):
    if not ".html" in name:
        name += ".html"
    variables["templating_language"] = "jinja2"
    return render_template(name, **variables)


def get_variable_from_request(variable):
    value = None
    if request.method == "GET":
        value = request.args.get(variable)
    else:
        try:
            value = request.form[variable]
        except:
            try:
                value = request.get_json()[variable]
            except:
                value = None
    return value



@app.route('/', methods=['GET'])
def homepage():
    return render_page('video_template.html', {'static': '', 'time': str(time())})


@app.route('/', methods=['POST'])
def post_receiver():
    return render_page('index.html', {'template_message': get_variable_from_request('message')})


@app.route('/api/receiver', methods=['POST'])
def api_post_receiver():
    return jsonify({'template_message': get_variable_from_request('message')})

if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0", port=8100)
# [END app]
