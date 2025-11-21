Meu Acerto

Meu Acerto é uma aplicação web para gerenciamento de despesas compartilhadas, ideal para casais ou amigos que dividem contas.

Ela permite o controle de gastos de múltiplos cartões, a divisão automática de contas e o acompanhamento de compras parceladas, tudo sincronizado em tempo real para todos os usuários.

Além disso, cada lançamento fica vinculado a um mês de competência (ex.: 2025-11), permitindo:

Trabalhar sempre no mês atual com o painel “zerado”;

Manter um histórico mensal completo (Outubro, Novembro, Dezembro...);

Alternar entre os meses e ver exatamente como o painel estava naquele período (lançamentos, totais, saldos, quem deve para quem etc.).

✨ Funcionalidades

Sincronização em Tempo Real: Lançamentos feitos por um usuário aparecem instantaneamente para o outro, graças à integração com o Firebase Firestore.

Importação de Faturas: Importe seus lançamentos rapidamente a partir de arquivos .csv ou .xlsx do seu banco.

Controle de Parcelas: Lance uma compra parcelada uma única vez e a aplicação cuida de gerar as parcelas futuras automaticamente, posicionando cada parcela no mês correto.

Divisão Inteligente: Defina se uma despesa é individual ou dividida e veja o saldo final ser calculado automaticamente.

Histórico Mensal: Abra meses anteriores para revisar gastos passados sem misturar com o mês atual.

Filtros e Visualização: Filtre os lançamentos por tipo (Cartão, Pix, Boleto, Ajuste) e identifique facilmente despesas exclusivas com um sistema de cores.

Design Responsivo: Acesse e gerencie suas finanças de qualquer dispositivo (celular, tablet ou computador).

PWA Ready: Adicione a aplicação à tela inicial do seu celular para uma experiência de app nativo.

🚀 Como Executar

Por ser um projeto web front-end, basta abrir o arquivo index.html em qualquer navegador moderno. Para que a sincronização com o banco de dados funcione, a aplicação deve ser servida a partir de um ambiente online (como o GitHub Pages, Vercel ou o próprio Codespaces).