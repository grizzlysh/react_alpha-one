export interface ddlOptions {
    value: string | number | boolean,
    label: string,
}

export const statusOptions: ddlOptions[] = [
    {value: true, label: 'Active'},
    {value: false, label: 'Inactive'},
]

export const sexOptions: ddlOptions[] = [
    {value: 'm', label: 'Laki-laki'},
    {value: 'f', label: 'Perempuan'},
]