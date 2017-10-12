init_messages();

document.getElementById('button').addEventListener("click", function (event) {
  let code = new Set(document.getElementById('code').value.split(' '));
  if (code.has("")) {
    code.delete("");
  }
  let alphabet = getAlphabet(code);
  let m = alphabet.size;
  let n = code.size;
  let alphabet_string = "A=" + setToString(alphabet);
  katex.default.render(alphabet_string, document.getElementById("alphabet"));
  let code_string = "C=" + setToString(code);
  katex.default.render(code_string, document.getElementById("lcode"));
  isUniquelyDecodable(code);
});

function setToString(set) {
  if (set.size == 0) {
    return "\\varnothing";
  }
  i=0;
  let string = "\\{";
  for (let el of set) {
    if (i < set.size-1) {
      string += el + ","
    }
    else {
      string += el + '\\}'
    }
    i++;
  }
  return string;
}

function isUniquelyDecodable(code)
{
  init_messages();
  return SP([code], code)
}

function pref(l1, l2) {
  l = new Set([]);
  if (are_equals(l1, l)) {
    return new Set([...l2]);
  }
  if (are_equals(l2, l)) {
    return l;
  }
  for (let w1 of l1) {
    for (let w2 of l2) {
      if (w2.length >= w1.length) {
        if (w2.substr(0, w1.length) == w1) {
          let w = "";
          if (w1.length < w2.length) {
            w = w2.substr(w1.length, w2.length-w1.length);
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

function SP(sets, code) {
  round = sets.length;
  prev = sets[round-1];
  if (round == 1) {
    next = pref(prev, prev);
    next.delete("");
  }
  else {
    next = union(pref(code, prev), pref(prev, code));
  }
  print_round(round, next);

  if (contain_an_element_of(code, next) || next.has("")) {
    display_block("error");
    return false;
  }
  else if (sets.includes(next)) {
    display_block("success");
    return true;
  }
  else {
    sets.push(next);
    return SP(sets, code);
  }
}

function union(a, b) {
  return new Set([...a, ...b]);
}

function are_equals(a, b) {
  if (a.size != a.size) {
    return false;
  }
  for (let el of a) {
    if (!b.has(el)) {
      return false;
    }
  }
  return true;
}

function print_round(round, set) {
  let r = document.createElement("div");
  r.id = "round-" + round;
  document.getElementById("rounds").appendChild(r);
  let txt = "\\textbf{round\\ " + round + "}\\ S_\{" + round + "\}=" + setToString(set);
  katex.default.render(txt, document.getElementById("round-" + round));
}

function contain_an_element_of(a, b) {
  for (let el of a) {
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

function hide_block(id)
{
  document.getElementById(id).style.display = "none";
}

function display_block(id)
{
  document.getElementById(id).style.display = "inline-flex";
}

function init_messages()
{
  hide_block("success");
  hide_block("error");
  document.getElementById("rounds").innerHTML = "";
}
