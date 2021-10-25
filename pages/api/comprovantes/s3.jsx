import { connectToDatabase } from "../../../utils/mongodb";
import nc from "next-connect";
import upload from "../../../utils/upload";
import { ObjectId } from "mongodb";

const handler = nc()
  .use(upload.single("file"))
  .post(async (req, res) => {
    const { conta, valor, descricao, fornecedor, tipo, id } = req.body;

    const { db } = await connectToDatabase();

    const despesa = await db.collection("despesas").updateOne(
      { _id: ObjectId(id) },
      [
        {
          $set: {
            conta: conta,
            valor: +valor,
            descricao: descricao,
            fornecedor: fornecedor,
            tipo: tipo,
            data: new Date(),
            comprovante: req.file.location,
          },
        },
      ],

      { upsert: true }
    );

    res.status(200).json(despesa);
  })

  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
