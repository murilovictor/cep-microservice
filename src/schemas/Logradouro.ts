import mongoose, { Schema } from 'mongoose';

const BairroSchema = new Schema({
  id_bairro: Number,
  bairro: String,
  bairro_sem_acento: String,
  estado: String,
  latitude: String,
  longitude: String,
});

const CidadeSchema = new Schema({
  id_cidade: Number,
  cidade: String,
  cidade_sem_acento: String,
  estado: String,
  latitude: String,
  longitude: String,
});

const LogradouroSchema = new Schema(
  {
    cep: String,
    tipo: String,
    nome_logradouro: String,
    logradouro: String,
    bairro_id: Number,
    cidade_id: Number,
    estado: String,
    tipo_sem_acento: String,
    nome_logradouro_sem_acento: String,
    logradouro_sem_acento: String,
    latitude: String,
    longitude: String,
    cep_ativo: String,
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
      },
    },
  }
);

LogradouroSchema.virtual('bairro', {
  ref: 'Bairro',
  localField: 'bairro_id',
  foreignField: 'id_bairro',
});

LogradouroSchema.virtual('cidade', {
  ref: 'Cidade',
  localField: 'cidade_id',
  foreignField: 'id_cidade',
});

export const Logradouro = mongoose.model('Logradouro', LogradouroSchema);
export const Bairro = mongoose.model('Bairro', BairroSchema);
export const Cidade = mongoose.model('Cidade', CidadeSchema);
