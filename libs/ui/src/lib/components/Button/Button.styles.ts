// Base button styles
export const BASE_BUTTON_STYLES = `
  inline-flex items-center justify-center
  px-4 py-2
  text-sm font-medium rounded-lg
  focus:outline-none focus:ring-2 focus:ring-offset-2
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

// Variant styles
export const PRIMARY_BUTTON = `
  bg-blue-600 text-white
  hover:bg-blue-700
  focus:ring-blue-500
`;

export const SECONDARY_BUTTON = `
  bg-white text-gray-700 border border-gray-300
  hover:bg-gray-50
  focus:ring-blue-500
`;

export const DANGER_BUTTON = `
  bg-red-600 text-white
  hover:bg-red-700
  focus:ring-red-500
`;

export const SUCCESS_BUTTON = `
  bg-green-600 text-white
  hover:bg-green-700
  focus:ring-green-500
`;

export const OUTLINE_BUTTON = `
  bg-transparent border border-blue-600 text-blue-600
  hover:bg-blue-50
  focus:ring-blue-500
`;

// Size variants
export const SMALL_BUTTON = `
  px-3 py-1.5 text-xs
`;

export const LARGE_BUTTON = `
  px-6 py-3 text-base
`;

// Icon styles
export const BUTTON_ICON_LEFT = `
  mr-2 -ml-1
`;

export const BUTTON_ICON_RIGHT = `
  ml-2 -mr-1
`;

// Loading state
export const BUTTON_LOADING = `
  flex items-center justify-center
  cursor-wait
`;

// Button group styles
export const BUTTON_GROUP_CONTAINER = `
  inline-flex rounded-md shadow-sm
`;

export const BUTTON_GROUP_ITEM = `
  relative inline-flex items-center px-4 py-2
  border border-gray-300 bg-white text-sm font-medium text-gray-700
  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500
`;

export const BUTTON_GROUP_FIRST_ITEM = `
  rounded-l-md
`;

export const BUTTON_GROUP_MIDDLE_ITEM = `
  -ml-px
`;

export const BUTTON_GROUP_LAST_ITEM = `
  -ml-px rounded-r-md
`;
