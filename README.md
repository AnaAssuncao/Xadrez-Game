<h2 align= "center" >
<img  src="./Img/logoChess.png" width="200px">
</h2>
<h1 align= "center">Vanilla Chess </h1>
<h3 align= "center">Jogo de Xadrez para se divertir com um amigo</h3>
<h4 align="center"> 
🚧  Vanilla Chess 🚀 Em construção...  🚧
</h4>

# Indice

- [Sobre](#-sobre)
- [Layout](#-layout)
- [Pré-requisitos](#-pré-requisitos)
- [Rodando o Back End](#-rodando-o-back-end-servidor)
- [Design Patterns](#-design-patterns)
- [Arquitetura](#-arquitetura)
- [Features](#-features)
- [Contribuição](#-contribuição)
- [Autor](#autor)

## ♟️ Sobre
Vanilla Chess é uma versão tradicional do jogo Xadrez. Este projeto possui como objetivo criar um jogo de Xadrez, com dois modo de jogo local e online, empregando JavaScript ES5 puro (<http://vanilla-js.com/>). A elaboração do projeto utilizou-se dos princípios SOLID, juntamente com boas práticas de engenharia de software.

Nesta aplicação além de se utilizar JavaScript, fez uso de recursos comuns para desenvolver front-end, CSS3 e HTML5. Estas abordagens foram escolhidas para não ser necessário o uso de transpiladores, como SASS e Babel.

## 🎨 Layout
### 🖥️ Web
<img  src="./Img_Github/homeMenu.png" width="800px" >
<img  src="./Img_Github/chess.png" width="800px">
<img  src="./Img_Github/chessDark.png" width="800px">

### 📱 Mobile
<img  src="./Img_Github/homeMenuMobile.png" height="400px"><img  src="./Img_Github/chessMobile.png" height="400px"><img  src="./Img_Github/chessDarkMobile.png" height="400px">

## ✅ Pré-requisitos
Entrar na página abaixo para poder jogar:
<https://anaassuncao.github.io/Front-end_Xadrez/>

Abaixo encontra-se os passos de como clonar este projeto:

```bash
# Clone este repositório
git clone <https://github.com/AnaAssuncao/Front-end_Xadrez>

# Acesse a pasta do projeto no terminal/cmd
cd Front-end

# Utilize o servidor de conteúdo de sua preferência sobre a pasta do projeto, no navegador abre a seguinte rota
./index.html
```

## 🎲 Rodando o Back End (servidor)
Para saber mais sobre o Back End deste jogo acesse o link abaixo:
<https://github.com/AnaAssuncao/Back-end_Xadrez>

## 👀 Design Patterns 
Durante o desenvolvimento do jogo apareceram diversos problemas, a cada um destes para ser resolvido utilizou-se de técnicas de engenharia de software. Pode-se destacar que, alguns destes problemas puderam ser solucionados usando alguns design Patterns conhecidos, facilitando assim a elaboração de uma solução otimizada e limpa. 

Segue a lista dos design Patterns usados:

Design de Criação
- Builder
- Factory Method
- Singleton

Design Estruturais
- Composite
- Composite
- Flyweight
- Proxy

Design de Comportamentais
- Iterator
- Memento
- Observer
- State
- Strategy
- Visitor

## 💻 Arquitetura 
### MVVM
Para elaboração do xadrez utilizou-se da arquitetura Model-View-ViewModel ( MVVM ), para separação mais clara da camada de apresentação da lógica do jogo. Separando em:
- ViewScreen (View): esta camada comunica com a DOM (Document Object Model)X' para modificar a parte renderizável do jogo.
- ViewController (ViewModel): esta camada disponibiliza para a View uma lógica de apresentação. E ela que coordena as iterações entre a View com o Controle, visto que ambos não têm conhecimento um do outro.
- Controller: esta camada realiza a iteração entre View Controller, o Game e a Network. Sendo o controle do jogo.
- Game(Model): esta camada encontra-se a lógica do xadrez, como ele funciona. Os movimentos das peças, quando uma pode ser capturada, os cheques, o empate, as jogadas especiais, a assistência, estão nesta camada.

Comunicação Back-End:  Existe uma camada específica que realiza a comunicação com o servidor, Network.
A comunicação com servidor é realizada pelo protocolo HTTP.

## 🔧 Features
O jogo é dividido em dois modos:

- Jogo Local: para jogar junto com amigo próximo usando um tabuleiro virtual.
- Jogo Online: para jogar com um amigo distante, em que deve informar o nome e o código da sala que quer conectar. 

Nestes modos possuem:

* Informação de quem é o turno, conectividade e cheque.
* Mover as peças através de escolhas por input da peça e da coordenada, depois clicando no botão para mover. Clique sobre a peça e clique no local onde quer mover. E também, arrastar a peça para o local escolhido.
* Cronômetro do total de jogo corrido e o tempo do turno para poder mover (sendo apenas 5 minutos).
* Em detalhes, há o log com todas informações referente ao jogo. E também, as peças capturadas.
* Histótico com as jogadas realizadas.

No modo Jogo Local:
* Possibilidade de retornar a jogada anterior. 

No modo Jogo Online:
* Recuperar sessão.
* Observação: precisa que o Backend esteja sendo executado para funcionar.

## 👥 Contribuição
João Pedro Samarino 
<https://github.com/jpsamarino>

## Autor
<img style="border-radius: 50%;" src="https://media-exp1.licdn.com/dms/image/C4E03AQGYUal9ZyvRtA/profile-displayphoto-shrink_800_800/0/1594406991642?e=1625097600&v=beta&t=T9H1zgdKQ4H1Ecrgm0AKNCkoxkE8xKL5zCo3_1GN0QM" width="150px;" alt=""/>
<sub><b>Ana Paula Assunção</b></sub>

[![Linkedin Badge](https://img.shields.io/badge/-AnaAssunção-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/ana-assuncao/)](https://www.linkedin.com/in/ana-assuncao/) 