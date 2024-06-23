const $itemName = document.getElementById('item_name');
const $itemQuantity = document.getElementById('item_quantity');
const $select = document.getElementById('list_tag');
let selectedTag = "一覧";
const $itemMemo = document.getElementById('item_memo');
const $registration = document.getElementById('registration');
let itemObj = {};
const $itemsList = document.getElementById('items_list');
const localItems = JSON.parse(localStorage.getItem('items'));
if(localItems){
  localItems.forEach(item =>{
    add(item);
  });
};

$select.onchange = function(){
  selectedTag = this.value;
};

//登録ボタン
$registration.addEventListener('click', () => {
  if($itemName.value && $itemQuantity.value){
    if($itemQuantity.value >= 0){
      itemObj['name'] = $itemName.value;
      itemObj['quantity'] = $itemQuantity.value;
      itemObj['tag'] = selectedTag;
      itemObj['memo'] = $itemMemo.value;
      add(itemObj);
      reset();
      save();
    }else{
      window.alert('数量は0個以上で入力してください');
    };
  }else{
    window.alert('商品名と数量を入力してください');
  };
});

function add(itemObj){
  let item;
  const div = document.createElement('div');
  let contents = [];
  const divItem = document.createElement('div');
  const divQuantity = document.createElement('div');
  const divTag = document.createElement('div');
  const row1 = document.createElement('div');
  const divMemo = document.createElement('div');
  const buttonFinish = document.createElement('button');
  const buttonFinishRemove = document.createElement('button');
  const buttonDelete = document.createElement('button');
  const row2 = document.createElement('div');
  const containers = [
    { name: divItem, classes: ['col-7','me-2','border','border-dark', 'name'], id: 'name' },
    { name: divQuantity, classes: ['col', 'me-2', 'border', 'border-dark', 'quantity'], id: 'quantity' },
    { name: divTag, classes: ['col-3','border', 'border-dark', 'tag'], id: 'tag' },
    { name: divMemo, classes: ['col', 'me-2', 'border', 'border-dark', 'memo'], id: 'memo' }
  ];

  containers.forEach(container =>{
    container.name.classList.add( ...container.classes);
    container.name.innerText = itemObj[container.id];
  });

  div.classList.add('item');

  buttonFinish.classList.add('col-3', 'btn', 'btn-primary');
  buttonFinish.innerText = '完了';
  buttonFinish.addEventListener('click', () =>{
    div.classList.add('completed');
    divItem.classList.add('text-decoration-line-through');
    buttonFinishRemove.classList.remove('none');
    buttonDelete.classList.remove('none');
    buttonFinish.classList.add('none');
    save();
  });
  buttonFinishRemove.classList.add('col-1', 'btn', 'btn-warning', 'none');
  buttonFinishRemove.innerText = '取消';
  buttonFinishRemove.addEventListener('click', () =>{
    div.classList.remove('completed');
    divItem.classList.remove('text-decoration-line-through');
    buttonFinishRemove.classList.add('none');
    buttonDelete.classList.add('none');
    buttonFinish.classList.remove('none');
    save();
  });
  buttonDelete.classList.add('col-2', 'btn', 'btn-danger', 'none');
  buttonDelete.innerText = '削除';
  buttonDelete.addEventListener('click', () =>{
    div.remove();
    save();
  });

  if(itemObj.completed){
    div.classList.add('completed');
    divItem.classList.add('text-decoration-line-through');
    buttonFinishRemove.classList.remove('none');
    buttonDelete.classList.remove('none');
    buttonFinish.classList.add('none');
  };

  row1.classList.add('row');
  contents = [divItem, divQuantity, divTag];//挿入内容
  contents.forEach(content =>{
    row1.appendChild(content);
  });

  contents = [divMemo, buttonFinish, buttonFinishRemove, buttonDelete];

  row2.classList.add('row', 'my-1');
  contents.forEach(content =>{
    row2.appendChild(content);
  });

  div.classList.add('item');
  contents = [row1, row2];
  contents.forEach(content =>{
    div.appendChild(content);
  });

  $itemsList.appendChild(div);
  };

function reset(){
  $itemName.value = "";
  $itemQuantity.value = "";
  $itemMemo.value ="";
};

function save(){
  const listItems = document.querySelectorAll('.item');
  let items = [];
  listItems.forEach(listItem =>{
    let item ={
      name: listItem.getElementsByClassName('name')[0].innerText,
      quantity: listItem.getElementsByClassName('quantity')[0].innerText,
      tag: listItem.getElementsByClassName('tag')[0].innerText,
      memo: listItem.getElementsByClassName('memo')[0].innerText,
      completed: listItem.getElementsByClassName('name')[0].classList.contains('text-decoration-line-through')
    };
    items.push(item);
  });
  localStorage.setItem('items', JSON.stringify(items));
};

function partialDeletion(){
  const listItems = document.querySelectorAll('.completed');
  listItems.forEach(listitem =>{
    listitem.remove();
  });
  save();
};

function deleteALL(){
  const listItemes = document.getElementById('items_list');
  while(listItemes.firstChild){
  listItemes.removeChild(listItemes.firstChild);
};
save();
};

function allNone(){
  const listItemes = document.querySelectorAll('.item');
  listItemes.forEach(listItem =>{
    listItem.classList.add('none');
  });
};


let tagButtons = document.getElementById('tags').querySelectorAll('button');
tagButtons.forEach(tagButton =>{
  tagButton.addEventListener('click', function(){
    allNone();
    const tagName = this.innerText;
    const items = document.querySelectorAll('.item');
    if(tagName == '一覧'){
      items.forEach(item =>{
        item.classList.remove('none');
      });
    }else if(tagName == '購入済リスト'){
      const completedItems = document.querySelectorAll('.completed');
      completedItems.forEach(item =>{item.classList.remove('none');});
    }else{
      items.forEach(item =>{
        if(item.querySelector('.tag').innerText == tagName){
          item.classList.remove('none');
        };
      });
    };
  });
});
