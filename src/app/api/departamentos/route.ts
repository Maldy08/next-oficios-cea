import { Departamentos } from "@/app/domain/entities/departamento";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const departamentos: Departamentos[] = [
        {
            "id": 0,
            "idCea": 1,
            "idShpoa": 101,
            "descripcion": "DIRECCION GENERAL",
            "nivel": 1,
            "oficial": 1,
            "idReporta": 1,
            "agrupaPoa": 101,
            "meta": 1,
            "accion": 1,
            "prog": "007",
            "empRespon": 7378,
            "agrupaDir": 1
        },
        {
            "id": 0,
            "idCea": 2,
            "idShpoa": 124,
            "descripcion": "DIRECCION JURIDICA Y DE NORMATIVIDAD",
            "nivel": 2,
            "oficial": 1,
            "idReporta": 21,
            "agrupaPoa": 124,
            "meta": 1,
            "accion": 4,
            "prog": "007",
            "empRespon": 7347,
            "agrupaDir": 30
          },
          {
            "id": 0,
            "idCea": 5,
            "idShpoa": 0,
            "descripcion": "COORDINACION DE INVERSION PUBLICA",
            "nivel": 3,
            "oficial": 0,
            "idReporta": 32,
            "agrupaPoa": 134,
            "meta": 3,
            "accion": 3,
            "prog": "007",
            "empRespon": 7205,
            "agrupaDir": 31
          },
          {
            "id": 0,
            "idCea": 6,
            "idShpoa": 125,
            "descripcion": "INSTITUTO ESTATAL DEL AGUA",
            "nivel": 2,
            "oficial": 1,
            "idReporta": 1,
            "agrupaPoa": 125,
            "meta": 11,
            "accion": 2,
            "prog": "026",
            "empRespon": 7358,
            "agrupaDir": 1
          },
          {
            "id": 0,
            "idCea": 7,
            "idShpoa": 0,
            "descripcion": "COORDINACION DE INVESTIGACION",
            "nivel": 3,
            "oficial": 0,
            "idReporta": 6,
            "agrupaPoa": 125,
            "meta": 12,
            "accion": 1,
            "prog": "026",
            "empRespon": 7351,
            "agrupaDir": 1
          },
    ];

    return NextResponse.json({
        data : departamentos
    });
}