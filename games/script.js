const boardEl = document.getElementById('board')
const statusEl = document.getElementById('status')
const resetBtn = document.getElementById('reset')

let board = Array(9).fill(null)
let turn = 'X'
let running = true

function render(){
  boardEl.innerHTML = ''
  board.forEach((v,i)=>{
    const btn = document.createElement('button')
    btn.textContent = v || ''
    btn.addEventListener('click', ()=>onCell(i))
    boardEl.appendChild(btn)
  })
  updateStatus()
}

function onCell(i){
  if(!running || board[i]) return
  board[i]=turn
  if(checkWin(turn)){
    statusEl.textContent = `${turn} wins!`
    running=false
  }else if(board.every(Boolean)){
    statusEl.textContent = `Draw`
    running=false
  }else{
    turn = turn === 'X' ? 'O' : 'X'
    updateStatus()
  }
  render()
}

function updateStatus(){
  if(!running) return
  statusEl.textContent = `Turn: ${turn}`
}

function checkWin(player){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  return lines.some(line => line.every(i=>board[i]===player))
}

resetBtn.addEventListener('click',()=>{
  board=Array(9).fill(null)
  turn='X'
  running=true
  render()
})

render()
