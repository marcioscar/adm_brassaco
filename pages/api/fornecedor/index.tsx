// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { method } = req;

    const nome = req.body;

    switch (method) {
      case "GET":
        const data = await db
          .collection("fornecedores")
          .find()
          .sort({ nome: 1 })
          .toArray();

        res.status(200).json(data);

        break;

      case "POST":
        const fornecedor = await db.collection("fornecedores").updateOne(
          { nome: nome },
          [
            {
              $set: {
                nome: nome,
              },
            },
          ],

          { upsert: true }
        );

        res.status(200).json(fornecedor);

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
