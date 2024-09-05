import { getOficioUsuExternos } from "@/app/infrastructure/data-access/oficiousuexterno/get-oficio-usu-externo.data-access";
import { OficioUsuExterno } from "@/app/domain/entities";

export default async function PruebasPage() {
    const oficiosExternos = await getOficioUsuExternos();

    return (
        <div>
            <h1>Lista de Oficios Externos</h1>
            <div>
                {oficiosExternos.length > 0 ? (
                    oficiosExternos.map((oficioExterno) => (
                        <div key={oficioExterno.idExterno}>
                            <h2>{oficioExterno.nombre}</h2>
                            <p>Empresa: {oficioExterno.empresa}</p>
                            <p>Cargo: {oficioExterno.cargo}</p>
                            <p>Fecha Captura: {new Date(oficioExterno.fechaCaptura).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron datos</p>
                )}
            </div>
        </div>
    );
}
