export default (hex, alpha = 1) => {
  let c;
  let match;

  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c = hex.substring(1).split('');
    if(c.length === 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x'+c.join('');
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
  } else if (match = hex.split(' ').join('').match(/^rgba\((\d+),(\d+),(\d+),?([\d\.]*)\)$/)) {
    return `rgba(${match[1]},${match[2]},${match[3]},${alpha === 1 ? match[4] || alpha : alpha})`
  }
  throw new Error(`Bad hex color code: ${hex}`);
}
