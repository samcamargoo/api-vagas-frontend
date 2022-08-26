import { Vaga } from '../models/IVagas';
import { api } from './api';

const VAGAS_URI = '/vagas'

export function getVagas() {
    return api.get(VAGAS_URI);
}
export function cadastrarVaga(vaga: Vaga) {
    return api.post(VAGAS_URI, vaga);
}
export function editarVaga(id: number, vaga: Vaga) {
    return api.put<Vaga>(VAGAS_URI + "/" + id, vaga);
}
export function deletarVaga(id: number) {
    return api.delete(VAGAS_URI + "/" + id).then(res => console.log(res)).catch(error => console.log(error));

}