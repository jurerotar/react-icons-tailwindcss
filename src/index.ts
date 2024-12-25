import { withOptions } from 'tailwindcss/plugin';
import { IconsManifest, type IconType } from 'react-icons';
import { renderToStaticMarkup } from 'react-dom/server';

const transformToCamelCase = (input: string[]): string => {
  return input
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const loadIcons = async (): Promise<Map<string, IconType>> => {
  const icons = new Map<string, IconType>([]);

  const iconSetPromises = IconsManifest.map(async ({ id }) => {
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

  await Promise.all(iconSetPromises);

  return icons;
};

type PluginOptions = {
  prefix?: string;
}

export default withOptions<PluginOptions>(({ prefix = 'icon' } = {}) => {
  const baseDeclarations = {
    width: '1em',
    height: '1em',
    backgroundColor: 'currentColor',
    maskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
  };

  return async ({ addUtilities, matchUtilities }) => {
    const icons = await loadIcons();

    addUtilities({
      [`.${prefix}`]: baseDeclarations,
    });

    matchUtilities({
      [prefix]: (icon) => {
        try {
          const [...iconName] = icon.split('-');
          const camelCasedIconName = transformToCamelCase(iconName);

          const Icon = icons.get(camelCasedIconName);

          if (!Icon) {
            throw new Error(`Icon "${camelCasedIconName}" not found.`);
          }

          return {
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(Icon({})))}")`,
          };
        } catch (error) {
          // biome-ignore lint/suspicious/noConsole: Error handling
          console.error('Error generating utility for icon:', error);
          return {
            maskImage: 'none', // Fallback to avoid broken styles
          };
        }
      },
    });
  };
});
