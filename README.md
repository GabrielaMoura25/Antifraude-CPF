# Antifraude CPF

Este projeto visa desenvolver uma aplicação para gerenciamento de CPFs com risco de fraude, suplantando o controle manual atualmente realizado em uma planilha eletrônica.

## Tecnologias e Ferramentas

- Node.js (Typescript)
- MySQL
- Serviço RESTful(JSON)
- Docker
- Design Pattern, SOLID, Clean Code
- Arquitetura Hexagonal
- Arquitetura DDD

## Pré-requisitos

- Para construir e executar a aplicação, é necessário ter o Node.js, npm e o Docker instalados na máquina.
- MySQL instalado ou disponível em um container Docker

## Build

Inicie realizando o clone deste repositório com o comando abaixo: 

    git clone https://github.com/GabrielaMoura25/Desafio-Max-Milhas.git

Navegue até a pasta raiz da aplicação:
    
    cd Desafio-Max-Milhas

Instale as dependências:

    npm install

## Execução

Para executar a aplicação, é necessário ter o Docker e o banco de dados MySQL em execução. Para isso, execute o seguinte comando na raiz da aplicação:

    docker-compose up

A aplicação ficará disponível na porta 3001.

## Testes

Para rodar os testes unitários, navegue até a pasta backend: 

    cd backend

E execute o seguinte comando:

    npm run test

E para rodar os testes de integração, execute o seguinte comando:

    npm run test1

## Escolha das Tecnologias

<details>
A escolha por utilizar Node.js se deu pela facilidade de trabalhar com serviços RESTful, além de ser uma linguagem de alta performance e escalabilidade. Já o banco de dados MySQL foi escolhido pela sua grande disponibilidade de recursos e estabilidade.

O uso do Docker permite que a aplicação seja executada em diferentes ambientes de maneira consistente, garantindo a integridade e a disponibilidade do sistema.
</details>

## Arquitetura

<details>
A aplicação segue o estilo arquitetural DDD (Domain Driven Design), com objetivo de facilitar a implementação, e a arquitetura hexagonal, que visa separar as camadas lógicas da aplicação em módulos bem definidos e independentes, facilitando a manutenção do código.

As melhores práticas de desenvolvimento, como Design Pattern, SOLID e Clean Code, foram seguidas para garantir a qualidade e manutenibilidade do código.
</details>