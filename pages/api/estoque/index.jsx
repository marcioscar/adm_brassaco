// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
//import { async } from "../../produtos/[prod]";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { method } = req;

    switch (method) {
      case "GET":
        const data = await db
          .collection("estoque")
          .find()
          .limit(100)
          .sort({ data: -1 })
          .toArray();

        res.status(200).json(data);

        break;

      case "POST":
        const compra = await db.collection("compras").updateOne(
          { _id: ObjectId(id) },
          [
            {
              $set: {
                valor: valor,
                fornecedor: fornecedor,
                nf: nf,
                data: new Date(data_compra),
              },
            },
          ],

          { upsert: true }
        );

        res.status(200).json(compra);

        //res.redirect([200], "/");
        // res.redirect();

        break;

      case "DELETE":
        const del = req.body;
        console.log(del);
        const compradel = await db
          .collection("compras")
          .deleteOne({ _id: ObjectId(del) });

        res.status(200).json(compradel);

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
