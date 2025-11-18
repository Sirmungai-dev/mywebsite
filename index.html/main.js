
const amountButtons = document.querySelectorAll('.amount-btn');
const donateForm = document.getElementById('donate-form');
const closeModal = document.getElementById('close-modal');
const selectedAmountText = document.getElementById('selected-amount-text');
const customAmountInput = document.getElementById('custom-amount');
const confirmDonate = document.getElementById('confirm-donate');
const warmMessage = document.getElementById('warm-message');
const warmText = document.getElementById('warm-text');
const phoneInput = document.getElementById('phone');

let selectedAmount = 0;


amountButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    let amount = btn.dataset.amount;

    if (amount === 'custom') {
      customAmountInput.classList.remove('hidden');
      selectedAmountText.textContent = 'Enter your custom donation amount below:';
      selectedAmount = 0; 
    } else {
      selectedAmount = parseInt(amount);
      customAmountInput.classList.add('hidden');
      selectedAmountText.textContent = `You are donating KSh ${selectedAmount}`;
    }

    phoneInput.value = '';
    customAmountInput.value = '';
    donateForm.classList.remove('hidden'); 
  });
});


closeModal.addEventListener('click', () => {
  donateForm.classList.add('hidden');
});


confirmDonate.addEventListener('click', () => {
  let phone = phoneInput.value.trim();

  
  if (!phone.match(/^(\+254|0)?7\d{8}$/)) {
    alert('Please enter a valid Kenyan phone number (07XXXXXXXX or 2547XXXXXXXX).');
    return;
  }

  
  if (!customAmountInput.classList.contains('hidden')) {
    selectedAmount = parseInt(customAmountInput.value);
    if (isNaN(selectedAmount) || selectedAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
  }

  
  donateForm.classList.add('hidden');

  console.log(`STK Push initiated: Phone=${phone}, Amount=${selectedAmount}`);

  warmText.innerHTML = `Thank you for your generous donation of <strong>KSh ${selectedAmount}</strong>!<br>Your support is making a real difference in the lives of orphans and vulnerable children.`;
  warmMessage.classList.remove('hidden');

  
  customAmountInput.value = '';
  selectedAmount = 0;
});
