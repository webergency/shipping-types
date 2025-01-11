import type { Currency, Value, Required, Optional, ConsigneeCompany, ConsigneePerson } from './internal'

export { Currency }

export type ShipmentConsignorDTO = {}
export type ShipmentConsigneeDTO = ConsigneeCompany | ConsigneePerson

export type ShipmentPackageStatus = 'pending' | 'accepted' | 'transporting' | 'delivering' | 'delivered' | 'returning' | 'returned' | 'canceled'
export type ShipmentStatus = 'pending' | 'completed' | 'canceled'

export type ShipmentItemDTO =
{
    id          : string
    name        : string
    quantity    : number
    url?        : string
    image?      : string
    width?      : number
    height?     : number
    depth?      : number
    weight?     : number
}

export type ShipmentPackageDTO =
{
    id          : string
    events      : Required<'created' | 'updated' | 'synced', Date> & Optional<'accepted' | 'delivering' | 'delivered' | 'returning' | 'returned' | 'canceled', Date>
    status      : ShipmentPackageStatus    
    reverse     : boolean
    width       : number
    height      : number
    depth       : number
    weight      : number
    value       : Value
    items       : ShipmentItemDTO[]
    cost?       : Optional<'shipping' | 'cod', Value>
    data?       : object
}

export type ShipmentPackageCreateDTO = Omit<ShipmentPackageDTO, 'id' | 'events' | 'status' | 'cost'>

export type ShipmentDTO =
{
    id          : string
    events      : Required<'created' | 'updated' | 'synced', Date> & Optional<'completed' | 'canceled', Date>
    status      : ShipmentStatus,
    consignor   : ShipmentConsignorDTO
    consignee   : ShipmentConsigneeDTO
    reference   : string
    cod         : Value | false
    packages    : ShipmentPackageDTO[]
    cost?       : Optional<'shipping' | 'cod', Value>
    data?       : object
} 

export type ShipmentCreateDTO = Omit<ShipmentDTO, 'id' | 'events' | 'status' | 'cost'> & 
{
    consignor   : string
    packages    : ShipmentPackageCreateDTO[]
}

export type ShippingRateCard = 
{
    currency    : Currency,
    rates       : Array<
    {
        countries: string[],
        constraints: 
        {
            weight      : number,
            size        : [ number, number, number ],
            volume?     : number
            baseHeight  : number
        },
        cost        : number
    }>
}