const changeTitle = () => {
    // textContent 대신 innerHtml이나 innerText를 써도 된다.
    window.document.getElementsByTagName('h1')[0].textContent = 'GreenDreamTree'
}

// addEventListener의 function을 changeTitle()로 추가하면 리스너를 생성함과 동시에 실행되므로 주의.
let changeTitleBtn = window.document.getElementsByClassName('change-title-btn')[0]
changeTitleBtn.addEventListener('click', changeTitle, false);
