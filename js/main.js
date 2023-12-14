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