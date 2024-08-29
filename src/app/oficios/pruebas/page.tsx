import { GetAllDepartamentosUseCase } from "@/app/application/use-cases/departamentos/get-all-departamentos";
import { DepartamentosRepositoryHttpImplementation } from "@/app/infrastructure/repositories/departamentos-repository-http-implementation";


export default async function PruebasPage() {
    const fetchaGetAllDepartamentosUseCase = new GetAllDepartamentosUseCase(new DepartamentosRepositoryHttpImplementation());
    const departamentos = await fetchaGetAllDepartamentosUseCase.execute();


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

