export const disableAnimation = (disableTransitionExclude: string[] = []) => {
  const css = document.createElement('style');
  css.append(
    document.createTextNode(
      `
*${disableTransitionExclude.map((s) => `:not(${s})`).join('')} {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}
      `,
    ),
  );
  document.head.append(css);

  return () => {
    (() => window.getComputedStyle(document.body))();

    setTimeout(() => {
      css.remove();
    }, 1);
  };
};
