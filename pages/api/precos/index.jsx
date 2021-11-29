// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { method } = req;

    const { codigo, valor, descricao } = req.body;

    switch (method) {
      case "GET":
        const data = await db
          .collection("preco")
          .find()
          .sort({ codigo: -1 })
          .toArray();

        res.status(200).json(data);

        break;

      case "POST":
        const preco = await db.collection("preco").updateOne([
          {
            $set: {
              codigo: codigo,
              preco: valor,
              descricao: descricao,
              data: new Date(),
            },
          },
        ]);

        res.status(200).json(preco);

        break;

      case "DELETE":
        const del = req.body;

        const precodel = await db
          .collection("preco")
          .deleteOne({ _id: ObjectId(del) });

        res.status(200).json(precodel);

        break;

      default:
        res.setHeader("Allow", ["POST", "GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
