# nunjucks-jinja-demo
A demonstration of using shared template fragments between Nunjucks on client-side and Jinja2 on server-side

# Setting up demo locally

* Clone the repository

  `git clone https://github.com/bimblehq/nunjucks-jinja-demo.git`


* Install python dependencies

  `pip install -r requirements.txt -t app/lib`


* Install JavaScript dependencies

  `npm install`


* Build local assets

    `gulp` or `./node_modules/.bin/gulp` if you don't have gulp installed globally


* Run local development server

  `dev_appserver.py app/app.yaml`
