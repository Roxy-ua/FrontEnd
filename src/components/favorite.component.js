import {Component} from '../core/component'
import { apiService } from '../services/api.service'
import { renderPost } from '../templates/post.template'

export class FavoriteComponent extends Component {
    constructor(id, options) {
        //constructor(id, {loader}) {    
        super(id)

        this.loader = options.loader
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

async function linkClickHandler(event) {
    event.preventDefault()
    if(event.target.classList.contains('js-link')) {
        //console.log(event.target.textContent)
        const postId = event.target.dataset.id
        this.$el.innerHTML = ''
        this.loader.show()
        const post = await apiService.fetchPostsById(postId)
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}))
        
        console.log(post)
    }
}

function renderList(list = []) {
    if(list && list.length) {
        console.log('fav: ', list)
        return `
            <ul>
                ${list.map(item => `<li><a href="#" class="js-link" data-id="${item.id}">
                ${item.title}</a></li>`).join(' ')}
            </ul>
        `
    }

    return `<p class="center">Вы пока ничего не добавили</p>`
}
