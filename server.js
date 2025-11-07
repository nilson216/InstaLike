import 'dotenv/config'; // carrega variáveis de ambiente do arquivo .env
import express from "express"; // framework web para Node.js 
import formData from "express-form-data"; // para lidar com formulários (textos + arquivos)
import getPostRoutes from "./src/routes/postRoutes.js"; // importa rotas de post
import cors from "cors"; // Permite conexoes de outros dominios (ex: front-end rodando em localhost:5173)

const corsOptions = {
  origin: '*',  
  methods: ['GET', 'POST',  'PUT', 'DELETE'],
  optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());           // permite receber JSON no corpo da requisição
app.use(formData.format());        // interpreta formulários (textos + arquivos)
app.use(express.static("uploads"));// serve arquivos da pasta uploads (imagens) o que e static significa aqui? Significa que os arquivos estaticos (imagens) podem ser acessados diretamente via URL
app.use(cors(corsOptions));        // aplica CORS

getPostRoutes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});