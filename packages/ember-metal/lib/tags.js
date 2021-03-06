import { CONSTANT_TAG, DirtyableTag } from '@glimmer/reference';
import { meta as metaFor } from './meta';
import require from 'require';

let hasViews = () => false;

export function setHasViews(fn) {
  hasViews = fn;
}

function makeTag() {
  return DirtyableTag.create();
}

export function tagForProperty(object, propertyKey, _meta) {
  if (typeof object !== 'object' || object === null) { return CONSTANT_TAG; }

  let meta = _meta === undefined ? metaFor(object) : _meta;
  if (meta.isProxy()) {
    return tagFor(object, meta);
  }

  let tags = meta.writableTags();
  let tag = tags[propertyKey];
  if (tag) { return tag; }

  return tags[propertyKey] = makeTag();
}

export function tagFor(object, _meta) {
  if (typeof object === 'object' && object !== null) {
    let meta = _meta === undefined ? metaFor(object) : _meta;
    return meta.writableTag(makeTag);
  } else {
    return CONSTANT_TAG;
  }
}

export function markObjectAsDirty(meta, propertyKey) {
  let objectTag = meta.readableTag();

  if (objectTag !== undefined) {
    if (meta.isProxy()) {
      objectTag.inner.first.inner.dirty();
    } else {
      objectTag.inner.dirty();
    }
  }

  let tags = meta.readableTags();
  let propertyTag = tags !== undefined ? tags[propertyKey] : undefined;

  if (propertyTag !== undefined) {
    propertyTag.inner.dirty();
  }

  if (objectTag !== undefined || propertyTag !== undefined) {
    ensureRunloop();
  }
}

let backburner;
function ensureRunloop() {
  if (backburner === undefined) {
    // TODO why does this need to be lazy
    backburner = require('ember-metal').run.backburner;
  }

  if (hasViews()) {
    backburner.ensureInstance();
  }
}
