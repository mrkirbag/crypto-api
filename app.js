const sendButton = document.querySelector('#send');

// llamar a la función que rellena los selects al cargar el DOM
document.addEventListener('DOMContentLoaded', llenarSelects);

sendButton.addEventListener('click', async () => {

    const crypto = document.querySelector('#crp').value;
    const money = document.querySelector('#mon').value;

    const resultadoContainer = document.querySelector('#res');
    const spinner = document.querySelector('.spinner');

    resultadoContainer.style.display = 'none';

    // verificar que no esté vacío
    if (crypto === 'Selecciona' || money === 'Selecciona') {

        resultadoContainer.innerHTML = '<h2>Debes seleccionar un crypto y una moneda</h2>';
        resultadoContainer.style.display = 'flex';

        setTimeout(() => {
            resultadoContainer.style.display = 'none';
        }, 3000);

        return;

    }

    // si no está vacío, mostrar el spinner mientras se obtiene los datos
    spinner.style.display = 'flex';

    // obtener los datos del api
    const res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=${money}`)
    const data = await res.json()

    // ocultar el spinner al obtener resultados
    spinner.style.display = 'none';

    // formatear el valor

    
    if(data[money] <= 0.9){
        data[money] = data[money].toFixed(7);
    } else {
        data[money] = data[money].toFixed(2);
    }

    const fecha = new Date();
    fecha.setDate(fecha.getDate());

    // mostrar el resultado
    resultadoContainer.style.display = 'flex';

    resultadoContainer.innerHTML = `
                                        <h2>El valor de 1 <span>${crypto}</span> es de ${data[money]} <span>${money}</span></h2>

                                        <p>Actualizado el ${fecha.toLocaleDateString()}</p>
                                    `;
        
});

async function llenarSelects() {

    const selectCrypto = document.querySelector('#crp');
    const selectMoney = document.querySelector('#mon');

    // obtener los datos del json
    const res = await fetch('db.json')
    const data = await res.json()

    const cryptos = data.cryptocurrencies;
    const fiats = data.fiat_currencies;

    // agregar los cryptos y fiats a los selects

    cryptos.forEach(crypto => {
        const option = document.createElement('option');
        option.value = crypto.symbol;
        option.innerText = crypto.name;
        selectCrypto.appendChild(option);
    });

    fiats.forEach(fiat => {
        const option = document.createElement('option');
        option.value = fiat.symbol;
        option.innerText = fiat.name;
        selectMoney.appendChild(option);
    });

    
}