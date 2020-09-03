
let screen = document.getElementById('screen');
let store = {
  firstNum: 0,
  lastNum: 0,
  result: 0,
  notNega: 1,
  haveDeci: false,
  deciArr: [],
  calSymb: '',
  isEqualTo: false
}

//输入为数字
function numInput(value) {
  store.isEqualTo = false;
  let num = Number(value);
  if (store.calSymb) {
    if (store.haveDeci) {
      store.deciArr.push(num);
      let len = store.deciArr.length;
      if (store.lastNum > 0) {
        store.lastNum += Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
      } else if (store.lastNum < 0) {
        store.lastNum -= Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
      } else if (store.lastNum === 0) {
        if (store.notNega > 0) {
          store.lastNum += Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
        } else if (store.notNega < 0) {
          store.lastNum -= Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
        }
      }
      screen.textContent = (store.lastNum === 0) ? screen.textContent + '0' : store.lastNum;
    } else {
      if (store.lastNum === 0) {
        store.notNega > 0 ? store.lastNum += num : store.lastNum -= num;
      } else if (store.lastNum > 0) {
        store.lastNum = store.lastNum * 10 + num;
      } else {
        store.lastNum = -(Math.abs(store.lastNum) * 10 + num);
      }
      screen.textContent = store.lastNum;
    }
  } else {
    if (store.haveDeci) {
      store.deciArr.push(num);
      let len = store.deciArr.length; 
      if (store.firstNum > 0) {
        store.firstNum += Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
      } else if (store.firstNum < 0) {
        store.firstNum -= Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
      } else if (store.firstNum === 0) {
        if (store.notNega > 0) {
          store.firstNum += Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
        } else if (store.notNega < 0) {
          store.firstNum -= Number((store.deciArr[len - 1] * Math.pow(0.1, len)).toFixed(len));
        }
      }
      screen.textContent = (store.firstNum === 0) ? screen.textContent + '0' : store.firstNum;
    } else {
      if (store.firstNum === 0) {
        store.notNega > 0 ? store.firstNum += num : store.firstNum -= num;
      } else if (store.firstNum > 0) {
        store.firstNum = store.firstNum * 10 + num;
      } else {
        store.firstNum = -(Math.abs(store.firstNum) * 10 + num);
      }
      screen.textContent = store.firstNum;
    }
  }
}

//输入为“.”，小数部分
function deci() {
  store.haveDeci = true;
  screen.textContent = screen.textContent + '.';
}

//输入为“AC”，所有内容清零
function clearToZero() {
  screen.textContent = 0;
  store.firstNum = 0;
  store.lastNum = 0;
  store.notNega = 1;
  store.haveDeci = false;
  store.deciArr = [];
  store.result = 0;
  store.calSymb = '';
  store.isEqualTo = false;
}

//输入为“+/-”，取相反数
function opposite() {
  store.notNega = -store.notNega;
  if (store.isEqualTo && !store.calSymb) {
    store.result = -store.result;
    screen.textContent = store.result;
  } else {
    if (store.calSymb) {
      store.lastNum = -store.lastNum;
      screen.textContent = store.lastNum;
    } else if (!store.calSymb) {
      store.firstNum = -store.firstNum;
      screen.textContent = store.firstNum;
    }
  }
}

//输入为“%”，取百分数
function perce() {
  if (store.isEqualTo) {
    store.result /= 100;
    screen.textContent = store.result;
  } else if (store.calSymb) {
    store.lastNum /= 100;
    screen.textContent = store.lastNum;
  } else if (!store.calSymb) {
    store.firstNum /= 100;
    screen.textContent = store.firstNum;
  }
}

//清除输入第一个数时设置的状态，并将结果设为第一个数，用于算出结果后直接使用结果值进行计算
function setState() {
  store.notNega = 1;
  store.haveDeci = false;
  store.deciArr = [];
  if (store.isEqualTo) {
    store.firstNum = store.result;
  }
}
//输入为“÷”，除法
function divi() {
  store.calSymb = '/';
  setState();
}
//输入为“×”，乘法
function mult() {
  store.calSymb = '*';
  setState();
}
//输入为“-”，减法
function sub() {
  store.calSymb = '-';
  setState();
}
//输入为“+”，加法
function add() {
  store.calSymb = '+';
  setState();
}

//输入为“=”，得出计算结果
function equalTo() {
  switch (store.calSymb) {
    case '+': store.result = store.firstNum + store.lastNum; break;
    case '-': store.result = store.firstNum - store.lastNum; break;
    case '*': store.result = store.firstNum * store.lastNum; break;
    case '/': store.result = store.firstNum / store.lastNum; break;
  }
  screen.textContent = store.result;
  store.firstNum = 0;
  store.lastNum = 0;
  store.notNega = 1;
  store.haveDeci = false;
  store.deciArr = [];
  store.calSymb = '';
  store.isEqualTo = true;
}

//键盘输入
window.addEventListener("keydown", event => {
  let num = Number(event.key);
  if(num >= 0 && num <= 9) {
    numInput(num);
  }else {
    switch(event.key) {
      case '+': add(); break;
      case '-': sub(); break;
      case '*': mult(); break;
      case '/': divi(); break;
      case '%': perce(); break;
      case '.': deci(); break;
      case 'Enter': equalTo(); break;
      case 'Backspace': clearToZero(); break;
    }
  }
})