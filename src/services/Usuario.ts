import { api } from './api';
import axios from "axios";
import { UsuarioCadastro } from '../models/UsuarioCadastro';
import { UsuarioLogin } from "../models/UsuarioLogin";

const CADASTRO_URI = "/usuarios/cadastro"
const LOGIN_URI = "/login"


export function postUsuario(data: UsuarioCadastro) {
    return api.post(CADASTRO_URI, data);
}

export function loginUsuario(data: UsuarioLogin) {
    return api.post(LOGIN_URI, data, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
    });
}

export function setUsuarioLogado(data: UsuarioLogin) {

    let parsedData = JSON.stringify(data);
    localStorage.setItem("usuario", parsedData);
}