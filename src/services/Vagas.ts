import { Vaga } from '../models/IVagas';
import { api } from './api';

const VAGAS_URI = '/vagas'

export function getVagas() {
    return api.get(VAGAS_URI);
}

export function deletarVaga(id: number) {
    return api.delete(VAGAS_URI + "/" + id).then(res => console.log(res)).catch(error => console.log(error));

}