import {controllerGetPosts, controllerPostPost, 
    controllerUploadImage, controllerUpdatePost} from "../controllers/postController.js";
import multer from "multer"; // oque é multer? É um middleware para lidar com uploads de arquivos em formulários HTML Ele salva a imagem enviada em uploads/.

// somente para Windos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
  }
});

const upload = multer({dest: './uploads', storage});

const getPostRoutes = (app) => {
    app.get("/posts", controllerGetPosts);
    app.post("/post", controllerPostPost);
    app.post("/upload", upload.single('image'), controllerUploadImage);
    //app.put("/upload/:id", controllerUpdatePost);// atualiza post com imagem

}

export default getPostRoutes;