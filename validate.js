/**
 * Test if all the EN and NP dates are in chronological order.
 *
 * @author Srishan Bhattarai
 *
 * https://github.com/mesaugat/bikram-sambat-anno-domini-fixtures/issues/1#issuecomment-614181334
 */

const fs = require('fs');

const file = fs.readFileSync('export.json');
const refs = JSON.parse(file);

function enStr(d) {
  const mo = `${d.enMonth}`.padStart(2, '0');
  const day = `${d.enDay}`.padStart(2, '0');

  return `${d.enYear}-${mo}-${day}`;
}

function npStr(d) {
  const mo = `${d.npMonth}`.padStart(2, '0');
  const day = `${d.npDay}`.padStart(2, '0');

  return `${d.npYear}-${mo}-${day}`;
}

let en = 0,
  np = 0;

for (let i = 1; i < refs.length; i++) {
  const curr = refs[i];
  const prev = refs[i - 1];

  if (enStr(curr) <= enStr(prev)) {
    console.log(`[EN] Prev ${i - 1}: ${enStr(prev)}, Curr: ${i}: ${enStr(curr)}`);
    en++;
  }

  if (npStr(curr) <= npStr(prev)) {
    console.log(`[NP] Prev ${i - 1}: ${npStr(prev)}, Curr: ${i}: ${npStr(curr)}`);
    np++;
  }
}

console.log(`\n ${en} EN dates and ${np} NP dates went back in time.`);
