import conectarAoBanco from '../config/dbConfig.js';
import { ObjectId } from "mongodb";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export const getPosts = async () => {
  const db = conexao.db("instavale");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

export const createPost = async (novoPost) => {
  const db = conexao.db("instavale");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}

export const updateImgUrl = async (id, imgUrl) => {
    const db = conexao.db("instavale");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: objectId}, {$set: { imgUrl: imgUrl }});
}