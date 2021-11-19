let cards = [
    { number: '1111 2222 3333 4444', date: "11/11", holder: 'Maruf Tairov' },
    { number: '2222 3333 4444 5555', date: "12/12", holder: 'Shoxjahon Rustamov' },
    { number: '3333 4444 5555 6666', date: "09/22", holder: 'Faxriddin Gulomov' },
    { number: '4444 5555 6666 7777', date: "10/25", holder: 'Rustam Teshayev' }
]
console.log(cards)

const plastiks = document.querySelector('.cards')
const plastik = plastiks.querySelector('.plastik')
let form = document.querySelector('form')
let editingCard = null

const showCard = card => {
    let clone = plastik.cloneNode(true)
    plastiks.appendChild(clone)
    clone.classList.remove('is-hidden')

    let id = toggleSpace(card.number)
    clone.setAttribute('id', id)
    
    clone.querySelector('.card-number').textContent = card.number
    clone.querySelector('.card-date').textContent = card.date
    clone.querySelector('.card-holder').textContent = card.holder
    clone.querySelector('#delete').dataset.id = id
    clone.querySelector('#edit').dataset.id = id
}

const deleteCard = cardNumber => {
    document.getElementById(cardNumber).remove()
}

const toggleSpace = cardNumber => {
    if (cardNumber.length != 19) {
        console.error('This function is only for card number!')
        return
    }

    return cardNumber.split(' ').join('')
}

const editCard = cardNumber => {
    let card = cards.find(card => toggleSpace(card.number) === cardNumber)
    form.number.value = card.number
    form.date.value = card.date
    form.holder.value = card.holder
    form.querySelector('button').textContent = 'Update'

    editingCard = card
}

const validate = cardNumber => {
    let hasCard = cards.find(card => card.number === cardNumber)

    
    if (hasCard && hasCard.number === editingCard.number) {
        return false
    } else if (hasCard) {
        alert(`Card ${form.number.value} is already added!`)
        form.number.classList.add('is-danger')
        form.number.focus()

        return true
    }

    return false
}

cards.forEach(card => {
    showCard(card)
})

form.addEventListener('submit', event => {
    event.preventDefault()

    let hasCard = validate(form.number.value)

    if (!hasCard && editingCard) {
        let thisCard = document.getElementById(toggleSpace(editingCard.number))

        cards = cards.map(card => {
            if (editingCard.number === card.number) {
                card.number = form.number.value
                card.date = form.date.value
                card.holder = form.holder.value
            }

            return card
        })

        thisCard.setAttribute('id', toggleSpace(form.number.value))
        thisCard.querySelector('.card-number').textContent = form.number.value
        thisCard.querySelector('.card-date').textContent = form.date.value
        thisCard.querySelector('.card-holder').textContent = form.holder.value

        form.reset()
        form.querySelector('button').textContent = 'Add'
        form.number.classList.remove('is-danger')

        editingCard = null
        console.log(cards)
    } else if (!hasCard) {
        let card = {
            number: form.number.value,
            date: form.date.value,
            holder: form.holder.value
        }
    
        cards.push(card)
        console.log(cards)
    
        showCard(card)
    
        form.reset()
        form.number.classList.remove('is-danger')
    }

})

IMask(form.number, { mask: '0000 0000 0000 0000' })
IMask(form.date, { mask: '00/00' })