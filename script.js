// Array para armazenar as necessidades
let necessidades = [];

// Função para mostrar/ocultar seções e atualizar menu
function navegar(pagina) {
  const secHome = document.getElementById('home');
  const secCadastro = document.getElementById('cadastro');
  const secVisualizacao = document.getElementById('visualizacao');

  const navHome = document.getElementById('navHome');
  const navCadastro = document.getElementById('navCadastro');
  const navVisualizacao = document.getElementById('navVisualizacao');

  // Remove active de todas
  [secHome, secCadastro, secVisualizacao].forEach(s => s.classList.remove('active'));
  [navHome, navCadastro, navVisualizacao].forEach(n => n.classList.remove('active'));

  if (pagina === 'home') {
    secHome.classList.add('active');
    navHome.classList.add('active');
  } else if (pagina === 'cadastro') {
    secCadastro.classList.add('active');
    navCadastro.classList.add('active');
  } else if (pagina === 'visualizacao') {
    secVisualizacao.classList.add('active');
    navVisualizacao.classList.add('active');
    mostrarNecessidades();
  }
  document.getElementById('msg').textContent = '';
}

// Busca CEP via ViaCEP API
function consultaCEP(cep) {
  cep = cep.replace(/\D/g, '');
  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (!data.erro) {
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
      } else {
        alert('CEP não encontrado.');
        limparEndereco();
      }
    })
    .catch(() => {
      alert('Erro ao consultar o CEP.');
      limparEndereco();
    });
}

function limparEndereco() {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

// Validação simples do contato (email ou telefone)
function validarContato(contato) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  return emailRegex.test(contato) || telefoneRegex.test(contato);
}

// Salvar dados no localStorage
function salvarLocalStorage() {
  localStorage.setItem('necessidades', JSON.stringify(necessidades));
}

// Carregar dados do localStorage
function carregarLocalStorage() {
  const dados = localStorage.getItem('necessidades');
  if (dados) {
    necessidades = JSON.parse(dados);
  }
}

// Exibir as necessidades na seção visualização
function mostrarNecessidades() {
  carregarLocalStorage();
  const lista = document.getElementById('listaNecessidades');
  const pesquisa = document.getElementById('pesquisa').value.toLowerCase();
  const filtroTipo = document.getElementById('filtroTipo').value;

  lista.innerHTML = '';

  const filtradas = necessidades.filter(n => {
    const texto = (n.titulo + ' ' + n.descricao).toLowerCase();
    const correspondePesquisa = texto.includes(pesquisa);
    const correspondeTipo = filtroTipo ? n.tipoAjuda === filtroTipo : true;
    return correspondePesquisa && correspondeTipo;
  });

  if (filtradas.length === 0) {
    lista.innerHTML = '<p>Nenhuma necessidade encontrada.</p>';
    return;
  }

  filtradas.forEach(n => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${n.titulo}</h3>
      <p><strong>Instituição:</strong> ${n.nomeInstituicao}</p>
      <p>${n.descricao}</p>
      <p><strong>Endereço:</strong> ${n.rua}, ${n.bairro}, ${n.cidade} - ${n.estado}</p>
      <p><strong>CEP:</strong> ${n.cep}</p>
      <p><strong>Contato:</strong> ${n.contato}</p>
      <p class="tipo-ajuda">Tipo de Ajuda: ${n.tipoAjuda}</p>
    `;

    lista.appendChild(card);
  });
}

// Eventos de navegação
document.getElementById('navHome').addEventListener('click', e => {
  e.preventDefault();
  navegar('home');
});
document.getElementById('navCadastro').addEventListener('click', e => {
  e.preventDefault();
  navegar('cadastro');
});
document.getElementById('navVisualizacao').addEventListener('click', e => {
  e.preventDefault();
  navegar('visualizacao');
});

// Evento do campo CEP - consulta automática
document.getElementById('cep').addEventListener('blur', e => {
  const cep = e.target.value;
  consultaCEP(cep);
});

// Evento submit do formulário
document.getElementById('formNecessidade').addEventListener('submit', e => {
  e.preventDefault();

  const nomeInstituicao = document.getElementById('nomeInstituicao').value.trim();
  const tipoAjuda = document.getElementById('tipoAjuda').value;
  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const rua = document.getElementById('rua').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim();
  const contato = document.getElementById('contato').value.trim();

  const msg = document.getElementById('msg');
  msg.style.color = 'red';

  if (!nomeInstituicao || !tipoAjuda || !titulo || !descricao || !cep || !rua || !bairro || !cidade || !estado || !contato) {
    msg.textContent = 'Por favor, preencha todos os campos obrigatórios.';
    return;
  }

  if (!validarContato(contato)) {
    msg.textContent = 'Contato inválido. Informe um email ou telefone válido.';
    return;
  }

  // Salvar a necessidade
  const novaNecessidade = {
    nomeInstituicao,
    tipoAjuda,
    titulo,
    descricao,
    cep,
    rua,
    bairro,
    cidade,
    estado,
    contato,
  };

  necessidades.push(novaNecessidade);
  salvarLocalStorage();

  msg.style.color = 'green';
  msg.textContent = 'Necessidade cadastrada com sucesso!';

  e.target.reset();
  limparEndereco();
});

// Eventos para filtro e pesquisa na visualização
document.getElementById('pesquisa').addEventListener('input', mostrarNecessidades);
document.getElementById('filtroTipo').addEventListener('change', mostrarNecessidades);

// Carregar lista ao abrir página, caso esteja na visualização
window.onload = () => {
  carregarLocalStorage();
  mostrarNecessidades();
};
