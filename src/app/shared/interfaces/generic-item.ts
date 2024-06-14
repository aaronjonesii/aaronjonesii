export interface GenericItem {
  id: string,
  name: string,
  description?: string,
  routerLink?: string | string[],
  href?: string,
  tooltip?: string,
  icon: string,
  isSvgIcon?: boolean,
  disabled?: boolean,
  children?: GenericItem[],
}
