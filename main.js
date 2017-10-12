function union(a, b) {
  return new Set([...a, ...b]);
}

document.getElementById('button').addEventListener("click", function (event) {
  let code = new Set(document.getElementById('code').value.split(' '));
  if (code.has("")) {
    code.delete("");
  }
  let alphabet = getAlphabet(code);
  let m = alphabet.size;
  let n = code.size;
  let alphabet_string = "A=\\{";
  i=0;
  for (let letter of alphabet) {
    if (i < m-1) {
      alphabet_string += letter + ","
    }
    else {
      alphabet_string += letter + '\\}'
    }
    i++;
  }
  katex.default.render(alphabet_string, document.getElementById("alphabet"));
  let code_string = "C=\\{";
  i = 0;
  for (let word of code) {
    if (i < n-1) {
      code_string += word + ","
    }
    else {
      code_string += word + '\\}'
    }
    i++;
  }
  katex.default.render(code_string, document.getElementById("lcode"));
  console.log(code);
  console.log(pref(code, code));
});

function isUniquelyDecodable(code)
{
  return SPaux(1, code, code)
}

function pref(l1, l2) {
  l = new Set([]);
  for (let w1 in l1) {
    for (let w2 in l2) {
      if (w2.length >= w1.length) {
        if (w2.substr(0, w1.length) == w1) {
          if (w1.length == w2.length) {
            let w = "";
          }
          else {
            let w = w2.substr(w1.length, w2.length-w1.length);
          }
          if (!l.has(w)) {
            l.add(w);
          }
        }
      }
    }
  }
  return l;
}

function SPaux(round, prev, code) {
  if (round == 1) {
    next = pref(prev, prev);
    console.log(next);
  }
  else {
    next = union(pref(code, prev), pref(prev, code));
  }

  if (contain_an_element_of(code, next)) {
    alert(round + "decodable");
    return true
  }
  else if (next.has("")){
    alert(round + "ambigu");
    return false;
  }
  else {
    return SPaux(round+1, next, code);
  }
}

function contain_an_element_of(a, b) {
  for (let el in a) {
    if (b.has(el)) {
      return true;
    }
  }
  return false;
}

function getAlphabet(code)
{
  alphabet = new Set([]);
  for (let word of code) {
    for (var j=0; j < word.length; j++ ) {
      let letter = word.charAt(j);
      alphabet.add(letter);
    }
  }
  return alphabet;
}
