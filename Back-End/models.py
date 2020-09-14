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

#Criar
if __name__ == "__main__":
    #db.create_all()

    # Teste de Adição
    
    nova = Paciente(nome = "Alan", data_nasc = "12132000", 
    peso = 85, altura = 1.80, profissao="Motorista", cpf= 11111111, telefone= 9646654845 )
    db.session.add(nova)      
    db.session.commit()
    print(nova.nome)
    

    todas = db.session.query(Paciente).all()
    print(todas)
    for p in todas: 
        print(p.json())