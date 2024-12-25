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
import reactIconsTailwindcssPlugin from 'react-icons-tailwindcss';

export default {
  // ... rest of config
  plugins: [
    reactIconsTailwindcssPlugin,
  ],
} satisfies Config;
```

Or if you're using Tailwind CSS 4+:
```css
/* app.css */
@import 'tailwindcss';
@plugin 'react-icons-tailwindcss';
```

## Usage

You need to add two classes to your markup, base `icon` class and icon-specifier class with the syntax `icon-[{icon_set}-{icon_name}]`.
Icon-specifier class is expecting a `camel-cased` icon name from `react-icons`.

Example for `AiFillHeart`:

```html
<span class="icon icon-[ai-fill-heart]" />
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

Example for `AiFillHeart`:

```html
<span class="custom-icon custom-icon-[ai-fill-heart]"></span>
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

