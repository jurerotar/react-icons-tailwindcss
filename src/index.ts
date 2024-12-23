import plugin from 'tailwindcss/plugin';
import { IconsManifest, type IconType } from 'react-icons';
import { renderToStaticMarkup } from 'react-dom/server';

const splitOnUppercase = (input: string): string[] => {
  return input.split(/(?=[A-Z])/);
};

const renameIcon = (iconName: string, prefix: string): string => {
  return `${prefix}-\\[${iconName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}\\]`;
};

const loadIcons = async (sets: string[], include: string[]): Promise<Map<string, IconType>> => {
  const icons = new Map<string, IconType>([]);

  const filteredManifest = sets.includes('all') ? IconsManifest : IconsManifest.filter(({ id }) => sets.includes(id));

  const iconSetPromises = filteredManifest.map(async ({ id }) => {
    try {
      const module = (await import(`react-icons/${id}`)).default;

      for (const [iconName, Icon] of Object.entries(module)) {
        icons.set(iconName, Icon as IconType);
      }
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: Error handling
      console.error(`Failed to load icon set "${id}":`, error);
    }
  });

  const iconIncludePromises = include.map(async (iconName) => {
    const [setName] = splitOnUppercase(iconName);
    const setNameLowercase = setName.toLowerCase();

    // Skip if the whole set is already included
    if (sets.includes(setNameLowercase)) {
      return null;
    }

    try {
      const module = (await import(`react-icons/${setNameLowercase}`))[iconName];
      if (module) {
        icons.set(iconName, module);
      } else {
        // biome-ignore lint/suspicious/noConsole: Error handling
        console.warn(`Icon "${iconName}" not found in set "${setNameLowercase}"`);
      }
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: Error handling
      console.error(`Failed to load icon "${iconName}" from set "${setNameLowercase}":`, error);
    }

    return null;
  });

  await Promise.all([...iconSetPromises, ...iconIncludePromises]);

  return icons;
};

type PluginOptions = {
  prefix?: string;
  sets?: string[];
  include?: string[];
};

export const reactIconsTailwindcssPlugin = plugin.withOptions<PluginOptions>(({ prefix = 'icon', sets = [], include = [] } = {}) => {
  return async ({ addUtilities }) => {
    const icons: Map<string, IconType> = await loadIcons(sets, include);

    const baseDeclarations = {
      width: '1em',
      height: '1em',
      backgroundColor: 'currentColor',
      maskSize: '100% 100%',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
    };

    for (const [iconName, Icon] of icons) {
      try {
        const className = renameIcon(iconName, prefix);
        addUtilities({
          [`.${className}`]: {
            ...baseDeclarations,
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(Icon({})))}")`,
          },
        });
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Error handling
        console.error(`Failed to add utility for icon "${iconName}":`, error);
      }
    }
  };
});
