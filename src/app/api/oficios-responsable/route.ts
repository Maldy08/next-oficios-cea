import { NextResponse } from "next/server";

const urlApi = "http://localhost:5178/api/OficioResponsable";

export async function GET(request: Request) {
  return NextResponse.json({
    data: "oficios responsables",
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch(urlApi, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },

    });
    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    return NextResponse.json({
      data: "error",
    });
  }
}
