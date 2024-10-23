import type { Oficios } from "@/app/domain/entities";
import { NextResponse } from "next/server";

const urlApi = "http://localhost:5178/api/Oficios";




export async function GET(request: Request) {
  const oficios: Oficios[] = [
    {
      ejercicio: 2022,
      folio: 30,
      eor: 1,
      tipo: 1,
      noOficio: "1-16",
      pdfpath: null,
      fecha: new Date("2022-01-11T00:00:00"),
      fechaCaptura: new Date("2022-01-11T00:00:00"),
      fechaAcuse: new Date("2022-01-11T00:00:00"),
      fechaLimite: null,
      remDepen: "SEPROA",
      remSiglas: "SEPROA",
      remNombre: "ING. FRANCISCO A. BERNAL RODRIGUEZ",
      remCargo: "SECRETARIO",
      destDepen: "CESPT",
      destSiglas: "CESPT",
      destNombre: "ING. GONZALO LOPEZ LOPEZ",
      destCargo: "DESCONOCIDO",
      tema: "CALENDARIO SESIONES DE ORGANO DE GOBIERNO PARA EJERCICIO 2022",
      estatus: 4,
      empqentrega: 7204,
      relacionoficio: null,
      depto: 1,
      deptoRespon: 1,
      idEmpleado: 7197,
      nombreResponsable: "FRANCISCO ALBERTO BERNAL RODRIGUEZ",
      rol: 1,
    },
    {
      ejercicio: 2022,
      folio: 31,
      eor: 1,
      tipo: 1,
      noOficio: "1-18",
      pdfpath: null,
      fecha: new Date("2022-01-11T00:00:00"),
      fechaCaptura: new Date("2022-01-11T00:00:00"),
      fechaAcuse: new Date("2022-01-11T00:00:00"),
      fechaLimite: null,
      remDepen: "SEPROA",
      remSiglas: "SEPROA",
      remNombre: "ING. FRANCISCO A. BERNAL RODRIGUEZ",
      remCargo: "SECRETARIO",
      destDepen: "CESPM",
      destSiglas: "CESPM",
      destNombre: "ING. JOSE ARMANDO FERNANDEZ SAMANIEGO ",
      destCargo: "DESCONOCIDO",
      tema: "PETICION RECIBIDA POR VECINOS DE LA COL. EJIDATARIOS.",
      estatus: 4,
      empqentrega: 7194,
      relacionoficio: null,
      depto: 1,
      deptoRespon: 1,
      idEmpleado: 7197,
      nombreResponsable: "FRANCISCO ALBERTO BERNAL RODRIGUEZ",
      rol: 1,
    },
    {
      ejercicio: 2022,
      folio: 32,
      eor: 1,
      tipo: 1,
      noOficio: "8-5",
      pdfpath: null,
      fecha: new Date("2022-01-11T00:00:00"),
      fechaCaptura: new Date("2022-01-11T00:00:00"),
      fechaAcuse: new Date("2022-01-11T00:00:00"),
      fechaLimite: null,
      remDepen: "CEA",
      remSiglas: "CEA",
      remNombre: "ING. FRANCISCO A. BERNAL RODRIGUEZ",
      remCargo: "DIRECTOR GENERAL",
      destDepen: "CONAGUA",
      destSiglas: "CONAGUA",
      destNombre: "ING. JOSE CARLOS ROBLES",
      destCargo: "DESCONOCIDO",
      tema: "REPORTE DE AVANCE FISICO FINANCIERO DEL MES DE DICIEMBRE CORRESP. A LA CEA.",
      estatus: 4,
      empqentrega: 7141,
      relacionoficio: null,
      depto: 1,
      deptoRespon: 1,
      idEmpleado: 7197,
      nombreResponsable: "FRANCISCO ALBERTO BERNAL RODRIGUEZ",
      rol: 1,
    },
    {
      ejercicio: 2022,
      folio: 33,
      eor: 1,
      tipo: 1,
      noOficio: "4-8",
      pdfpath: null,
      fecha: new Date("2022-01-11T00:00:00"),
      fechaCaptura: new Date("2022-01-11T00:00:00"),
      fechaAcuse: new Date("2022-01-11T00:00:00"),
      fechaLimite: null,
      remDepen: "CEA",
      remSiglas: "CEA",
      remNombre: "LIC. CECILIA RAZO VELASQUEZ",
      remCargo: "DIRECTORA JURIDICA",
      destDepen: "DESCONOCIDO",
      destSiglas: "0",
      destNombre: "LIC. ALEJANDRO AGUILERA",
      destCargo: "DESCONOCIDO",
      tema: "SE SOLICITA INFORMACION",
      estatus: 4,
      empqentrega: 7323,
      relacionoficio: null,
      depto: 2,
      deptoRespon: 2,
      idEmpleado: 7323,
      nombreResponsable: "CECILIA RAZO VELASQUEZ",
      rol: 1,
    },
    {
      ejercicio: 2022,
      folio: 34,
      eor: 1,
      tipo: 1,
      noOficio: "1-10",
      pdfpath: null,
      fecha: new Date("2022-01-11T00:00:00"),
      fechaCaptura: new Date("2022-01-11T00:00:00"),
      fechaAcuse: new Date("2022-01-11T00:00:00"),
      fechaLimite: null,
      remDepen: "SEPROA",
      remSiglas: "SEPROA",
      remNombre: "ING. FRANCISCO A. BERNAL RODRIGUEZ",
      remCargo: "SECRETARIO",
      destDepen: "OFICIALIA MAYOR ",
      destSiglas: "OM",
      destNombre: "MTRO. ALEJANDRO ROSALES SOTELO",
      destCargo: "DESCONOCIDO",
      tema: "AUTORIZACION DE APERTURA DE PLAZA D 0468",
      estatus: 4,
      empqentrega: 7133,
      relacionoficio: null,
      depto: 1,
      deptoRespon: 1,
      idEmpleado: 7197,
      nombreResponsable: "FRANCISCO ALBERTO BERNAL RODRIGUEZ",
      rol: 1,
    },
  ];

  return NextResponse.json({
    data: oficios,
  });
}

export async function POST(request: Request) {
  const body = await request.formData();

  //  const contentType = request.headers.get("Content-Type");

  try {
    const response = await fetch(urlApi, {
      method: "POST",
      body: body,
    });
    return NextResponse.json({ message: response });
  } catch (error) {
    return NextResponse.json({ message: "Error en el post del oficio" });
  }

}

export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const response = await fetch(urlApi, {
      method: "PUT",
      body: body,
    });
    return NextResponse.json({ message: response });
  } catch (error) {
    return NextResponse.json({ message: "Error en el put del oficio" });
  }
}
