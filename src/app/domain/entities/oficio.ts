export interface Oficios {
    ejercicio:         number;
    folio:             number;
    eor:               number;
    tipo:              number;
    noOficio:          string;
    pdfpath:           null | string;
    fecha:             Date;
    fechaCaptura:      Date;
    fechaAcuse:        Date;
    fechaLimite:       null | Date;
    remDepen:          string;
    remSiglas:         string;
    remNombre:         string;
    remCargo:          string;
    destDepen:         string;
    destSiglas:        string;
    destNombre:        string;
    destCargo:         string;
    tema:              string;
    estatus:           number;
    empqentrega:       number;
    relacionoficio:    null | string;
    depto:             number;
    deptoRespon:       number;
    idEmpleado:        number;
    nombreResponsable: string;
    rol:               number;
}
