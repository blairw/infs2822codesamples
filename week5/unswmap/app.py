from flask import Flask
app = Flask(__name__,
            static_url_path='', 
            static_folder='web/static',
            template_folder='web/templates')

@app.route('/')
def root():
    return app.send_static_file('index.html')