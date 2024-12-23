# react-icons-tailwindcss

A [Tailwind CSS](https://tailwindcss.com) plugin for [react-icons](https://github.com/react-icons/react-icons). Generate dynamic class names for icons from popular React icon libraries.

## Installation

Install the plugin via npm or yarn:

 ```bash
 npm install --save-dev react-icons-tailwindcss-plugin
 ```

Add the plugin to your Tailwind CSS configuration:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { reactIconsTailwindcssPlugin } from 'react-icons-tailwindcss';

export default {
  // ... rest of config
  plugins: [
    reactIconsTailwindcssPlugin({
      // Select icon sets to generate CSS classes from. Option "all" generates CSS classes for all icon sets. Default is '[]'
      sets: ['fa', 'si', 'lia'],
      // Select individual icons to include. Default is '[]'
      include: ['LuSwords'],
    }),
  ],
} satisfies Config;
```

Or if you're using Tailwind CSS 4+:
```css
/* app.css */
@import 'tailwindcss';
@plugin 'react-icons-tailwindcss' {
  sets: fa, si, lia;
  include: LuSwords;
}
```

## Usage

Select icon sets you would like to generate CSS classes for and add them to `sets` array in plugin configuration. You can use the value `'all'` to include all icon sets.

You may also include individual icons by adding their import name to `include` array.

Include an icon in your HTML by adding the appropriate class name:
```html
<span class="icon-[fa-home]" />
<span class="icon-[ai-fill-heart]" />
```

## Configuration

You may change the prefix used for the generated icon classes by changing the `prefix` value.

```typescript
// tailwind.config.ts
reactIconsTailwindcssPlugin({
  prefix: 'custom-icon',
});
```

Or if you're using Tailwind CSS 4+:

```css
/* app.css */
@import 'tailwindcss';
@plugin 'react-icons-tailwindcss' {
  prefix: custom-icon;
}
```

Generated class name for `AiFillHeart`:
```html
<span class="custom-icon-[ai-fill-heart]"></span>
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

