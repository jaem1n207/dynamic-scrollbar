'use strict';

/**
 * Get the current file layer.
 *
 * @example
 * ```js
 * getCurrentFileLayer('src/shared/ui/button.tsx');
 * // => 'shared'
 *
 * getCurrentFileLayer('src/entities/theme/model/use-dark.ts');
 * // => 'entities'
 * ```
 */
function getCurrentFileLayer(currentFilePath) {
  const normalizedPath = currentFilePath.replace(/\\/g, '/');
  const projectPath = normalizedPath?.split('src')[1];
  const segments = projectPath?.split('/');

  return segments?.[1];
}

exports.create = function create(context) {
  const { alias = '' } = context.options[0] ?? {};

  const layers = {
    background: ['background', 'widgets', 'features', 'entities', 'shared'],
    contentScripts: ['contentScripts', 'widgets', 'features', 'entities', 'shared'],
    options: ['options', 'widgets', 'features', 'entities', 'shared'],
    widgets: ['features', 'entities', 'shared'],
    features: ['entities', 'shared'],
    entities: ['entities', 'shared'],
    shared: ['shared'],
  };

  const availableLayers = Object.keys(layers);

  const getImportLayer = (value) => {
    const importPath = alias ? value.replace(new RegExp(`^${alias}/`), '') : value;
    const segments = importPath.split('/');

    return segments.find((segment) => availableLayers.includes(segment));
  };

  /**
   * @example
   * // src/shared/ui/button.tsx
   * import a from '../lib/env';
   * import a1 from '~/shared/lib/env';
   * import b from './label';
   * import b1 from '~/shared/ui/label';
   * import z from '../../entities/...'; // trigger error!
   * import z1 from '~/entities/...'; // trigger error!
   */
  return {
    ImportDeclaration(node) {
      const { value } = node.source;
      const currentFileLayer = getCurrentFileLayer(context.getFilename());
      const importLayer = getImportLayer(value);

      if (!importLayer) {
        return;
      }

      const isAllowed = layers[currentFileLayer].includes(importLayer);

      if (!isAllowed) {
        context.report({
          node,
          message: `Importing from "${importLayer}" is not allowed in the current layer "${currentFileLayer}".`,
        });
      }
    },
  };
};
