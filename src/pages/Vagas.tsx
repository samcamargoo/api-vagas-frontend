import { useEffect, useState } from "react"
import { Vaga } from "../models/IVagas";
import { getVagas } from "../services/Vagas"


export  function VagasPage() {

    const [vagas, setVagas] = useState<any>([]);

    useEffect(() => {
        listVagas()
    },[])
    
    function listVagas() {
        getVagas().then(res => setVagas(res.data)).catch()
    }
    
    
    console.log(vagas);
 
    return (
        <div>
           {vagas.map((vaga: any) => {
            const list = (
                <>
                <ul>
                    <li>{vaga.titulo}</li>
                    <li>{vaga.descricao}</li>
                </ul>
                </>
            );
            return list
           })}
        </div>
    )
}
