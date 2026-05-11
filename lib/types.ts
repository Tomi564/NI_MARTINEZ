export interface Producto {
  id: string;
  titulo: string;
  precio: number;
  precioOriginal?: number;
  marca: string;
  medida: string;
  imagen: string;
  imagenes: string[];
  urlMeli: string;
  cuotas?: string;
  badge?: string;
}

export interface ProductoMock {
  id: string;
  marca: string;
  titulo: string;
  medida: string;
  precio: number;
  precioOriginal?: number;
  cuotas?: number;
  badge?: string;
  imagen?: string;
}

export interface FiltrosBusqueda {
  ancho?: string;
  perfil?: string;
  rodado?: string;
  marca?: string;
  tipoVehiculo?: string;
}

export interface Marca {
  id: string;
  nombre: string;
  logo?: string;
  cantidadProductos: number;
}
