export interface GenericItem {
  name: string,
  description?: string,
  routerLink?: string | string[],
  tooltip?: string,
  icon?: string,
  disabled?: boolean,
  children?: GenericItem[]
}
