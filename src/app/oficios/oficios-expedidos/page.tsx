import { getOficios } from "@/app/infrastructure/data-access/oficios/get-oficios";

export default async function PruebasPage() {
    const oficios = await getOficios();

    return (
        <div>
            <h1>Lista de Oficios</h1>
            <div>
                {oficios.map((oficio) => (
                    <div key={oficio.folio}>
                        <h2>{oficio.noOficio}</h2>
                        <p>Remitente: {oficio.remNombre} - {oficio.remCargo}</p>
                        <p>Destinatario: {oficio.destNombre} - {oficio.destCargo}</p>
                        <p>Tema: {oficio.tema}</p>
                        <p>Fecha: {new Date(oficio.fecha).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
