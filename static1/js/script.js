const treesL = document.querySelectorAll('.left p');
treesL.forEach((tree, i) => {
  tree.style.setProperty('--ry', i / treesL.length);
  tree.style.setProperty('--hue', i * 30);
});

const treesR = document.querySelectorAll('.right p');
treesR.forEach((tree, i) => {
  tree.style.setProperty('--ry', i / treesR.length);
  tree.style.setProperty('--hue', i * 30);
});



const snowL = document.querySelectorAll('.left span');
const snowR = document.querySelectorAll('.right span');
snowL.forEach((left, i) => {
  const right = snowR[i];
  
  const r = -i/snowL.length * 1540;//Math.random() * 360;
  const x = (i + 4)/snowL.length * 23;//Math.random() * 22 + 2
  const transform = `rotateY(${r}deg) translate(calc(${x} * .975vmin), calc(${x} * 2.1vmin)) rotateY(${-90}deg)`;
  
  left.style.setProperty('transform', transform);
  right.style.setProperty('transform', transform);
});



if (treesL[0].animate) {
  const stars = document.querySelectorAll('.star');

  stars.forEach((star) => {
    star.animate([{
      transform: 'rotateY(1500deg) translateX(30vmin) rotateY(-1500deg) translateY(60vmin) scale(.6)',
      offset: 0
    }, {
      transform: 'rotateY(500deg) translateX(16vmin) rotateY(-500deg) translateY(20vmin) scale(.6)',
      offset: .6667
    }, {
      transform: 'rotateY(0deg) translateX(0vmin) rotateY(0deg) translateY(0vmin) scale(.6)',
      offset: 1
    }], {
      duration: 10000,
      easing: 'ease-out',
      iterations: 1,
      fill: 'forwards'
    })
  });
}