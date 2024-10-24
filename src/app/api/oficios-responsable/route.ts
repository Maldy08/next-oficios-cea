import { NextResponse } from "next/server";

const urlApi = "http://localhost:5178/api/Oficios";

export async function GET(request: Request) {

    return NextResponse.json({
      data: "oficios responsables",
    });
  }