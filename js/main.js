let eventBus = new Vue()

Vue.component('cols', { 
    template:`
    <div id="cols">
    <div class="col-wrapper">
    <h2 class="error" v-for="error in errors">{{error}}</h2>
        <newcard></newcard>
        <div class="cols-wrapper">
            <div class="col">
                <ul>
                    <li class="cards" style="background-color: #e79ba2" v-for="card in column1"><p class="p-title">{{ card.title }}</p>
                        <ul>
                            <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                                <input @click="newStatus1(card, t)"
                                class="checkbox" type="checkbox"
                                :disabled="t.completed">
                                <p :class="{completed: t.completed}">{{t.title}}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col">
                <ul>
                    <li class="cards" style="background-color: #f5f287" v-for="card in column2"><p class="p-title">{{ card.title }}</p>
                        <ul>
                            <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                                <input @click="newStatus2(card, t)"
                                class="checkbox" type="checkbox" 
                                :disabled="t.completed">
                                <p :class="{completed: t.completed}">{{t.title}}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col">
                <ul>
                    <li class="cards" style="background-color: lightgreen" v-for="card in column3"><p class="p-title">{{ card.title }}</p><div class="flex-revers"><p>{{ card.date }}</p>
                    <ul>
                            <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                                <input @click="t.completed = true"
                                class="checkbox" type="checkbox" 
                                :disabled="t.completed">
                                <p :class="{completed: t.completed}">{{t.title}}</p>
                                
                            </li>
                        </ul>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>

`,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
            errors: [],
        }
    },

    mounted() {
        eventBus.$on('card-submitted', card => {
                this.errors = []
            if (this.column1.length < 3){
                this.column1.push(card)
            } else {
                this.errors.push("You can't add a new card now.")
            }
        })
    },
    methods: {
        newStatus1(card, t) {
            t.completed = true
            let count = 0
            card.status = 0
            this.errors = []
            for (let i = 0; i < 5; i++) {
                if (card.subtasks[i].title != null) {
                    count++
                }
            }

            for (let i = 0; i < count; i++) {
                if (card.subtasks[i].completed === true) {
                    card.status++
                }
            }
            if (card.status/count*100 >= 50 && card.status/count*100 < 100 && this.column2.length < 5) {
                    this.column2.push(card)
                    this.column1.splice(this.column1.indexOf(card), 1)
            } else if (this.column2.length === 5) {
                this.errors.push('You need to complete card in the second column to add new card or complete card in the first column')
                if(this.column1.length > 0) {
                    this.column1.forEach(item => {
                        item.subtasks.forEach(item => {
                            item.completed = true;
                        })
                    })
                }
            }
        },