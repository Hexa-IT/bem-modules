# bem-modules

`bem-modules` is a lightweight JavaScript library that provides a simple and efficient way to integrate BEM (Block Element Modifier) naming conventions with CSS Modules. This library allows you to write modular, scalable and reusable CSS code for your web applications.

## Installation

You can install bem-modules using npm, yarn or pnpm:

```sh
npm install @hexa-it/bem-modules
```

```sh
yarn add @hexa-it/bem-modules
```

```sh
pnpm add @hexa-it/bem-modules
```

## Usage

To use `bem-modules` in your project, first import it into your JavaScript or TypeScript file:

```js
import bem from "@hexa-it/bem-modules";
```

Then, assuming you have support for CSS Modules, create a stylesheet:

```css
/* button.css */

.button {
  background-color: black;
  color: white;
}

.button--active {
  background-color: white;
  color: black;
}

.button__icon {
  width: 16px;
  height: 16px;
}

.button__icon--big {
  width: 32px;
  height: 32px;
}
```

In this example, `button`, `button--transparent` and `button__title` are BEM blocks, modifiers and elements, respectively.

Next, import your stylesheet

```js
import styles from "./button.css";
```

And call the bem function with the styles object to generate a set of functions that you can use to create BEM class names

```js
const { button } = bem(styles);
```

The button function can be used to generate class names for the button block:

```js
const buttonClass = button(); // "button_zjdl25"
```

You can also use the button function to generate class names for elements and modifiers:

```js
const buttonModifierClass = button({ transparent: true }); // "button_zjdl25 button--transparent_9o0dv6"
const buttonIconClass = button("icon"); // "button__icon_zhji5n"
const buttonIconModifierClass = button("icon", { big: true }); // "button__icon_zhji5n button__icon--big_lpxm57"
```

### SASS

Usage with SASS, this will help keeping your stylesheets clean and concise

```scss
/* button.scss */

.button {
  background-color: black;
  color: white;

  &--active {
    background-color: white;
    color: black;
  }

  &__icon {
    width: 16px;
    height: 16px;

    &--big {
      width: 32px;
      height: 32px;
    }
  }
}
```

### React component (Next.js)

```tsx
// Button.tsx

import bem from "@hexa-it/bem-modules";
import styles from "./Button.module.scss";

const cn = bem(styles);

interface ButtonProps {
  icon: ReactNode;
  children: ReactNode;
  active?: boolean;
  bigIcon?: boolean;
}

export default function Button({
  icon,
  children,
  active,
  bigIcon,
}: ButtonProps) {
  return (
    <button className={cn.text({ color: "red" })}>
      <span className={cn.button("icon", { big: bigIcon })}>{icon}</span>
      <p>{children}</p>
    </button>
  );
}
```

### React layout (Next.js)

```tsx
// page.tsx

import bem from "@hexa-it/bem-modules";
import styles from "./Home.module.scss";

const cn = bem(styles);

export default function Home({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={cn.header()}>
        <nav className={cn.header("nav")}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main className={cn.main()}>{children}</main>
      <footer className={cn.footer()}>
        <p className={cn.footer("copyright")}>
          © Pink Floyd FTW - All rights reserved
        </p>
      </footer>
    </>
  );
}
```

```scss
/* Home.module.scss */

.header {
  height: 64px;
  background-color: black;

  &__nav {
    padding: 16px;
    background-color: white;
  }
}

.main {
  padding: 32px;
}

.footer {
  height: 48px;
  background-color: black;

  &__copyright {
    color: white;
    font-weight: bold;
  }
}
```

### Svelte

```jsx
<script>
	import bem from "@hexa-it/bem-modules"
	import styles from "./styles.module.scss";

	const cn = bem(styles);
</script>

<p class={cn.text({ color: "red" })}>My red text</p>
<p class={cn.text({ color: "blue" })}>My blue text</p>
```

## API

`bem(styles: Styles): Record<string, ElementFunction>`

The `bem` function takes a `styles` object as its parameter and returns an object that contains a set of functions.

### Parameters

- `styles` (required): A Styles object that defines the CSS modules for the BEM blocks, elements and modifiers.

### Return value

An object that contains a set of functions. Each function can be used to generate BEM class names for the blocks, elements and modifiers defined in the `styles` object.

The returned object is an object that contains the names of BEM blocks as its keys, and functions that can be used to generate BEM class names (`ElementFunction`) as its values.

### ElementFunction

Each function takes two optional parameters:

- `elementOrModifiers`: A string or an object that represents the BEM element or a set of modifiers for the block.
- `modifiers`: An object that represents a set of modifiers for the element. If it is not provided, the function uses the modifiers from `elementOrModifiers`.

### Return value

The function returns a string that represents the BEM class name for the specified block, element or modifier.

### Throws

If the name of a BEM block is not found in the styles object, the function throws an undefined error.
