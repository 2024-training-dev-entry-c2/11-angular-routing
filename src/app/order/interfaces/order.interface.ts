export interface IOrder {
    id?: number,
    detalles: IDetails[],
    total?: number,
    estado?: string,
    fechaPedido?: string,
    idCliente: number
}

export interface IDetails{
    cantidad: number,
    precio?: number,
    idPlato: number,
    nombrePlato?: string
}