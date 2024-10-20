document.getElementById('buscarBtn').addEventListener('click', async () => {
    const ddd = document.getElementById('dddInput').value.trim();
  
    if (ddd.length === 0 || isNaN(ddd)) {
      alert('Por favor, insira um DDD válido.');
      return;
    }
  
    try {
      const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
      if (!response.ok) throw new Error('DDD não encontrado');
  
      const data = await response.json();
      exibirResultado(data);
    } catch (error) {
      document.getElementById('resultado').innerHTML = `
        <div class="alert alert-danger">Erro: ${error.message}</div>
      `;
    }
  });
  
  function exibirResultado(data) {
    const cidades = data.cities;
    let tabelaCidades = '';
  
    cidades.forEach((cidade, index) => {
      tabelaCidades += `
        <tr>
          <td>${index + 1}</td>
          <td>${cidade}</td>
        </tr>
      `;
    });
  
    document.getElementById('resultado').innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Informações do DDD</h5>
          <p><strong>Estado:</strong> ${data.state}</p>
          <table class="table table-striped mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              ${tabelaCidades}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  
