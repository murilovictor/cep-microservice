import { Request, Response } from "express";
import { Logradouro } from "../schemas/Logradouro";

class CepController {
  public async findByCep(req: Request, res: Response) {
    await Logradouro.findOne({ cep: req.params.cep })
      .select("-id")
      .populate(
        "bairro",
        "bairro bairro_sem_acento latitude longitude -id_bairro -_id"
      )
      .populate(
        "cidade",
        "cidade cidade_sem_acento latitude longitude -id_cidade -_id"
      )
      .then((logradouro) => {
        if (logradouro) {
          logradouro.bairro_id = undefined;
          logradouro.cidade_id = undefined;
          return res.json(logradouro);
        }

        return res.status(400).json({ error: "Cep não localizado." });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json({ error: "Houve um problema ao buscar seu CEP." });
      });
  }
}

export default new CepController();
