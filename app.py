import os
import csv
import json
import pandas as pd
import numpy as np
from flask import Flask, jsonify, render_template

app = Flask(__name__)

csv_filepath = "static/data/cervical_cancer_clean.csv"
df = pd.read_csv(csv_filepath)

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/patient-data")
def patients():
    index_dict = df.to_dict(orient="index")
    return jsonify(index_dict)

@app.route("/raw-data")
def raw():
    dict = df.to_dict()
    return jsonify(dict)

if __name__ == "__main__":
    app.run()
