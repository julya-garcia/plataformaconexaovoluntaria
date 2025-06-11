// Array para armazenar as necessidades cadastradas
let needs = [];

// Referências aos elementos HTML
const appRoot = document.getElementById('app-root');
const homeLink = document.getElementById('homeLink');
const cadastroLink = document.getElementById('cadastroLink');
const visualizacaoLink = document.getElementById('visualizacaoLink');
const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const closeModalBtn = document.getElementById('closeModalBtn');

// Function to show the message modal
function showModal(message) {
    modalMessage.innerHTML = message; // Use innerHTML to allow HTML tags in the details modal
    messageModal.classList.remove('hidden');
}

// Event listener to close the modal
closeModalBtn.addEventListener('click', () => {
    messageModal.classList.add('hidden');
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === messageModal) {
        messageModal.classList.add('hidden');
    }
});

// --- Page Rendering Functions ---

// Renders the home page
function renderHomePage() {
    appRoot.innerHTML = `
        <section class="text-center py-16 bg-off-white rounded-xl shadow-lg fade-in">
            <h1 class="font-bold mb-6 text-black-neutral">Conectando Corações e Causas</h1>
            <p class="mb-8 text-dark-grey-neutral max-w-4xl mx-auto">
                A plataforma que aproxima ONGs e voluntários, tornando o auxílio à comunidade mais fácil e eficiente.
                Encontre oportunidades de voluntariado e ajude a transformar vidas.
            </p>
            <!-- Os botões "Cadastrar Necessidade" e "Ver Oportunidades" foram removidos daqui -->
        </section>
        <section class="mt-16 text-center text-dark-grey-neutral">
            <h2 class="font-semibold mb-6 text-black-neutral">Nosso Propósito</h2>
            <p class="max-w-3xl mx-auto">
                Simplificar a conexão entre quem precisa de ajuda e quem deseja ajudar. Acreditamos que a união de esforços
                pode gerar um impacto social significativo em nossa comunidade.
            </p>
        </section>
    `;
    // Event listeners for the removed buttons are no longer needed
}

// Renders the necessity registration page
function renderCadastroPage() {
    appRoot.innerHTML = `
        <section class="bg-off-white p-10 rounded-xl shadow-lg fade-in max-w-4xl mx-auto">
            <h2 class="font-bold mb-8 text-center text-black-neutral">Cadastrar Nova Necessidade</h2>
            <form id="necessityForm" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="col-span-full">
                    <label for="institutionName" class="block text-base font-medium text-dark-grey-neutral mb-2">Nome da Instituição <span class="text-red-500">*</span></label>
                    <input type="text" id="institutionName" name="institutionName" required class="w-full p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all">
                </div>

                <div>
                    <label for="helpType" class="block text-base font-medium text-dark-grey-neutral mb-2">Tipo de Ajuda <span class="text-red-500">*</span></label>
                    <select id="helpType" name="helpType" required class="w-full p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all">
                        <option value="">Selecione um tipo</option>
                        <option value="Educação">Educação</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Meio Ambiente">Meio Ambiente</option>
                        <option value="Doação de Alimentos">Doação de Alimentos</option>
                        <option value="Doação de Roupas">Doação de Roupas</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

                <div>
                    <label for="title" class="block text-base font-medium text-dark-grey-neutral mb-2">Título da Necessidade <span class="text-red-500">*</span></label>
                    <input type="text" id="title" name="title" required class="w-full p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all">
                </div>

                <div class="col-span-full">
                    <label for="description" class="block text-base font-medium text-dark-grey-neutral mb-2">Descrição Detalhada <span class="text-red-500">*</span></label>
                    <textarea id="description" name="description" rows="6" required class="w-full p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all"></textarea>
                </div>

                <div>
                    <label for="cep" class="block text-base font-medium text-dark-grey-neutral mb-2">CEP <span class="text-red-500">*</span></label>
                    <input type="text" id="cep" name="cep" required pattern="[0-9]{5}-?[0-9]{3}" maxlength="9" placeholder="Ex: 00000-000" class="w-full p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all">
                </div>

                <div>
                    <label for="address" class="block text-base font-medium text-medium-grey-neutral mb-2">Rua</label>
                    <input type="text" id="address" name="address" readonly class="w-full p-3 border border-light-grey-neutral rounded-md bg-gray-100 text-medium-grey-neutral cursor-not-allowed">
                </div>
                <div>
                    <label for="neighborhood" class="block text-base font-medium text-medium-grey-neutral mb-2">Bairro</label>
                    <input type="text" id="neighborhood" name="neighborhood" readonly class="w-full p-3 border border-light-grey-neutral rounded-md bg-gray-100 text-medium-grey-neutral cursor-not-allowed">
                </div>
                <div>
                    <label for="city" class="block text-base font-medium text-medium-grey-neutral mb-2">Cidade</label>
                    <input type="text" id="city" name="city" readonly class="w-full p-3 border border-light-grey-neutral rounded-md bg-gray-100 text-medium-grey-neutral cursor-not-allowed">
                </div>
                <div>
                    <label for="state" class="block text-base font-medium text-medium-grey-neutral mb-2">Estado</label>
                    <input type="text" id="state" name="state" readonly class="w-full p-3 border border-light-grey-neutral rounded-md bg-gray-100 text-medium-grey-neutral cursor-not-allowed">
                </div>

                <div class="col-span-full">
                    <label for="contact" class="block text-base font-medium text-dark-grey-neutral mb-2">Contato (E-mail ou Telefone) <span class="text-red-500">*</span></label>
                    <input type="text" id="contact" name="contact" required placeholder="ex: email@example.com ou (xx) xxxxx-xxxx" class="w-full p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all">
                </div>

                <div class="col-span-full flex justify-end mt-4">
                    <button type="submit" class="px-8 py-4 rounded-full shadow-md button-animation flex items-center justify-center">
                        Cadastrar
                        <span id="loadingSpinner" class="loading-spinner ml-3 hidden"></span>
                    </button>
                </div>
            </form>
        </section>
    `;
    attachCadastroFormListeners();
}

// Renders the necessity visualization page
function renderVisualizacaoPage() {
    appRoot.innerHTML = `
        <section class="bg-off-white p-10 rounded-xl shadow-lg fade-in">
            <h2 class="font-bold mb-8 text-center text-black-neutral">Oportunidades de Voluntariado</h2>

            <div class="flex flex-col md:flex-row gap-6 mb-10">
                <input type="text" id="searchBar" placeholder="Pesquisar por título ou descrição..."
                    class="flex-grow p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all">

                <select id="filterType"
                    class="p-3 border border-light-grey-neutral rounded-md focus:ring-2 focus:ring-pastel-green-dark focus:border-transparent transition-all md:w-auto">
                    <option value="">Filtrar por Tipo de Ajuda</option>
                    <option value="Educação">Educação</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Meio Ambiente">Meio Ambiente</option>
                    <option value="Doação de Alimentos">Doação de Alimentos</option>
                    <option value="Doação de Roupas">Doação de Roupas</option>
                    <option value="Outros">Outros</option>
                </select>
            </div>

            <div id="needsList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Necessities will be loaded here -->
                ${needs.length === 0 ? '<p class="col-span-full text-center text-medium-grey-neutral text-xl py-12">Nenhuma necessidade cadastrada ainda. Seja o primeiro a cadastrar!</p>' : ''}
            </div>
        </section>
    `;
    displayNeeds(needs); // Displays all necessities initially
    attachVisualizacaoListeners();
}

// --- Logic and Event Functions ---

// Attaches listeners to the registration form
function attachCadastroFormListeners() {
    const necessityForm = document.getElementById('necessityForm');
    const cepInput = document.getElementById('cep');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Formats the CEP as the user types
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Removes everything that is not a digit
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value;
    });

    // ViaCEP Integration
    cepInput.addEventListener('blur', async () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Removes hyphens for the API
        if (cep.length === 8) {
            loadingSpinner.classList.remove('hidden'); // Shows the spinner
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    document.getElementById('address').value = data.logradouro;
                    document.getElementById('neighborhood').value = data.bairro;
                    document.getElementById('city').value = data.localidade;
                    document.getElementById('state').value = data.uf;
                } else {
                    showModal('CEP não encontrado. Por favor, verifique o CEP digitado.');
                    clearAddressFields();
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                showModal('Erro ao conectar com a API ViaCEP. Tente novamente mais tarde.');
                clearAddressFields();
            } finally {
                loadingSpinner.classList.add('hidden'); // Hides the spinner
            }
        } else {
            clearAddressFields();
        }
    });

    function clearAddressFields() {
        document.getElementById('address').value = '';
        document.getElementById('neighborhood').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
    }

    // Form submission
    necessityForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents default form submission

        // Simple validation
        const institutionName = document.getElementById('institutionName').value.trim();
        const helpType = document.getElementById('helpType').value.trim();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const cep = document.getElementById('cep').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (!institutionName || !helpType || !title || !description || !cep || !contact) {
            showModal('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Basic CEP validation (format only)
        const cepPattern = /^[0-9]{5}-?[0-9]{3}$/;
        if (!cepPattern.test(cep)) {
            showModal('Por favor, digite um CEP válido (Ex: 00000-000 ou 00000000).');
            return;
        }

        // Creates the necessity object
        const newNeed = {
            id: Date.now(), // Unique ID based on timestamp
            institutionName: institutionName,
            helpType: helpType,
            title: title,
            description: description,
            cep: cep,
            address: document.getElementById('address').value,
            neighborhood: document.getElementById('neighborhood').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            contact: contact,
            dateAdded: new Date().toLocaleDateString('pt-BR')
        };

        needs.push(newNeed); // Adds to the array
        showModal('Necessidade cadastrada com sucesso!');
        necessityForm.reset(); // Clears the form
        clearAddressFields(); // Ensures address fields are also cleared
    });
}

// Displays necessities in cards
function displayNeeds(filteredNeeds) {
    const needsList = document.getElementById('needsList');
    if (!needsList) return; // Ensures the element exists

    if (filteredNeeds.length === 0) {
        needsList.innerHTML = '<p class="col-span-full text-center text-medium-grey-neutral text-xl py-12">Nenhuma necessidade encontrada com os critérios de pesquisa/filtro.</p>';
        return;
    }

    needsList.innerHTML = filteredNeeds.map(need => `
        <div class="bg-off-white p-6 rounded-xl shadow-md card-animation border border-light-grey-neutral">
            <h3 class="text-xl font-semibold mb-2 text-black-neutral">${need.title}</h3>
            <p class="text-sm text-dark-grey-neutral mb-2">Instituição: <span class="font-medium">${need.institutionName}</span></p>
            <p class="text-sm text-medium-grey-neutral mb-4">Tipo de Ajuda: <span class="font-medium text-pastel-green-dark">${need.helpType}</span></p>
            <p class="text-dark-grey-neutral mb-4 text-base max-h-24 overflow-hidden text-ellipsis">${need.description}</p>
            <button class="px-4 py-2 rounded-full text-sm font-semibold button-animation"
                    onclick="showNeedDetails(${need.id})">Ver Detalhes</button>
        </div>
    `).join('');
}

// Shows necessity details in a modal
function showNeedDetails(id) {
    const need = needs.find(n => n.id === id);
    if (!need) {
        showModal('Detalhes da necessidade não encontrados.');
        return;
    }

    const detailsHtml = `
        <h3 class="text-2xl font-bold mb-4 text-black-neutral">${need.title}</h3>
        <p class="text-lg mb-2 text-dark-grey-neutral"><strong>Instituição:</strong> ${need.institutionName}</p>
        <p class="text-lg mb-2 text-dark-grey-neutral"><strong>Tipo de Ajuda:</strong> ${need.helpType}</p>
        <p class="text-lg mb-4 text-dark-grey-neutral"><strong>Descrição:</strong></p>
        <p class="text-md text-dark-grey-neutral mb-4 text-left">${need.description}</p>
        <p class="text-md text-medium-grey-neutral"><strong>Endereço:</strong> ${need.address}, ${need.neighborhood}, ${need.city} - ${need.state} (${need.cep})</p>
        <p class="text-md text-medium-grey-neutral mb-4"><strong>Contato:</strong> ${need.contact}</p>
        <p class="text-xs text-medium-grey-neutral">Cadastrado em: ${need.dateAdded}</p>
    `;
    showModal(detailsHtml);
}

// Attaches listeners to the visualization page
function attachVisualizacaoListeners() {
    const searchBar = document.getElementById('searchBar');
    const filterType = document.getElementById('filterType');

    // Main filter function
    function applyFilters() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedType = filterType.value;

        const filtered = needs.filter(need => {
            const matchesSearch = need.title.toLowerCase().includes(searchTerm) ||
                                  need.description.toLowerCase().includes(searchTerm);
            const matchesType = selectedType === '' || need.helpType === selectedType;
            return matchesSearch && matchesType;
        });
        displayNeeds(filtered);
    }

    searchBar.addEventListener('input', applyFilters);
    filterType.addEventListener('change', applyFilters);
}

// --- Navigation and Initialization ---

// Event listeners for navigation
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderHomePage();
});

cadastroLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderCadastroPage();
});

visualizacaoLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderVisualizacaoPage();
});

// Initializes the page on load
document.addEventListener('DOMContentLoaded', renderHomePage);
