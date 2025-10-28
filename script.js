// 简单的拖放和检验逻辑
document.addEventListener('DOMContentLoaded', function(){
  const board = document.getElementById('sentence-board');
  let dragged = null;

  board.addEventListener('dragstart', e => {
    const target = e.target;
    if(target && target.classList.contains('draggable')){
      dragged = target;
      e.dataTransfer.effectAllowed = 'move';
      // 为兼容性，设置一个空的文本
      e.dataTransfer.setData('text/plain', '');
      target.classList.add('dragging');
    }
  });

  board.addEventListener('dragend', e => {
    if(dragged) dragged.classList.remove('dragging');
    dragged = null;
  });

  board.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = getDraggableFromEvent(e);
    board.querySelectorAll('.draggable').forEach(el=>el.classList.remove('over'));
    if(target && target !== dragged) target.classList.add('over');
  });

  board.addEventListener('drop', e => {
    e.preventDefault();
    const target = getDraggableFromEvent(e);
    if(!dragged) return;
    if(target && target !== dragged){
      // 将 dragged 插入到 target 之前
      board.insertBefore(dragged, target);
    }else{
      // 否则放到容器末尾
      board.appendChild(dragged);
    }
    board.querySelectorAll('.draggable').forEach(el=>el.classList.remove('over'));
  });

  function getDraggableFromEvent(e){
    let el = e.target;
    while(el && el !== board){
      if(el.classList && el.classList.contains('draggable')) return el;
      el = el.parentElement;
    }
    return null;
  }

  // 控制按钮
  const checkBtn = document.getElementById('checkBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const result = document.getElementById('result');

  // 正确顺序（忽略大小写与空格）
  const correct = ['ich','habe','gestern','im park','einen freund','gesehen'];

  checkBtn.addEventListener('click', ()=>{
    const words = Array.from(board.querySelectorAll('.draggable')).map(el=>normalize(el.textContent));
    const ok = words.length === correct.length && words.every((w,i)=>w === correct[i]);
    if(ok){
      result.textContent = '回答正确 ✅';
      result.style.color = 'green';
    }else{
      result.textContent = '不正确，请再试一次。';
      result.style.color = '#c33';
    }
  });

  shuffleBtn.addEventListener('click', ()=>{
    shuffleChildren(board);
    result.textContent = '';
  });

  function normalize(s){
    return s.trim().toLowerCase().replace(/[^a-z0-9äöüß\s]/g,'');
  }

  function shuffleChildren(container){
    const items = Array.from(container.children);
    for(let i=items.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      container.appendChild(items[j]);
      items.splice(j,1);
    }
  }
});
