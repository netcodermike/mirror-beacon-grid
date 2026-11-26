import assert from 'node:assert/strict';

import test from 'node:test';
import {levels, traceBeam} from './app.mjs';
test('both presets start unsolved and each has a solution', () => {
  for (const level of levels) {
    assert.equal(traceBeam(level, level.mirrors).outcome, "edge");
    const positions = Object.keys(level.mirrors);
    const outcomes = Array.from({length:2 ** positions.length}, (_, mask) => {
      const mirrors = Object.fromEntries(positions.map((pos, i) => [pos, mask & 2 ** i ? "/" : String.fromCharCode(92)]));
      return traceBeam(level, mirrors).outcome;
    });
    assert.equal(outcomes.filter(outcome => outcome === "lit").length, 1);
  }
});
test('a beam loop terminates', () => {
  const b = String.fromCharCode(92);
  const square = {"0,0":"/","1,0":b,"1,1":"/","0,1":b};
  const board = {width:3,height:3,source:[0,0],receiver:[2,2]};
  assert.equal(traceBeam(board, square).outcome, "loop");
});
