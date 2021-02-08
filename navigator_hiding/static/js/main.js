const openCloseToc = () => {
  if(document.getElementsByClassName('toc-content')[0].style.display === 'block') {
    document.getElementsByClassName('toc-content')[0].style.display = 'none';
    document.getElementById('toc-toggle').textContent = '더보기';
  } else {
    document.getElementsByClassName('toc-content')[0].style.display = 'block';
    document.getElementById('toc-toggle').textContent = '접기';
  }
}


document.getElementById('watchYoutube').onclick = () => {
  $ajax({
    url: '/라우터 어딘가',
    type: 'GET',
    data: {

    },
    success: (res) => {
      //res 동작..
    }
  })
}

// document.getElementById('watchYoutube').onclick = function() {
//   $ajax({
//     url: '/라우터 어딘가',
//     type: 'GET',
//     data: {

//     },
//     success: (res) => {
//       //res 동작..
//     }
//   })
// }
