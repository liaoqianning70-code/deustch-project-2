// game.js - 支持多题、check/next/answer/reset 与拖放重排
document.addEventListener('DOMContentLoaded', ()=>{
  const board = document.getElementById('sentence-board');
  const checkBtn = document.getElementById('checkBtn');
  const nextBtn = document.getElementById('nextBtn');
  const answerBtn = document.getElementById('answerBtn');
  const resetBtn = document.getElementById('resetBtn');
  const result = document.getElementById('result');
  const answeredEl = document.getElementById('answered');
  const totalEl = document.getElementById('total');

  // 简单题库示例（每题包含 tokens 数组和正确顺序数组）
  const questions = [
    {
      id:1,
      tokens: ['.', 'ich', 'Morgen', 'machen', 'Hausaufgaben', 'werde', 'meine'],
      answer: ['ich','werde','Morgen','meine','Hausaufgaben','machen','.']
    },
    {
      id:2,
      tokens: ['gestern','habe','ich','im Park','einen Freund','gesehen'],
      answer: ['ich','habe','gestern','im Park','einen Freund','gesehen']
    }
  ];

  let currentIndex = 0;
  let answered = 0;

  totalEl.textContent = questions.length;

  function renderQuestion(idx){
    const q = questions[idx];
    board.innerHTML = '';
    q.tokens.forEach(t=>{
      const d = document.createElement('div');
      d.className = 'draggable';
      d.draggable = true;
      d.textContent = t;
      board.appendChild(d);
    });
    result.textContent = '';
  }

  // 拖拽逻辑（与之前脚本类似，但作用于当前页面）
  let dragged = null;
  board.addEventListener('dragstart', e=>{
    const t = e.target;
    if(t && t.classList.contains('draggable')){
      dragged = t;
      e.dataTransfer.setData('text/plain','');
      t.classList.add('dragging');
    }
  });
  board.addEventListener('dragend', ()=>{ if(dragged) dragged.classList.remove('dragging'); dragged = null; });
  board.addEventListener('dragover', e=>{ e.preventDefault(); const t=getDraggableFromEvent(e); board.querySelectorAll('.draggable').forEach(el=>el.classList.remove('over')); if(t && t!==dragged) t.classList.add('over'); });
  board.addEventListener('drop', e=>{ e.preventDefault(); const t=getDraggableFromEvent(e); if(!dragged) return; if(t && t!==dragged) board.insertBefore(dragged,t); else board.appendChild(dragged); board.querySelectorAll('.draggable').forEach(el=>el.classList.remove('over')); });

  function getDraggableFromEvent(e){ let el = e.target; while(el && el !== board){ if(el.classList && el.classList.contains('draggable')) return el; el = el.parentElement; } return null; }

  function normalize(s){ return s.trim().toLowerCase().replace(/[^a-z0-9äöüß\s]/g,''); }

  checkBtn.addEventListener('click', ()=>{
    const q = questions[currentIndex];
    const words = Array.from(board.querySelectorAll('.draggable')).map(el=>normalize(el.textContent));
    const ok = words.length === q.answer.length && words.every((w,i)=>w === normalize(q.answer[i]));
    if(ok){ result.textContent = '回答正确 ✅'; result.style.color = 'green'; answered++; answeredEl.textContent = answered; } else { result.textContent = '不正确，请再试一次。'; result.style.color = '#c33'; }
  });

  nextBtn.addEventListener('click', ()=>{
    currentIndex = (currentIndex + 1) % questions.length;
    renderQuestion(currentIndex);
  });

  answerBtn.addEventListener('click', ()=>{
    const q = questions[currentIndex];
    board.innerHTML = '';
    q.answer.forEach(t=>{ const d = document.createElement('div'); d.className='draggable'; d.draggable=true; d.textContent = t; board.appendChild(d); });
    result.textContent = '答案已显示'; result.style.color = '#333';
  });

  resetBtn.addEventListener('click', ()=>{ renderQuestion(currentIndex); result.textContent=''; });

  // 初始 render
  renderQuestion(currentIndex);
});
