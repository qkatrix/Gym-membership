// HTML elementi
const monthsSelect = document.getElementById('months');
const quantityInput = document.getElementById('quantity');
const studentCheckbox = document.getElementById('studentDiscount');
const groupCheckbox = document.getElementById('groupDiscount');
const calculateBtn = document.getElementById('calculateBtn');
const resultSection = document.getElementById('resultSection');
const basePriceSpan = document.getElementById('basePrice');
const totalQuantitySpan = document.getElementById('totalQuantity');
const discountRowDiv = document.getElementById('discountRow');
const discountAmountSpan = document.getElementById('discountAmount');
const finalPriceSpan = document.getElementById('finalPrice');
const quantityError = document.getElementById('quantityError');
const successMessage = document.getElementById('successMessage');

// Abonementa cenas
const prices = {
    1: 25,
    3: 70,
    6: 130,
    12: 240
};

// Aprēķina cenu
function calculatePrice() {
    // Notīrāj kļūdu ziņojumu
    quantityError.textContent = '';
    quantityError.style.display = 'none';

    // Iegūsti ievades vērtības
    const months = parseInt(monthsSelect.value);
    const quantity = parseInt(quantityInput.value);
    const isStudent = studentCheckbox.checked;
    const isGroup = groupCheckbox.checked && quantity >= 3;

    // Validācija
    if (isNaN(quantity) || quantity < 1 || quantity > 10) {
        quantityError.textContent = '❌ Lūdzu, ievadiet skaitu no 1 līdz 10!';
        quantityError.style.display = 'block';
        resultSection.style.display = 'none';
        return;
    }

    // Aprēķini bāzes cenu
    const basePrice = prices[months];
    const totalBeforeDiscount = basePrice * quantity;

    // Aprēķini atlaides
    let discountPercent = 0;
    let discountAmount = 0;

    if (isStudent) {
        discountPercent += 10;
    }
    if (isGroup) {
        discountPercent += 15;
    }

    discountAmount = (totalBeforeDiscount * discountPercent) / 100;
    const finalPrice = totalBeforeDiscount - discountAmount;

    // Parādi rezultātu
    basePriceSpan.textContent = basePrice + ' EUR';
    totalQuantitySpan.textContent = quantity + ' x ' + months + ' mēn.';
    finalPriceSpan.textContent = finalPrice.toFixed(2) + ' EUR';

    // Parādi atlaides, ja tās ir
    if (discountPercent > 0) {
        discountRowDiv.style.display = 'flex';
        discountAmountSpan.textContent = '-' + discountAmount.toFixed(2) + ' EUR (' + discountPercent + '%)';
    } else {
        discountRowDiv.style.display = 'none';
    }

    // Parādi sekmīgu ziņojumu
    if (isStudent || isGroup) {
        successMessage.textContent = '✅ Atlaide pieņemta! Kopējā atlaide: ' + discountPercent + '%';
    } else {
        successMessage.textContent = '✅ Abonementa cena aprēķināta!';
    }

    // Parādi rezultātu sekciju
    resultSection.style.display = 'block';
}

// Event listeners
calculateBtn.addEventListener('click', calculatePrice);

// Enter pogas atbalsts
quantityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculatePrice();
    }
});
