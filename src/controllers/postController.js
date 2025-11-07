import { 
  getPosts, 
  createPost, 
  updatePost, 
  deletePost 
} from "../models/postModel.js";
import { ObjectId } from "mongodb";
import fs from "fs";

// GET → Buscar todos os posts
export const controllerGetPosts = async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Erro ao buscar posts" });
  }
};

// POST → Criar post sem imagem
export const controllerPostPost = async (req, res) => {
  try {
    const postReq = req.body;
    const postCriado = await createPost(postReq);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Falha ao criar post" });
  }
};

// POST → Upload de imagem
export const controllerUploadImage = async (req, res) => {
  const _id = new ObjectId();
  const imgUrl = `http://localhost:3000/${_id}.png`;
  const descricao = req.body.descricao;

  const post = {
    _id,
    descricao,
    imgUrl
  };

  try {
    const postCriado = await createPost(post);
    fs.renameSync(req.file.path, `uploads/${_id}.png`);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Erro ao enviar imagem" });
  }
};

// PUT → Atualizar post (texto e imagem)
export const controllerUpdatePost = async (req, res) => {
  const id = req.params.id;
  const descricao = req.body.descricao;
  const novaImagem = req.file;
  const imgUrl = `http://localhost:3000/${id}.png`;

  const dadosAtualizados = { descricao, imgUrl };

  try {
    await updatePost(id, dadosAtualizados);
    if (novaImagem) fs.renameSync(novaImagem.path, `uploads/${id}.png`);
    res.status(200).json({ mensagem: "Post atualizado com sucesso!" });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Erro ao atualizar post" });
  }
};

// DELETE → Deletar post e imagem associada
export const controllerDeletePost = async (req, res) => {
  const id = req.params.id;

  try {
    await deletePost(id);

    const caminhoImagem = `uploads/${id}.png`;
    if (fs.existsSync(caminhoImagem)) fs.unlinkSync(caminhoImagem);

    res.status(200).json({ mensagem: "Post deletado com sucesso!" });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Erro ao deletar post" });
  }
};
