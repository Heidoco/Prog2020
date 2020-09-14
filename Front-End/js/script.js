$(function() { // quando o documento estiver pronto/carregado
    
    $.ajax({
        url: 'http://localhost:5000/listar_pacientes',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function listar (lista_pac) {
        // percorrer a lista de pessoas retornadas; 
        for (var i in lista_pac) { //i vale a posição no vetor
            lin = '<tr>' + // elabora linha com os dados da pessoa
            '<td>' + lista_pac[i].nome + '</td>' + 
            '<td>' + lista_pac[i].telefone + '</td>' + 
            '<td>' + lista_pac[i].data_nasc + '</td>'+
            '<td>' + lista_pac[i].profissao + '</td>' + 
            '</tr>';
            // adiciona a linha no corpo da tabela
            $('#btabela').append(lin);
        }
    }

});
