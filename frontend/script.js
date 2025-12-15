const contadorDiv = document.getElementById('contador');

// URL REAL do backend no Render
const backendUrl = 'https://site-engenharia-social-backend.onrender.com/visitas';

// Incrementa visita ao entrar no site
async function atualizarContador() {
  try {
    const response = await fetch(backendUrl, {
      method: 'POST'
    });

    const data = await response.json();
    contadorDiv.textContent = data.total;
  } catch (err) {
    console.error('Erro ao acessar backend (POST):', err);
    contadorDiv.textContent = 'Erro';
  }
}

// Apenas consulta (sem incrementar)
async function atualizarSemIncrementar() {
  try {
    const response = await fetch(backendUrl);
    const data = await response.json();
    contadorDiv.textContent = data.total;
  } catch (err) {
    console.error('Erro ao acessar backend (GET):', err);
  }
}

// Executa ao carregar a página
atualizarContador();

// Atualiza a cada 5 segundos
setInterval(atualizarSemIncrementar, 5000);
