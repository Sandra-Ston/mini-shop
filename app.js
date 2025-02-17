/*let C = [ //masyvas
    {
        id: 1,
        img: './images/kede.jpg',
        title: 'Kėdė',
        price: 50,
        quantity: 4

    },

    {
        id: 2,
        img: './images/sofa.jpg',
        title: 'Sofa',
        price: 1550,
        quantity: 3

    },

    {
        id: 3,
        img: './images/stalas.jpg',
        title: 'Stalas',
        price: 150,
        quantity: 2

    },

    {
        id: 4,
        img: './images/komoda.jpg',
        title: 'Komoda',
        price: 250,
        quantity: 1

    }
];*/

//bandymas su local storage

/*const obj = {name: 'Jonas', age: 25}

localStorage.setItem("cat", JSON.stringify(obj));
localStorage.setItem("dog", JSON.stringify(obj));

const cat = JSON.parse(localStorage.getItem('cat'));
localStorage.removeItem('dog');
console.log(cat);*/


let C; //deklaruotas kintamasis, kuriam pradzioje nieko nepriskirta, nes dar nezinome kuo jis bus.

const init = _ =>{ //pradine funkcija dazniausiai vadinama init, bet is esmes tai musus sugalvotas pavadinimas. cia sudeti metodai kurie paleidziami pacioje pradzioje
    C = JSON.parse(localStorage.getItem('cart')) ?? [];
    
    const cartIcon = document.querySelector('[data-cart-icon]');
    cartIcon.addEventListener('click', _ => changeCart());
    cartRender();
    addEvents();
    productsAction();

}

const updateCount = _ => {
    const count = C.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector('[data-cart-count]').textContent = count;
    localStorage.setItem('cart', JSON.stringify(C));
}

const changeCart=(changeView = true)=>{
    const cartList = document.querySelector('[data-cart-list]');

    if (changeView){
        if (cartList.dataset.open === 'close') {
            cartList.dataset.open = 'open';
            cartList.style.maxHeight = cartList.scrollHeight + 'px';
        } else {
            cartList.dataset.open = 'close';
            cartList.style.maxHeight = '0';
        }


    } else{
        if (cartList.dataset.open === 'close'){
            cartList.style.maxHeight = '0';
        }else{
            cartList.style.maxHeight = cartList.scrollHeight + 'px'
        }
    }



}


const showMessage = _ => {
    const message = document.querySelector('[data-show]');
    message.dataset.show = true;
    setTimeout(_ => {
        message.dataset.show = false;
    }, 1500); //milisekundes rasosi, kitu matavimo vienetu nera
}

const productsAction =_=>{
    const products = document.querySelectorAll(`[data-product]`);

    products.forEach(product => {
        const button = product.querySelector('button');
        const img = product.querySelector('img').src;
        const input = product.querySelector('input');

        button.addEventListener('click', _ => {
            const id = parseInt(button.dataset.id);
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const quantity = parseInt(input.value);

            const findItem = C.find(item => item.id === id);
            if (findItem){
                findItem.quantity += quantity;
            }else{
                C.push(
                    {
                        id, 
                        img, 
                        title:name, 
                        price, 
                        quantity
                    }
                );
            }




            showMessage();
            cartRender();
            addEvents();
            changeCart(false);
        });
    });
}

const cartRender = _ => {
    let cartHtml = '';
    C.forEach(item => {
        const { id, img, title, price, quantity } = item; //dekonstrukcija masyvo
        const cartItemHtml = `
                        <li>
                            <img src="${img}" alt="${title}">
                            <div class="info">
                                <h3>${title}</h3>
                                <p>${price.toFixed(2)} €</p>
                                <p>Kiekis: ${quantity}</p>
                            </div>
                            <button data-id=${id}>X</button>
                        </li>
                        `; //sudedami items i html dalis
          
        cartHtml += cartItemHtml;
    });

    if(!cartHtml){
        cartHtml = `<li data-not-product>Krepšelis tuščias</li>`;
    }else{
        const total = C.reduce((acc, item) => acc + item.price * item.quantity, 0);
        cartHtml += `<li data-not-product>Iš viso: ${total.toFixed(2)}€</li>`;
    }

    document.querySelector('[data-cart-list] ul').innerHTML = cartHtml;
    updateCount();
}

const addEvents = _ => {
    document.querySelectorAll('[data-cart-list] ul li:not([data-not-product])')
    .forEach(li => {
        const button = li.querySelector('button');
        button.addEventListener('click', _ => {
            const id = button.dataset.id;
            C = C.filter(item => item.id !== parseInt(id));
            cartRender();
            addEvents();
        });
    });
}

init();

// let cartHtml = '';
// for (let i = 0; i < C.length; i++) {
//     const item = C[i];
//     const img = item.img;
//     const title = item.title;
//     const price = item.price;
//     const quantity = item.quantity;
//     const cartItemHtml = `
//                         <li>
//                             <img src="${img}" alt="${title}">
//                             <div class="info">
//                                 <h3>${title}</h3>
//                                 <p>${price.toFixed(2)} €</p>
//                                 <p>Quantity: ${quantity}</p>
//                             </div>
//                             <button>X</button>
//                         </li>
//                         `;
//     cartHtml += cartItemHtml;
// }
// document.querySelector('#mini-cart ul').innerHTML = cartHtml