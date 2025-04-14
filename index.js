const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const dadosSalao = {
  nome: 'Daniel Cabeleireiro',
  endereco: 'Rua 2, Bairro Santa Luzia',
  horario: 'Seg a Sáb: 8h30 às 18h | Almoço: 13h às 13h40 | Feriados: 8h30 às 12h',
  pagamento: 'Dinheiro, Pix e Cartão (com acréscimo)',
  servicos: [
    { nome: 'Corte social (máquina e tesoura)', preco: 'R$15' },
    { nome: 'Corte social (só máquina)', preco: 'R$15' },
    { nome: 'Degradê simples', preco: 'R$25' },
    { nome: 'Pezzinho', preco: 'R$5' },
    { nome: 'Barba (máquina)', preco: 'R$5' }
  ],
  observacoes: [
    'Atendimento por ordem de chegada',
    'Não realizamos cortes em crianças menores de 4 anos',
    'Não trabalhamos fiado'
  ]
};

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Salão Daniel Cabeleireiro está online!');
});

app.post('/perguntar', (req, res) => {
  const pergunta = req.body.pergunta.toLowerCase();
  let resposta = '';

  if (pergunta.includes('valor') || pergunta.includes('preço') || pergunta.includes('corte')) {
    resposta = dadosSalao.servicos.map(s => `${s.nome} - ${s.preco}`).join('\n');
  } else if (pergunta.includes('horário') || pergunta.includes('funciona') || pergunta.includes('abre')) {
    resposta = dadosSalao.horario;
  } else if (pergunta.includes('endereço') || pergunta.includes('local')) {
    resposta = dadosSalao.endereco;
  } else if (pergunta.includes('paga') || pergunta.includes('pagamento')) {
    resposta = dadosSalao.pagamento;
  } else if (pergunta.includes('criança') || pergunta.includes('menor')) {
    resposta = 'Não realizamos cortes em crianças menores de 4 anos.';
  } else {
    resposta = 'Olá! Posso te ajudar com valores, horários, formas de pagamento ou localização do salão. Pode perguntar!';
  }

  res.json({ resposta });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
