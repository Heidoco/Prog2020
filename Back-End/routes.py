from config import *
from models import Paciente

@app.route("/")
def mostrar_home():
    return "Olá"


@app.route("/listar_pacientes")

def listar_pacientes():
    pacientes = db.session.query(Paciente).all()
    lista_pac = []
    for p in pacientes:
        lista_pac.append(p.json())
        print(lista_pac)
    return jsonify(lista_pac)

@app.route("/add_paciente")
def adicionar_paciente():
    dados = request.get_json()
    novo_paci = Paciente(**dados)
    db.session.add(novo_paci)
    db.session.commit()
    return {"Funcionou":True}
    


if __name__ == "__main__":
    app.run(debug=True)