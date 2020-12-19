/**
 *  Returns array sorted by property in given order (1/-1).
 *  @param {Array} array
 *  @param {String} property
 *  @param {Number} order
 *  @return {Array}
 */
function sortByProperty(array, property, order = 1) {
  array.sort((element1, element2) => {
    if (+element1[property] < +element2[property]) return -1 * order;
    if (+element1[property] > +element2[property]) return 1 * order;
    return 0;
  });
  return array;
}
/**
 *
 * @param {Object} obj
 * {elementName: string, className: string, parent: DOMElement, attributes: [name, value]}
 * @returns {Element}
 */
function createDomElement(obj) {
  let element = null;
  const { elementName, className = null, parent = null, attributes = [] } = obj;
  if (!elementName) return null;

  try {
    element = document.createElement(elementName);
  } catch (e) {
    throw new Error('Unable to create element. Wrong element name');
  }

  if (className) {
    element.classList.add(...className.split(' '));
  }

  if (parent) {
    parent.appendChild(element);
  }

  if (attributes.length) {
    const regEx = /value|id|placeholder|rows|autocorrect|spellcheck|src|alt/;
    attributes.forEach(([attrName, attrValue]) => {
      if (!attrValue) {
        element.setAttribute(attrName, '');
      }
      const isMatch = attrName.match(regEx);
      if (isMatch) {
        element.setAttribute(attrName, attrValue);
      } else {
        element.dataset[attrName] = attrValue;
      }
    });
  }
  return element;
}

function numberWithSpaces(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

export { createDomElement, sortByProperty, numberWithSpaces };
