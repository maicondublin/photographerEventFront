<template>
    <v-container>
        <v-card>
            <v-card-title>
                Events
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    @click="addEvent"
                >
                    New Event
                </v-btn>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
            >
                <template v-slot:[`item.date_hour`]="{ item }">
                    <span>{{ moment(item.date_hour).format('DD/MM/YYYY') }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                        small
                        color="blue"
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        color="red"
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog
            v-model="openDialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">Event</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="6"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="buildEvent.client_name"  
                                    label="Name"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="6"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="buildEvent.client_phone"  
                                    label="Phone"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="6"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="buildEvent.client_email"  
                                    label="Email"
                                    required
                                ></v-text-field>
                            </v-col>
                            <!-- se não fo edição de item editingItem for igual a false, não aparece este campo -->
                            <v-col
                                v-if="!editingItem"
                                cols="6"
                                sm="6"
                                md="6"
                            >
                                <v-text-field
                                    v-model="buildEvent.date_hour"  
                                    label="Date Event"
                                    type="date"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="buildEvent.address"  
                                    label="Address"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="buildEvent.observation"  
                                    label="Observation"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text
                        @click="cancel"
                    >
                        Close
                    </v-btn>
                    <!-- botão de salvar chama função de acordo com a variavel editingItem -->
                    <v-btn
                        color="green"
                        text
                        @click="editingItem ? saveEvent() : saveNewEvent()"  
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="deletDialog"
            max-width="300"
        >
            <v-card>
                <v-card-title>
                    Want to delete this item?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="red"
                        @click="cancel"
                    >
                        No
                    </v-btn>
                    <v-btn
                        text
                        color="green"
                        @click="confirmDelete"
                    >
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import loadAll from '../src/app/events/loadAll'
import saveNewEvent from '../src/app/events/saveNewEvent'
import saveEvent from '../src/app/events/saveEvent'
import deleteItem from '../src/app/events/deleteItem'

export default {
    name: 'events',
    data() {
            return {
                search: '',
                items: [],
                buildEvent: {
                    date_hour: null,
                    client_name: null,
                    client_phone: null,
                    client_email: null,
                    address: null,
                    observation: null
                },
                headers: [
                    { text: 'Date', value: 'date_hour'},
                    { text: 'Client', value: 'client_name' },
                    { text: 'Phone', value: 'client_phone' },
                    { text: 'Email', value: 'client_email' },
                    { text: 'Event Location', value: 'address' },
                    { text: 'Obs', value: 'observation' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                openDialog: false,
                editingItem: false,
                deletDialog: false
            }
    },
    methods: {
        async getAllEvents() {
            await loadAll().then(function(response){
                this.items = response.data
            }.bind(this))
        },
        addEvent(){  // abre dialog de adição/edição
            this.openDialog = true 
        },
        editItem(item){ // abre dialog de adição/edição
            this.editingItem = true
            this.buildEvent = item
            this.openDialog = true
        },
        async saveNewEvent() {
            await saveNewEvent(this.buildEvent).then(function(){
                this.getAllEvents()
                this.openDialog = false
                this.buildEvent = {}
            }.bind(this))
        },
        async saveEvent() {
            await saveEvent(this.buildEvent).then(function(){
                this.getAllEvents()
                this.openDialog = false
                this.buildEvent = {}
                this.editingItem = false
            }.bind(this))
        },
        async cancel() {
            await this.getAllEvents()
            this.buildEvent = {}
            this.openDialog = false
            this.editingItem = false
            this.deletDialog = false
        },
        deleteItem(item){
            this.buildEvent = item
            this.deletDialog = true
        },
        async confirmDelete(){
            await deleteItem(this.buildEvent).then(function(){
                this.getAllEvents()
                this.buildEvent = {}
                this.deletDialog = false
            }.bind(this))
        }
    },
    async mounted() {
        if(!localStorage.getItem('user')) this.$router.push('/')
        await this.getAllEvents()
    }
}
</script>

<style scoped> /* scoped, para restringir estilo somente para esta página */
.page-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>