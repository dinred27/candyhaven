// script.js

// Delivery option toggle
const deliveryRadio = document.getElementById("delivery");
const pickupRadio = document.getElementById("pickup");
const deliveryDetails = document.getElementById("delivery-details");

if (deliveryRadio && pickupRadio) {
    deliveryRadio.addEventListener("change", () => {
        if (deliveryRadio.checked) deliveryDetails.style.display = "block";
    });

    pickupRadio.addEventListener("change", () => {
        if (pickupRadio.checked) deliveryDetails.style.display = "none";
    });
}



// Layer & Shape dynamic sizes
const shapeSelect = document.getElementById('shape');
const sizeSelect = document.getElementById('size');
const layerSelect = document.getElementById('layer');

const shapeSizeOptions = {
  round: { single: ['8 inches'], double: ['6 inches', '8 inches', '10 inches', '12 inches', '14 inches', '16 inches'] },
  square: { single: ['8 inches'], double: ['6 inches', '8 inches', '10 inches', '12 inches', '14 inches', '16 inches'] },
  oval: { single: ['9 inches'], double: ['9 inches', '12 inches', '15 inches'] },
  heart: { single: ['9 inches'], double: ['9 inches', '12 inches', '15 inches'] }
};

if (layerSelect) {
    layerSelect.addEventListener('change', () => {
        if (layerSelect.value) {
            shapeSelect.disabled = false;
            sizeSelect.innerHTML = `<option value="">-- Select --</option>`;
        } else {
            shapeSelect.disabled = true;
            sizeSelect.disabled = true;
            sizeSelect.innerHTML = `<option value="">-- Select --</option>`;
        }
    });
}

if (shapeSelect) {
    shapeSelect.addEventListener('change', () => {
        const selectedShape = shapeSelect.value;
        if (selectedShape) {
            const sizes = shapeSizeOptions[selectedShape][layerSelect.value];
            sizeSelect.innerHTML = `<option value="">-- Select --</option>`;
            sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                sizeSelect.appendChild(option);
            });
            sizeSelect.disabled = false;
        } else {
            sizeSelect.innerHTML = `<option value="">-- Select --</option>`;
            sizeSelect.disabled = true;
        }
    });
}

document.querySelector('.next-button')?.addEventListener('click', () => {
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        deliveryDate: document.getElementById('delivery_date').value,
        company: document.getElementById('company').value,
        deliveryType: document.querySelector('input[name="delivery_type"]:checked')?.value || '',
        d_name: document.getElementById('d_name')?.value || '',
        address: document.getElementById('address')?.value || '',
        city: document.getElementById('city')?.value || '',
        state: document.getElementById('state')?.value || '',
        zipcode: document.getElementById('zipcode')?.value || '',
        d_phone: document.getElementById('d_phone')?.value || '',
        // design: document.querySelector('input[name="design"]:checked')?.value || '',
        layer: layerSelect.value,
        shape: shapeSelect.value,
        size: sizeSelect.value,
        flavour: document.getElementById('flavour').value,
        icing: document.getElementById('icing').value,
        fillings: document.getElementById('fillings').value,
        instructions: document.querySelector('textarea[name="instructions"]').value.trim()
    };

    localStorage.setItem('cakeOrder', JSON.stringify(data));
    window.location.href = '/confirm';
});
