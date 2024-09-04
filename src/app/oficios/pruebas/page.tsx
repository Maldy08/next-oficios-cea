import { getDepartamentos } from "@/app/infrastructure/data-access/departamentos/get-departamentos.data-access";


export default async function PruebasPage() {

    const departamentos = await getDepartamentos();


    return (
        <div>
            <h1>Pruebas</h1>
            <div>
                {departamentos.map((departamento) => (
                <div key={departamento.id}>
                    <h2>{departamento.descripcion}</h2>
                </div>
                ))}
            </div>
        </div>
      )
}

