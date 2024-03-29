
export interface Menu {
  title : string,
  path  : string,
  url   : string,
  state : string[],
  icon ?: React.ReactNode,
  child?: Menu[]
}