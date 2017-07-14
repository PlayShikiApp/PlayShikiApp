# [START app]
from flask import Flask, render_template, jsonify, request

import logging

app = Flask(__name__)
app.config['DEBUG'] = True


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
    return render_page('index.html', {'template_message': 'Hello from Bimble'})


@app.route('/', methods=['POST'])
def post_receiver():
    return render_page('index.html', {'template_message': get_variable_from_request('message')})


@app.route('/api/receiver', methods=['POST'])
def api_post_receiver():
    return jsonify({'template_message': get_variable_from_request('message')})


# [END app]
