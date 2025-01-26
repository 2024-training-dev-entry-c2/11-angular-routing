export interface IMenu {
    id?: number;
    nombre: string;
    platos?: IPlato[];
  }

export interface IPlato {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    tipo: string;
    idMenu: number;
}