import EventService from '@/services/EventService.js'

// all mutations, actions, and getters will be namespaced under 'event'
export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  // the payload in both actions and mutations can be a single variable OR an object.
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit(
          'SET_EVENTS_TOTAL',
          parseInt(response.headers['x-total-count']) // JSON-Server Network
        )
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id) // access our getters try to find this event

    if (event) {
      //saving an api call , if we found it, set it
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}

export const getters = {
  catLength: state => {
    return state.categories.length
  },
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
  //,
  // activeTodosCount: (state, getters) => {
  //   return state.todos.length - getters.doneTodos.length
  // },
  // activeTodosFCount: (state) => {
  //   return state.todos.filter(todo => !todo.done).length
  // }
}
