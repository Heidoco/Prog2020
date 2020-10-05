$(function() { // quando o documento estiver pronto/carregado
    
    function exibir_pacientes() {
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
            $('#btabela').empty();
            // percorrer a lista de pessoas retornadas; 
            for (var i in lista_pac) { //i vale a posição no vetor
                lin = '<tr>' + // elabora linha com os dados da pessoa
                '<td>' + lista_pac[i].nome + '</td>' + 
                '<td>' + lista_pac[i].telefone + '</td>' + 
                '<td>' + lista_pac[i].data_nasc + '</td>'+
                '<td>' + lista_pac[i].peso + '</td>' +
                '<td>' + lista_pac[i].altura + '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#btabela').append(lin);
            }
        }
    }

    $(document).on("click", "#linkListarPacientes", function() {
        exibir_pacientes();
    });


    $(document).on("click", "#btIncluirPaciente", function() {
        //pegar dados da tela
        nome = $("#campoNome").val();
        tel = $("#campoTelefone").val();
        data_nasc = $("#campoDatanasc").val();
        peso = $("#campoPeso").val();
        altura = $("#campoAltura").val()
        // preparar dados no formato json
        var dados = JSON.stringify({ nome: nome, telefone: tel, data_nasc: data_nasc, peso: peso, altura: altura });
        // fazer requisição para o back-end

        $.ajax({
            url: 'http://localhost:5000/incluir_paciente',
            type: 'POST',
            dataType: 'json', // os dados são recebidos no formato json
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: pacienteIncluido, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function pacienteIncluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Paciente adicionado!");
                // limpar os campos
                $("#campoNome").val("");
                $("#campoTelefone").val("");
                $("#campoDatanasc").val("");
                $("#campoPeso").val("")
                $("#campoAltura").val("")
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("erro ao incluir dados, verifique o backend: ");
        }
    });

});



