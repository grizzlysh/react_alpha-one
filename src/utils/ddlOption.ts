export interface DdlOptions {
    value: string | number | boolean,
    label: string,
}

export interface DdlResponse { 
    data: DdlOptions[],
}

export const statusOptions: DdlOptions[] = [
    {value: true, label: 'Active'},
    {value: false, label: 'Inactive'},
]

export const sexOptions: DdlOptions[] = [
    {value: 'm', label: 'Laki-laki'},
    {value: 'f', label: 'Perempuan'},
]

export const invoiceStatusOptions: DdlOptions[] = [
    {value: 'lunas', label: 'Lunas'},
    {value: 'belum lunas', label: 'Belum Lunas'},
]
