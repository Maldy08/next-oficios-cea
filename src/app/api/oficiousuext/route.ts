import type { OficioUsuExterno } from "@/app/domain/entities";
import { NextResponse } from "next/server";


export async function GET(request: Request) {

    const oficiousuext : OficioUsuExterno[] = [
        {
            "idExterno": 64,
            "empresa": "COMISION NACIONAL DEL AGUA",
            "siglas": "CONAGUA",
            "nombre": "ING. MIGUEL  ANGEL RODRIGUEZ TODD",
            "cargo": "DIRECTOR GENERAL",
            "fechaCaptura": new Date("2022-03-17T00:00:00"),
            "activo": true
          },

          {
            "idExterno": 65,
            "empresa": "SECRETARIA DE HONESTIDAD Y FUNCION PUBLICA",
            "siglas": "SHFP",
            "nombre": "ROSINA DEL VILLAR CASAS",
            "cargo": "SECREATARIA",
            "fechaCaptura": new Date("2022-03-17T00:00:00"),
            "activo": true
          },

          {
            "idExterno": 66,
            "empresa": "OFICIALIA MAYOR",
            "siglas": "OM",
            "nombre": "BIOLOGA ROSIO LOPEZ GOROSABE",
            "cargo": "OFICIAL MAYOR",
            "fechaCaptura": new Date("2022-03-17T00:00:00"),
            "activo": true
          },
          {
            "idExterno": 67,
            "empresa": "COMISION ESTATAL DEL AGUA DE BC",
            "siglas": "CEABC",
            "nombre": "JUAN PABLO SALCIDO QUIROZ",
            "cargo": "ANALISTA DE LICITACIONES",
            "fechaCaptura": new Date("2022-03-17T00:00:00"),
            "activo": true
          },
          {
            "idExterno": 68,
            "empresa": "SECRETARIA DE HACIENDA",
            "siglas": "SH",
            "nombre": "MTRO. MARCO ANTONIO MORENO MEXIA",
            "cargo": "SECRETARIO",
            "fechaCaptura": new Date("2022-03-17T00:00:00"),
            "activo": true
          },
          {
            "idExterno": 69,
            "empresa": "SINDICATO DE BUROCRATAS",
            "siglas": "S.U.T.S.P.I.D.B.C.",
            "nombre": "LIC. MANUEL GUERRERO LUNA",
            "cargo": "SECRETARIO GENERAL",
            "fechaCaptura": new Date("2022-03-17T00:00:00"),
            "activo": true
          },
    ]

    return NextResponse.json({

        data: oficiousuext,
    });
}