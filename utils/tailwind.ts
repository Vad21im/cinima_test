import type { PluginAPI } from "tailwindcss/types/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SPACING_SCHEME } from "../constants";
import type { TTailwindUtilities } from "~/types";

// Генерируем utils для работы с отступами (читай Readme)

const utilityConfigurations = [
  { property: "margin", prefix: "m" },
  { property: "marginTop", prefix: "mt" },
  { property: "marginRight", prefix: "mr" },
  { property: "marginBottom", prefix: "mb" },
  { property: "marginLeft", prefix: "ml" },
  { property: ["marginLeft", "marginRight"], prefix: "mx" },
  { property: ["marginTop", "marginBottom"], prefix: "my" },
  { property: "padding", prefix: "p" },
  { property: "paddingTop", prefix: "pt" },
  { property: "paddingRight", prefix: "pr" },
  { property: "paddingBottom", prefix: "pb" },
  { property: "paddingLeft", prefix: "pl" },
  { property: ["paddingLeft", "paddingRight"], prefix: "px" },
  { property: ["paddingTop", "paddingBottom"], prefix: "py" },
  { property: "gap", prefix: "gap" },
  { property: "rowGap", prefix: "gap-y" },
  { property: "columnGap", prefix: "gap-x" },
];

const autoUtilities = {
  ".m-auto": { margin: "auto" },
  ".mx-auto": { marginLeft: "auto", marginRight: "auto" },
  ".my-auto": { marginTop: "auto", marginBottom: "auto" },
  ".mt-auto": { marginTop: "auto" },
  ".mr-auto": { marginRight: "auto" },
  ".mb-auto": { marginBottom: "auto" },
  ".ml-auto": { marginLeft: "auto" },
};

const generateUtilities = (
  scheme: Record<string, string>,
  prefix: string,
  property: string,
): TTailwindUtilities => {
  const utilities = Object.entries(scheme).reduce<TTailwindUtilities>(
    (acc, [key, value]) => {
      if (Array.isArray(property)) {
        property.forEach((prop) => {
          acc[`.${prefix}-${key}`] = {
            ...acc[`.${prefix}-${key}`],
            [prop]: value,
          };
        });
      } else {
        acc[`.${prefix}-${key}`] = { [property]: value };
      }

      return acc;
    },
    {},
  );

  return utilities;
};

const generateSpaceUtilities = (
  scheme: Record<string, Record<string, string>>,
  screens: any,
): TTailwindUtilities => {
  const utilities = {} as TTailwindUtilities;

  Object.entries(scheme.default).forEach(([key, value]) => {
    utilities[`.space-x-${key} > * + *`] = { marginLeft: value };
    utilities[`.space-y-${key} > * + *`] = { marginTop: value };
  });

  Object.entries(screens).forEach(([screen, size]) => {
    if (scheme[screen]) {
      const mediaQuery = `@media (min-width: ${size})`;
      utilities[mediaQuery] = utilities[mediaQuery] || {};

      Object.entries(scheme[screen]).forEach(([key, value]) => {
        utilities[mediaQuery][`.space-x-${key} > * + *`] = {
          marginLeft: value,
        };
        utilities[mediaQuery][`.space-y-${key} > * + *`] = { marginTop: value };
      });
    }
  });

  return utilities;
};

export const generateMainUtilities = (
  plugin: PluginAPI,
  property: string,
  prefix: string,
) => {
  const { addUtilities, theme } = plugin;
  const screens = theme("screens");

  if (!screens) {
    return;
  }

  const baseUtilities = generateUtilities(
    SPACING_SCHEME.default,
    prefix,
    property,
  );
  addUtilities(baseUtilities);

  // создаем отрицательные отступы, только для margin
  if (prefix.startsWith("m")) {
    const negativeMarginUtilities = Object.entries(
      SPACING_SCHEME.default,
    ).reduce((acc, [key, value]) => {
      // если в property приходит массив, несколько значений, например
      // ['marginTop', 'marginBottom'], то обрабатываем как массив,
      // если не массив, то просто создаем класс с одним свойством
      // acc = '.-my-base': { marginTop: '-20px', marginBottom: '-20px' },
      if (Array.isArray(property)) {
        property.forEach((prop) => {
          if (parseInt(key) !== 0) {
            acc[`.-${prefix}-${key}`] = {
              ...acc[`.-${prefix}-${key}`],
              [prop]: `-${value}`,
            };
          }
        });
      } else if (parseInt(key) !== 0) {
        acc[`.-${prefix}-${key}`] = { [property]: `-${value}` };
      }
      return acc;
    }, {} as TTailwindUtilities);

    addUtilities(negativeMarginUtilities);
  }

  // создаем отступы с учетом брейкпоинтов
  Object.entries(SPACING_SCHEME).forEach(([screen, scheme]) => {
    if (screen !== "default") {
      const mediaQuery = `@media (min-width: ${screens[screen]})`;
      const utilities = generateUtilities(scheme, prefix, property);
      addUtilities({ [mediaQuery]: utilities });

      if (prefix.startsWith("m")) {
        const negativeMarginUtilities = Object.entries(scheme).reduce(
          (acc, [key, value]) => {
            // если в property приходит массив, несколько значений, например
            // ['marginTop', 'marginBottom'], то обрабатываем как массив,
            // если не массив, то просто создаем класс с одним свойством
            // acc = '.-my-base': { marginTop: '-20px', marginBottom: '-20px' },
            if (Array.isArray(property)) {
              property.forEach((prop) => {
                if (parseInt(key) !== 0) {
                  acc[`.-${prefix}-${key}`] = {
                    ...acc[`.-${prefix}-${key}`],
                    [prop]: `-${value}`,
                  };
                }
              });
            } else if (parseInt(key) !== 0) {
              acc[`.-${prefix}-${key}`] = { [property]: `-${value}` };
            }

            return acc;
          },
          {} as TTailwindUtilities,
        );

        addUtilities({ [mediaQuery]: negativeMarginUtilities });
      }
    }
  });
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default (plugin: PluginAPI) => {
  const { theme } = plugin;
  const screens = theme("screens");

  plugin.addUtilities(autoUtilities);

  const spaceUtilities = generateSpaceUtilities(SPACING_SCHEME, screens);
  plugin.addUtilities(spaceUtilities);

  utilityConfigurations.forEach(({ property, prefix }) => {
    generateMainUtilities(plugin, property as string, prefix);
  });
};
