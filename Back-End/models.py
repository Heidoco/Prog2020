from config import *

class Paciente(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    nome = db.Column(db.String(254))
    data_nasc = db.Column(db.Integer)
    peso = db.Column(db.Float)
    altura = db.Column(db.Float)
    profissao = db.Column(db.String(254))
    cpf = db.Column(db.String(254))
    telefone = db.Column(db.Integer)

    def __str__(self):
        return self.nome + ", " + str(self.data_nasc) + ", " + \
        str(self.peso) + ", " + str(self.altura) + ", " + self.profissao + ", " + str(self.cpf) + ", " + str(self.telefone)
    
    # Json
    def json(self):
        return {
        "id" : self.id,
        "nome" : self.nome,
        "data_nasc" : self.data_nasc,
        "peso" : self.peso,
        "altura" : self.altura,
        "profissao" : self.profissao,
        "cpf" : self.cpf,
        "telefone" : self.telefone
        }        

class Medico(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    especi = db.Column(db.String(254))
    crm = db.Column(db.String(254))

    def __str__(self):
        return self.nome + ", " + str(self.especi) + ", " + str(self.crm) 

    def json(self):
        return {
        "id" : self.id,
        "nome" : self.nome,
        "especi" : self.especi,
        "crm" : self.crm
        }        


class Consulta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(254))
    paciente_id = db.Column(db.Integer, db.ForeignKey(Paciente.id), nullable=False) 
    paciente = db.relationship("Paciente")
    medico_id =  db.Column(db.Integer, db.ForeignKey(Medico.id), nullable=False)
    medico = db.relationship("Medico")

    def __str__(self): # expressão da classe em forma de texto 
        return f"{self.data}, {self.paciente}, {self.medico}" 

    def json(self): 
        return { 
        "id":self.id, 
        "data":self.data, 
        "paciente_id":self.paciente_id, 
        "paciente":self.paciente.json(), 
        "medico_id":self.medico_id, 
        "medico":self.medico.json() 
        }

#Criar
if __name__ == "__main__":
    #db.create_all()
    """
    # Teste de Adição
    #Criar Paciente
    nova = Paciente(nome = "Alan", data_nasc = "12132000", 
    peso = 85, altura = 1.80, profissao="Motorista", cpf= 11111111, telefone= 9646654845 )
    db.session.add(nova)      
    db.session.commit()
    print(nova.nome)
    #Criar Médico
    Hanz = Medico(nome = "Dr. Hanz", especi = "Clinico Geral", crm="11112222" )
    db.session.add(Hanz)      
    db.session.commit()
    print(Hanz.nome)    
    
    #Criar Consulta
    consulta = Consulta(data="10/02/2020", medico = Hanz, paciente= nova)
    db.session.add(consulta)      
    db.session.commit()
    print(consulta)   

    """

    todas = db.session.query(Paciente).all()
    print(todas)
    for p in todas: 
        print(p.json())

    todos = db.session.query(Medico).all()
    print(todos)
    for i in todos: 
        print(i.json())

    cons = db.session.query(Consulta).all()
    print(cons)
    for c in cons: 
        print(c.json())