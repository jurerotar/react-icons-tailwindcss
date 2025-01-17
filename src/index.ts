import { withOptions } from 'tailwindcss/plugin';
import { renderToStaticMarkup } from 'react-dom/server';
import type { IconType } from 'react-icons';
import ci from 'react-icons/ci';
import fa from 'react-icons/fa';
import fa6 from 'react-icons/fa6';
import io from 'react-icons/io';
import io5 from 'react-icons/io5';
import md from 'react-icons/md';
import ti from 'react-icons/ti';
import go from 'react-icons/go';
import fi from 'react-icons/fi';
import lu from 'react-icons/lu';
import gi from 'react-icons/gi';
import wi from 'react-icons/wi';
import di from 'react-icons/di';
import ai from 'react-icons/ai';
import bs from 'react-icons/bs';
import ri from 'react-icons/ri';
import fc from 'react-icons/fc';
import gr from 'react-icons/gr';
import hi from 'react-icons/hi';
import hi2 from 'react-icons/hi2';
import si from 'react-icons/si';
import sl from 'react-icons/sl';
import im from 'react-icons/im';
import bi from 'react-icons/bi';
import cg from 'react-icons/cg';
import vsc from 'react-icons/vsc';
import tb from 'react-icons/tb';
import tfi from 'react-icons/tfi';
import rx from 'react-icons/rx';
import pi from 'react-icons/pi';
import lia from 'react-icons/lia';

const transformToCamelCase = (input: string): string => {
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

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

  const iconsMap = new Map<string, Record<string, IconType>>([
    ['ci', ci],
    ['fa', fa],
    ['fa6', fa6],
    ['io', io],
    ['io5', io5],
    ['md', md],
    ['ti', ti],
    ['go', go],
    ['fi', fi],
    ['lu', lu],
    ['gi', gi],
    ['wi', wi],
    ['di', di],
    ['ai', ai],
    ['bs', bs],
    ['ri', ri],
    ['fc', fc],
    ['gr', gr],
    ['hi', hi],
    ['hi2', hi2],
    ['si', si],
    ['sl', sl],
    ['im', im],
    ['bi', bi],
    ['cg', cg],
    ['vsc', vsc],
    ['tb', tb],
    ['tfi', tfi],
    ['rx', rx],
    ['pi', pi],
    ['lia', lia],
  ]);

  return ({ addUtilities, matchUtilities }) => {
    addUtilities({
      [`.${prefix}`]: baseDeclarations,
    });

    matchUtilities({
      [prefix]: (icon) => {
        try {
          const [iconSet] = icon.split('-');

          const camelCasedIconName = transformToCamelCase(icon);

          const Icon = iconsMap.get(iconSet)![camelCasedIconName];

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
