from flask import Flask, jsonify, request
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# configurações 
app = Flask(__name__) 
CORS(app)
# caminho do arquivo de banco de dados 
path = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(path, "paciente.db") 
# sqlalchemy 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+arquivobd 
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)






