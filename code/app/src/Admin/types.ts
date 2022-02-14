


export type TItem = {
  _id?: string
  [key: string]: unknown
}

export type TTableSection = {
  name: string,
  field: string,
  canSort: boolean
}

export type TEditSection = {
  name: string,
  field: string
}

export type TCardSection = {
  name: string,
  field: string
}
