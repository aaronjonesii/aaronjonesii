import { ThemePalette } from "@angular/material/core";

export interface GenericButton {
  text: string,
  routerLink?: string | string[],
  color?: ThemePalette,
  click?: (event: MouseEvent) => void,
  icon?: string,

  disabled?: boolean
}
