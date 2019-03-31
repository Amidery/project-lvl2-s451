import renderPretty from './renderers/prettyformat';
import renderPlain from './renderers/plainformat';

const outputFormats = {
  pretty: renderPretty,
  plain: renderPlain,
};

const render = (diffContent, format) => outputFormats[format](diffContent);

export default render;
