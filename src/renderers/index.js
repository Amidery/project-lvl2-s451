import renderPretty from './prettyformat';
import renderPlain from './plainformat';
import renderJSON from './jsonformat';

const outputFormats = {
  pretty: renderPretty,
  plain: renderPlain,
  json: renderJSON,
};

const render = (diffContent, format) => outputFormats[format](diffContent);

export default render;
