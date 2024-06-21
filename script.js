const $itemName = document.getElementById('item_name');
const $itemQuantity = document.getElementById('item_quantity');
const $select = document.getElementById('list_tag');
let selectedTag = "一覧";
const $memo = document.getElementById('memo');
const $registration = document.getElementById('registration');
let itemObj = {};
const $itemsList = document.getElementById('items_list');

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
      itemObj['memo'] = $memo.value;
      add(itemObj);
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
  const row2 = document.createElement('div');
  divItem.classList.add('col-7', 'me-2', 'border', 'border-dark');
  divItem.innerText = itemObj['name'];

  divQuantity.classList.add('col', 'me-2', 'border', 'border-dark');
  divQuantity.innerText = itemObj['quantity'];

  divTag.classList.add('col-3','border', 'border-dark');
  divTag.innerText = itemObj['tag'];

  contents = [divItem, divQuantity, divTag];//挿入内容

  row1.classList.add('row');
  contents.forEach(content =>{
    row1.appendChild(content);
  });

  divMemo.classList.add('col', 'me-2', 'border', 'border-dark');
  divMemo.innerText = itemObj['memo'];

  buttonFinish.classList.add('col-3', 'btn', 'btn-primary');
  buttonFinish.innerText = '完了';

  contents = [divMemo, buttonFinish];

  row2.classList.add('row', 'my-1');
  contents.forEach(content =>{
    row2.appendChild(content);
  });

  contents = [row1, row2];
  contents.forEach(content =>{
    div.appendChild(content);
  });

  $itemsList.appendChild(div);
  console.log('add active')
};