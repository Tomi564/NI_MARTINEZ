import { FiltrosBusqueda, Producto } from "./types";

export async function getProductos(
  filtros?: FiltrosBusqueda,
): Promise<Producto[]> {
  void filtros;
  return [];
}

export async function getProducto(id: string): Promise<Producto | null> {
  void id;
  return null;
}

export async function getProductosByMedida(
  ancho: string,
  perfil: string,
  rodado: string,
): Promise<Producto[]> {
  void ancho;
  void perfil;
  void rodado;
  return [];
}
