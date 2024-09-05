import { getDepartamentos } from "@/app/infrastructure/data-access/departamentos/get-departamentos.data-access";

export const metadata = {
  title: "CEABC - Sistema de Control de Oficios",
  description: "CEABC - Sistema de Control de Oficios",
};

export default async function OficiosPage() {
  //redirect('/oficios');
  // const departamentos = await getDepartamentos();

  //Esto es la prueba el const departamentos y la importacion
  //no existen en esta parte del codigo y menos el return
  return (
    <div>
      <h1>Pruebas</h1>
      {/* {/* <div>
        {departamentos.map((departamento) => (
          <div key={departamento.id}>
            <h2>{departamento.descripcion}</h2>
          </div>
        ))}
      </div>
      // */}
    </div>
  );
}
