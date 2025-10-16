
---

```markdown
# 🧩 Sistema de Agenda Multisserviço

O **Sistema de Agenda Multisserviço** é um aplicativo desenvolvido em **React Native (com Expo)** que tem como objetivo permitir o **agendamento, controle e gerenciamento de múltiplos serviços** — como barbearias, clínicas, oficinas, academias e outros tipos de negócio.

O projeto segue uma **arquitetura em camadas (MVC)**, separando claramente as responsabilidades entre **interface**, **lógica de controle**, **regras de negócio** e **comunicação com APIs**.

---

## 🚀 Tecnologias Utilizadas

- **Expo** — Framework para desenvolvimento mobile com React Native  
- **React Navigation** — Sistema de navegação entre telas  
- **React Native Reanimated / Gesture Handler** — Suporte a gestos e animações  
- **React Native Screens / Safe Area Context** — Performance e layout seguro  
- **React Native Drawer Navigation** — Navegação com menu lateral  
- **React Native Web** — Build e execução no navegador  

---

## 🧱 Estrutura do Projeto (MVC)

A arquitetura é dividida em **4 camadas principais**:

```

src/
│
├── pages/               # Camada de visualização (View)
│   ├── HomePage/
│   ├── LoginPage/
│   ├── AgendaPage/
│   └── ...
│
├── controllers/         # Camada de controle (Controller)
│   ├── AgendaController.js
│   ├── UsuarioController.js
│   └── ...
│
├── services/            # Camada de regra de negócio (Service)
│   ├── AgendaService.js
│   ├── UsuarioService.js
│   └── ...
│
├── repositories/        # Camada de acesso a dados (Repository)
│   ├── ApiRepository.js
│   ├── UsuarioRepository.js
│   └── ...
│
└── App.js

```

---

## 📘 Função de Cada Camada

### 🖥️ **pages/**
São as **telas da aplicação (View)**.  
Responsáveis apenas pela **interface gráfica** e interação direta com o usuário.  
Elas **não devem conter lógica de negócio ou acesso à API**.

**Exemplo:**  
- Exibir uma lista de agendamentos  
- Mostrar formulários de cadastro ou login  
- Renderizar botões, inputs e componentes visuais  

---

### ⚙️ **controllers/**
Os **controllers** servem para **intermediar as telas e as regras de negócio**.  
Neles ficam as **funções auxiliares** e **tratamentos de dados** que não pertencem diretamente à interface.

**Exemplo:**  
- Validação de campos antes de enviar para o service  
- Formatação de horários, nomes e datas  
- Controle de fluxo entre telas e estados  

---

### 🧩 **services/**
A camada **service** é responsável pelas **regras de negócio** do sistema.  
É onde são aplicadas as lógicas que definem **como o sistema funciona** e **como os dados devem ser tratados** antes de chegar ao repositório ou retornar à tela.

**Exemplo:**  
- Verificar disponibilidade de horários antes de criar um agendamento  
- Calcular duração total de um serviço  
- Aplicar filtros ou tratamentos sobre dados retornados da API  

---

### 🌐 **repositories/**
Os **repositories** são responsáveis por **toda a comunicação com a API**.  
Eles executam as requisições HTTP (GET, POST, PUT, DELETE), enviam e recebem dados do servidor, deixando o restante do código independente da camada de rede.

**Exemplo:**  
- Buscar lista de serviços ou usuários  
- Criar um novo agendamento no servidor  
- Atualizar ou remover registros  

---

## 🔁 Fluxo de Dados

O fluxo padrão do sistema segue a seguinte sequência:

```

Page (View)
↓
Controller
↓
Service
↓
Repository (API)

````

- A **página** chama uma função do **controller**.  
- O **controller** trata ou valida os dados e repassa para o **service**.  
- O **service** aplica as regras de negócio e usa o **repository** para se comunicar com a API.  
- O **repository** retorna a resposta, que sobe de volta até a **página** para exibição.

---

## 🧭 Instalação e Execução

1. **Instalar o gerador de apps Expo**
   ```bash
   npm install -g create-expo-app
````

2. **Criar o projeto**

   ```bash
   npx create-expo-app MeuApp --template
   ```

3. **Instalar o React Navigation**

   ```bash
   npm install @react-navigation/native
   ```

4. **Instalar dependências para navegação**

   ```bash
   npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-get-random-values
   ```

5. **Instalar navegação por pilha (Stack)**

   ```bash
   npm install @react-navigation/native-stack
   ```

6. **Instalar navegação com Drawer**

   ```bash
   npm install @react-navigation/drawer
   ```

7. **Habilitar suporte web**

   ```bash
   npx expo install react-dom react-native-web
   ```

8. **Executar o projeto**

   ```bash
   npm start
   ```

---

## 📄 Padrão de Organização por Módulo

Cada módulo (ex: Agenda, Usuário, Serviço) deve seguir este padrão:

```
/src
  /pages
    /AgendaPage/
      index.js
  /controllers
    AgendaController.js
  /services
    AgendaService.js
  /repositories
    AgendaRepository.js
```
