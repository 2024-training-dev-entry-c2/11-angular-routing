import { IDish } from "./dish.interface"


export interface IMenu {
  id: number,
  name: string,
  schedule: string,
  dishes: IDish[]
}
