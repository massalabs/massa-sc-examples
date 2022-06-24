const match = require('./match_include_base64');
test('include_base64 regex', () => {
    expect(match("terminator")).toBe(null);
    expect(match("include_base64")).toBe(null);
    let good = match("there is an include_base64('path');");
    expect(good).not.toBe(null);
    expect(good[1]).toBe('path');
    good = match("there is an include_base64(\"path\");");
    expect(good).not.toBe(null);
    expect(good[1]).toBe('path');
    good = match("there is an include_base64(\"hereis/../some/random/fds/fds./fdq  qs//path-/__really_random-z\");");
    expect(good).not.toBe(null);
    expect(good[1]).toBe('hereis/../some/random/fds/fds./fdq  qs//path-/__really_random-z');
});