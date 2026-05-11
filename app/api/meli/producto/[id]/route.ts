import { NextResponse } from "next/server";
import { getProducto } from "@/lib/meli";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const producto = await getProducto(params.id);
  return NextResponse.json({ producto });
}
