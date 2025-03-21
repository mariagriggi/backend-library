import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors());


const users = []

// Criar usuário
app.post('/usuarios', async (req, res) => {
    try {
        const novoUsuario = await prisma.user.create({
            data: {
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                data_cadastro: new Date(), 
            }
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
    }
});


// Buscar usuários (com ou sem filtro)
app.get('/usuarios', async (req, res) => {
    try {
        const filtros = {};

        if (req.query.nome) filtros.nome = req.query.nome;
        if (req.query.email) filtros.email = req.query.email;
        if (req.query.telefone) filtros.telefone = parseInt(req.query.telefone);
        if (req.query.endereco) filtros.endereco = req.query.endereco;
        if (req.query.data_cadastro) filtros.data_cadastro = req.query.data_cadastro;

        const users = await prisma.user.findMany({
            where: filtros,
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: error.message });
    }
});


// Atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const usuarioAtualizado = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                data_cadastro: req.body.data_cadastro,
            }
        });
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(404).json({ erro: 'Usuário não encontrado', detalhes: error.message });
    }
});


// Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(404).json({ erro: 'Usuário não encontrado', detalhes: error.message });
    }
});

app.delete('/usuarios', async (req, res) => {
    try {
        const usuariosDeletados = await prisma.user.deleteMany();

        res.status(200).json({
            message: 'Todos os usuários foram deletados com sucesso!',
            quantidade: usuariosDeletados.count
        });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao deletar usuários', detalhes: error.message });
    }
});




// Criar livro
app.post('/livro', async (req, res) => {
    try {
        const novoLivro = await prisma.livro.create({
            data: {
                titulo: req.body.titulo,
                autor: req.body.autor,
                categoria: req.body.categoria,
                data_publicacao: req.body.data_publicacao, // Enviar diretamente como string
                quantidade_estoque: Number(req.body.quantidade_estoque), // Converte para número
                isbn: req.body.isbn,
            }
        });
        
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar livro', detalhes: error.message });
    }
});


// Buscar livros (com ou sem filtro)
app.get('/livro', async (req, res) => {
    try {
        const filtrosL = {};

        if (req.query.titulo) filtrosL.titulo = req.query.titulo;
        if (req.query.autor) filtrosL.autor = req.query.autor;
        if (req.query.categoria) filtrosL.categoria = req.query.categoria;
        if (req.query.data_publicacao) filtrosL.data_publicacao = req.query.data_publicacao;
        if (req.query.quantidade_estoque) filtrosL.quantidade_estoque = parseInt(req.query.quantidade_estoque);
        if (req.query.isbn) filtrosL.isbn = parseInt(req.query.isbn);

        const livros = await prisma.livro.findMany({
            where: filtrosL,
        });

        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar livros', detalhes: error.message });
    }
});


// Atualizar livros
app.put('/livro/:id_livro', async (req, res) => {
    try {
        const livroAtualizado = await prisma.livro.update({
            where: { id_livro: req.params.id_livro },
            data: {
                titulo: req.body.titulo,
                autor: req.body.autor,
                categoria: req.body.categoria,
                data_publicacao: req.body.data_publicacao,
                quantidade_estoque: req.body.quantidade_estoque,
                isbn: req.body.isbn,
            }
        });
        res.status(200).json(livroAtualizado);
    } catch (error) {
        res.status(404).json({ erro: 'Livro não encontrado', detalhes: error.message });
    }
});


// Deletar livro
app.delete('/livro/:id_livro', async (req, res) => {
    try {
        await prisma.livro.delete({
            where: { id_livro: req.params.id_livro },
        });
        res.status(200).json({ message: 'Livro deletado com sucesso!' });
    } catch (error) {
        res.status(404).json({ erro: 'Livro não encontrado', detalhes: error.message });
    }
});

app.delete('/livro', async (req, res) => {
    try {
        const livrosDeletados = await prisma.livro.deleteMany();

        res.status(200).json({
            message: 'Todos os livros foram deletados com sucesso!',
            quantidade: livrosDeletados.count
        });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao deletar livros', detalhes: error.message });
    }
});




// Criar categoria
app.post('/categoria', async (req, res) => {
    try {
        const novaCategoria = await prisma.categoria.create({
            data: {
                nome_categoria: req.body.nome_categoria,
                descricao: req.body.descricao,
            }
        });
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar categoria', detalhes: error.message });
    }
});


// Buscar categoria (com ou sem filtro)
app.get('/categoria', async (req, res) => {
    try {
        const filtrosC = {};

        if (req.query.nome_categoria) filtrosC.nome_categoria = req.query.nome_categoria;
        if (req.query.descricao) filtrosC.descricao = req.query.descricao;
        const categoria = await prisma.categoria.findMany({
            where: filtrosC,
        });

        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar categoria', detalhes: error.message });
    }
});


// Atualizar categoria
app.put('/categoria/:id_categoria', async (req, res) => {
    try {
        const categoriaAtualizada = await prisma.categoria.update({
            where: { id_categoria: req.params.id_categoria },
            data: {
                nome_categoria: req.body.titulo,
                descricao: req.body.autor,
            }
        });
        res.status(200).json(categoriaAtualizada);
    } catch (error) {
        res.status(404).json({ erro: 'Categoria não encontrada', detalhes: error.message });
    }
});


// Deletar categoria
app.delete('/categoria/:id_categoria', async (req, res) => {
    try {
        await prisma.categoria.delete({
            where: { id_categoria: req.params.id_categoria },
        });
        res.status(200).json({ message: 'Categoria deletada com sucesso!' });
    } catch (error) {
        res.status(404).json({ erro: 'Categoria não encontrada', detalhes: error.message });
    }
});

app.delete('/categoria', async (req, res) => {
    try {
        const categoriasDeletadas = await prisma.categoria.deleteMany();

        res.status(200).json({
            message: 'Todas as categorias foram deletadas com sucesso!',
            quantidade: categoriasDeletadas.count
        });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao deletar categorias', detalhes: error.message });
    }
});




// Criar emprestimo
app.post('/emprestimo', async (req, res) => {
    try {
        const novoEmprestimo = await prisma.emprestimo.create({
            data: {
                id_usuario: req.body.id_usuario,
                id_livro: req.body.id_livro,
                data_emprestimo: new Date(),
                data_devolucao_prevista: req.body.data_devolucao_prevista,
                data_devolucao_real: new Date()
            }
        });
        res.status(201).json(novoEmprestimo);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar empréstimo', detalhes: error.message });
    }
});


// Buscar emprestimo (com ou sem filtro)
app.get('/emprestimo', async (req, res) => {
    try {
        const filtrosE = {};

        if (req.query.id_usuario) filtrosE.id_usuario = req.query.id_usuario;
        if (req.query.id_livro) filtrosE.id_livro = req.query.id_livro;
        if (req.query.data_emprestimo) filtrosE.data_emprestimo = req.query.data_emprestimo;
        if (req.query.data_devolucao_prevista) filtrosE.data_devolucao_prevista = req.query.data_devolucao_prevista;
        if (req.query.data_devolucao_real) filtrosE.data_devolucao_real = req.query.data_devolucao_real;
        const emprestimo = await prisma.emprestimo.findMany({
            where: filtrosE,
        });

        res.status(200).json(emprestimo);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar empréstimo', detalhes: error.message });
    }
});


// Atualizar emprestimo
app.put('/emprestimo/:id_emprestimo', async (req, res) => {
    try {
        const emprestimoAtualizado = await prisma.emprestimo.update({
            where: { id_emprestimo: req.params.id_emprestimo },
            data: {
                id_usuario: req.body.id_usuario,
                id_livro: req.body.id_livro,
                data_emprestimo: req.body.data_emprestimo,
                data_devolucao_prevista: req.body.data_devolucao_prevista,
                data_devolucao_real: req.body.data_devolucao_real,
            }
        });
        res.status(200).json(emprestimoAtualizado);
    } catch (error) {
        res.status(404).json({ erro: 'Empréstimo não encontrado', detalhes: error.message });
    }
});


// Deletar emprestimo
app.delete('/emprestimo/:id_emprestimo', async (req, res) => {
    try {
        await prisma.emprestimo.delete({
            where: { id_emprestimo: req.params.id_emprestimo },
        });o
        res.status(200).json({ message: 'Empréstimo deletado com sucesso!' });
    } catch (error) {
        res.status(404).json({ erro: 'Empréstimo não encontrado', detalhes: error.message });
    }
});

app.delete('/emprestimo', async (req, res) => {
    try {
        const emprestimoDeletados = await prisma.emprestimo.deleteMany();

        res.status(200).json({
            message: 'Todos os empréstimos foram deletados com sucesso!',
            quantidade: emprestimoDeletados.count
        });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao deletar empréstimos', detalhes: error.message });
    }
});



// Criar multa
app.post('/multa', async (req, res) => {
    try {
        const novaMulta = await prisma.multa.create({
            data: {
                id_usuario: req.body.id_usuario,
                id_emprestimo: req.body.id_emprestimo,
                valor_multa: req.body.valor_multa,
                data_multa: req.body.data_multa,
            }
        });
        res.status(201).json(novaMulta);
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao criar multa', detalhes: error.message });
    }
});


// Buscar multa (com ou sem filtro)
app.get('/multa', async (req, res) => {
    try {
        const filtrosM = {};

        if (req.query.id_usuario) filtrosM.id_usuario = req.query.id_usuario;
        if (req.query.id_livro) filtrosM.id_livro = req.query.id_livro;
        if (req.query.data_emprestimo) filtrosM.data_emprestimo = req.query.data_emprestimo;
        if (req.query.data_devolucao_prevista) filtrosM.data_devolucao_prevista = req.query.data_devolucao_prevista;
        if (req.query.data_devolucao_real) filtrosM.data_devolucao_real = req.query.data_devolucao_real;
        const multa = await prisma.multa.findMany({
            where: filtrosM,
        });

        res.status(200).json(multa);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar multa', detalhes: error.message });
    }
});


// Atualizar multa
app.put('/multa/:id_multa', async (req, res) => {
    try {
        const multaAtualizada = await prisma.multa.update({
            where: { id_multa: req.params.id_multa },
            data: {
                id_usuario: req.body.id_usuario,
                id_emprestimo: req.body.id_emprestimo,
                valor_multa: req.body.valor_multa,
                data_multa: req.body.data_multa,
            }
        });
        res.status(200).json(multaAtualizada);
    } catch (error) {
        res.status(404).json({ erro: 'Multa não encontrado', detalhes: error.message });
    }
});


// Deletar multa
app.delete('/multa/:id_multa', async (req, res) => {
    try {
        await prisma.multa.delete({
            where: { id_multa: req.params.id_multa },
        });o
        res.status(200).json({ message: 'Multa deletada com sucesso!' });
    } catch (error) {
        res.status(404).json({ erro: 'Multa não encontrado', detalhes: error.message });
    }
});

app.delete('/multa', async (req, res) => {
    try {
        const multaDeletadas = await prisma.multa.deleteMany();

        res.status(200).json({
            message: 'Todas as multas foram deletadas com sucesso!',
            quantidade: multaDeletadas.count
        });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao deletar multas', detalhes: error.message });
    }
});

app.listen(3000)