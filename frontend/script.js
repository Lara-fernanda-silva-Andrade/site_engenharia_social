// VERSÃO ATUALIZADA - CONTADOR DE VISITAS

const contadorDiv = document.getElementById('contador');
const backendUrl = 'http://localhost:3000/visitas'; // URL do backend

// Função para atualizar o contador na tela (INCREMENTA)
async function atualizarContador() {
    try {
        // Faz POST para incrementar o total
        const response = await fetch(backendUrl, { method: 'POST' });
        const data = await response.json();

        // Agora usamos "total", que é o que o backend retorna
        contadorDiv.textContent = data.total;

    } catch (err) {
        console.error('Erro ao acessar backend (POST):', err);
        contadorDiv.textContent = 'Erro';
    }
}

// Função para atualizar o contador sem incrementar
async function atualizarSemIncrementar() {
    try {
        const response = await fetch(backendUrl, { method: 'GET' });
        const data = await response.json();

        // Usa "total" novamente
        contadorDiv.textContent = data.total;

    } catch (err) {
        console.error('Erro ao acessar backend (GET):', err);
    }
}

// Executa o POST ao carregar a página (incrementa visita)
atualizarContador();

// Atualiza automaticamente o contador a cada 5 segundos (sem incrementar)
setInterval(atualizarSemIncrementar, 5000);
