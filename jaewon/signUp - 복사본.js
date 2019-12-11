let web3 = undefined;
const contractAddress = '0xf311e5a2b59fb9993cc7d63c7e5fa11b0c35fb54';
const abi = [
  {
    constant: false,
    inputs: [
      {
        name: '_id',
        type: 'string',
      },
      {
        name: '_password',
        type: 'string',
      },
      {
        name: '_email',
        type: 'string',
      },
    ],
    name: 'addUser',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getNumberOfUsers',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'getUserInfo',
    outputs: [
      {
        name: '',
        type: 'string',
      },
      {
        name: '',
        type: 'string',
      },
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'users',
    outputs: [
      {
        name: 'id',
        type: 'string',
      },
      {
        name: 'password',
        type: 'string',
      },
      {
        name: 'email',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

//web3 설정
if (typeof web3 !== 'undefined') {
  let web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

//contract connect
const contract = web3.eth.contract(abi).at(contractAddress); //vc

//qrcode 설정
const qrcodeOption = {
  width: 250,
  height: 280,
};
const qrcode = new QRCode(document.getElementById('qrcode'), qrcodeOption);

function signUp() {
  console.log('button click');
  //id, email, pw 가져오기
  const id = document.getElementById('id').value;
  console.log(id);
  const email = document.getElementById('email').value;
  console.log(email);
  const password = document.getElementById('pw').value;

  contract.addUser(
    id,
    password,
    email,
    { from: '0xC0d34C70ea36227Bb5238E5159C6128FE6804CAf', gas: 2000000 },
    function(error, result) {
      if (error) {
        console.log('addUser result:', error);
      } else {
        console.log('addUser result:', result);
      }
    },
  );
  //2. 비밀번호를 기반으로 새로운 계정 설정
  const account = web3.personal.newAccount(password);
  const accountElement = document.getElementById('account');
  accountElement.innerText = 'account: ' + account;

  //3. 계정과 비밀번호를 중심으로 큐알코드 만들기
  qrcode.makeCode(account + ',' + password);
  console.log('button', account);
}
const buttonElement = document.getElementById('signUp');

buttonElement.addEventListener('click', signUp);
