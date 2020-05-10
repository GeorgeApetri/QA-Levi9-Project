export function createRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function createQACustom(selector) {
  return `[qa-custom="${selector}"]`;
}

export function chooseRandomFromDropdown(selector) {
  // get the dropdown element
  const select = document.getElementsByClassName(selector);

  // fetch all options within the dropdown
  const options = select.children;

  // generate a random number between 0 and the total amount of options
  // the number will always be an index within the bounds of the array (options)
  const random = Math.floor(Math.random() * options.length);

  // set the value of the dropdown to a random option
  select.value = options[random].value;
  return select;
}
