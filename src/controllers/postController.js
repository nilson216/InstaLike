import {getPosts, createPost, updateImgUrl} from "../models/postModel.js";
import { ObjectId } from "mongodb";
import fs from "fs";

export const controllerGetPosts = async (req, res) => {
  const posts = await getPosts();
  res.status(200).json(posts);
}

export const controllerPostPost = async (req, res) =>{
  const postReq = req.body;
  try {
    const postCriado = await createPost(postReq);
    res.status(200).json(postCriado);
  }catch (erro){
    console.log(erro.message);
    res.status(500).json({"erro":"Falha na requisição..."});
  }
}

export const controllerUploadImage = async (req, res) => {
 const _id = new ObjectId();
 const imgUrl = `http://localhost:3000/${_id}.png`;
 const descricao = req.body.descricao; //
 const post = {
  "_id":_id,
  "descricao": descricao, 
  "imgUrl":imgUrl
 };
 try {
    const postCriado = await createPost(post);
    const enderecoImg = `uploads/${_id}.png`;
    fs.renameSync(req.file.path, enderecoImg);
    res.status(200).json(postCriado);
  }catch (erro){
    console.log(erro.message);
    res.status(500).json({"erro":"Falha na requisição..."});
  }
}

export const controllerUpdatePost = async (req, res) => {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`; 
    const descricao = req.body.descricao;
    //criar um post com os dados atualizados e enviá-lo ao banco
    const post = {
        descricao: descricao,
        imgUrl: imgUrl
    };
    try {
        const postCriado = await updatePost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}