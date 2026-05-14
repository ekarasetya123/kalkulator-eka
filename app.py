from flask import Flask, render_template
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/aritmatika')
def aritmatika():
    return render_template('aritmatika.html')

@app.route('/logika')
def logika():
    return render_template('logika.html')

@app.route('/transformasi')
def transformasi():
    return render_template('transformasi.html')

if __name__ == '__main__':
    app.run(debug=True)