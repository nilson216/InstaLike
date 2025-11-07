import { 
  controllerGetPosts, 
  controllerPostPost, 
  controllerDeletePost, 
  controllerUploadImage, 
  controllerUpdatePost 
} from "../controllers/postController.js";

import multer from "multer"; 

// Configuração de upload com multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ dest: './uploads', storage });

// Definição das rotas
const getPostRoutes = (app) => {
  app.get("/posts", controllerGetPosts);
  app.post("/post", controllerPostPost);
  app.post("/upload", upload.single('image'), controllerUploadImage);
  app.put("/post/:id", upload.single("image"), controllerUpdatePost);
  app.delete("/post/:id", controllerDeletePost);
};

export default getPostRoutes;
