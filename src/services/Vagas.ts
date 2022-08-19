import { Vaga } from '../models/IVagas';
import { api } from './api';

const VAGAS_URI = '/vagas'

export function getVagas() {
    return api.get(VAGAS_URI);
}