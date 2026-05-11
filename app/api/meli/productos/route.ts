import { NextResponse } from "next/server";
import { getProductos } from "@/lib/meli";

export async function GET() {
  const productos = await getProductos();
  return NextResponse.json({ productos });
}
