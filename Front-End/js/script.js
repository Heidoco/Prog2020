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
                lin = '<tr id="linha_'+ lista_pac[i].id+'">' + // elabora linha com os dados da pessoa
                '<td>' + lista_pac[i].nome + '</td>' + 
                '<td>' + lista_pac[i].telefone + '</td>' + 
                '<td>' + lista_pac[i].data_nasc + '</td>'+
                '<td>' + lista_pac[i].peso + '</td>' +
                '<td>' + lista_pac[i].altura + '</td>' + 
                '<td><a href=# id="excluir_' + lista_pac[i].id + '" ' + 'class="excluir_paciente"><div class="btn btn-sm btn-outline-danger">Remover</div></a>' + 
                '</td>' + 
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

    $(document).on("click", ".excluir_paciente", function() {
        // obter o ID do ícone que foi clicado
        var componente_clicado = $(this).attr('id'); 
        // no id do ícone, obter o ID
        var nome_icone = "excluir_";
        var id_paciente = componente_clicado.substring(nome_icone.length);
        // solicitar a exclusão
        $.ajax({
            url: 'http://localhost:5000/remover_paciente/'+id_paciente,
            type: 'DELETE', // método da requisição
            dataType: 'json', // os dados são recebidos no formato json
            success: PExcluido, // chama a função listar para processar o resultado
            error: erroAoExcluir
        });

        function PExcluido (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // remover da tela a linha cuja pessoa foi excluída
                $("#linha_" + id_paciente).fadeOut(10, function(){
                    // informar resultado de sucesso
                    alert("Sucesso!");
                });
            } else {
                // informar mensagem de erro
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }

        function erroAoExcluir (retorno) {
            // informar mensagem de erro
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });


    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: 'http://localhost:5000/listar_'+nome_classe,
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: carregar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function carregar (dados) {
            // esvaziar o combo
            $('#'+combo_id).empty();
            // mostra ícone carregando...
            $('#loading_'+combo_id).removeClass('d-none');
            // percorrer a lista de dados
            for (var i in dados) { //i vale a posição no vetor
                $('#'+combo_id).append(
                    $('<option></option>').attr("value", 
                        dados[i].id).text(dados[i].nome));
            }
        }
    }

    $('#modalIncluirConsulta').on('shown.bs.modal', function (e) {
        // carregar as listas de pessoas e exames
        carregarCombo("campoPacienteId", "pacientes");
        carregarCombo("campoMedicoId", "medicos");
    })

    // incluir consulta
    $(document).on("click", "#btIncluirConsulta", function() {
        //pegar dados da tela
        data = $("#campoDataCons").val();
        paciente_id = $("#campoPacienteId").val();
        medico_id = $("#campoMedicoId").val();
        // preparar dados no formato json
        var dados = JSON.stringify({ data: data, paciente_id: paciente_id, medico_id: medico_id });
        // fazer requisição para o back-end
        $.ajax({
            url: 'http://localhost:5000/incluir_consulta',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: dadosIncluidos, // chama a função listar para processar o resultado
            error: erroAoIncluir
        });
        function dadosIncluidos (retorno) {
            if (retorno.resultado == "ok") { // a operação deu certo?
                // informar resultado de sucesso
                alert("Dados incluídos com sucesso!");
                // limpar os campos
                $("#campoData").val("");
                $("#campoPessoaId").val("");
                $("#campoExameId").val("");
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
    
    function listar_consultas() {
        $.ajax({
            url: 'http://localhost:5000/listar_consultas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar, // chama a função listar para processar o resultado
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });
        function listar (consultas) {
            $('#contabela').empty();     
            // percorrer a lista de exanes realizados retornados; 
            for (var i in consultas) { //i vale a posição no vetor
                lin = '<tr id="linha_consulta_'+consultas[i].id+'">' + 
                '<td>' + consultas[i].data + '</td>' + 
                // dados da pessoa
                '<td>' + consultas[i].paciente.nome + '</td>' + 
                // dados do exame
                '<td>' + consultas[i].medico.nome + '</td>' + 
                '</tr>';
                // adiciona a linha no corpo da tabela
                $('#contabela').append(lin);
            }
        }
    }
    $(document).on("click", "#linkListarConsultas", function() {
        listar_consultas();
    });
});
