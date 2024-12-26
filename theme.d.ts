// theme.d.ts

import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    shadow  : Palette['primary'];  // Custom color category (inherits structure of primary)
    radiance: Palette['primary'];  // Custom color category (inherits structure of primary)
  }

  interface PaletteOptions {
    shadow  ?: PaletteOptions['primary'];  // Custom color category (inherits structure of primary)
    radiance?: PaletteOptions['primary'];  // Custom color category (inherits structure of primary)
  }
}
