type Modifiers = Record<string, boolean | undefined>;
type Styles = { readonly [key: string]: string };

type ElementFunction = (
  elementOrModifiers?: string | Modifiers,
  modifiers?: Modifiers
) => string;

export default function bem(styles: Styles): Record<string, ElementFunction> {
  const formatModifiers = (modifiers: Modifiers, baseSelector: string) => {
    if (!(baseSelector in styles))
      throw new Error(`Missing "${baseSelector}" in styles!`);

    return Object.entries(modifiers)
      .filter(([, active]) => active)
      .reduce(
        (classes, [modifier]) =>
          `${classes} ${styles[`${baseSelector}--${modifier}`]}`,
        styles[baseSelector]
      );
  };

  const bemResult: Record<string, ElementFunction> = {};

  for (const current of Object.keys(styles)) {
    bemResult[current] = (
      elementOrModifiers?: string | Modifiers,
      modifiers?: Modifiers
    ) => {
      if (!elementOrModifiers) return styles[current];

      if (typeof elementOrModifiers === "object")
        return formatModifiers(elementOrModifiers, current);

      return formatModifiers(
        modifiers || {},
        `${current}__${elementOrModifiers}`
      );
    };
  }

  return bemResult;
}
